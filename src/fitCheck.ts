export type FitCheckRequest = {
  name: string
  email: string
  project: string
  repositoryUrl: string
  queryCount: number
  runsToCompare: string
  perQueryResultsAvailable: 'yes' | 'no'
  description: string
}

export type FitCheckOutcome = 'sent' | 'saved-locally'

const endpoint = import.meta.env.VITE_FIT_CHECK_ENDPOINT?.trim()

export const isFitCheckConnected = Boolean(endpoint)

function downloadDraft(request: FitCheckRequest) {
  const lines = [
    'EDP Retrieval Quality Audit — Fit check draft',
    'This draft was saved locally. It has not been sent.',
    '',
    `Name: ${request.name}`,
    `Email: ${request.email}`,
    `Project / company: ${request.project}`,
    `Repository URL: ${request.repositoryUrl || 'Not provided'}`,
    `Approximate evaluation queries: ${request.queryCount}`,
    `Runs / configurations: ${request.runsToCompare}`,
    `Per-query results available: ${request.perQueryResultsAvailable}`,
    `Description: ${request.description}`,
  ]
  const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = 'edp-fit-check-draft.txt'
  document.body.append(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function submitFitCheck(request: FitCheckRequest): Promise<FitCheckOutcome> {
  if (!endpoint) {
    downloadDraft(request)
    return 'saved-locally'
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  if (!response.ok) throw new Error(`Fit check request failed (${response.status})`)
  return 'sent'
}
