import { useState, type FormEvent, type ReactNode } from 'react'
import { isFitCheckConnected, submitFitCheck, type FitCheckRequest } from './fitCheck'

type IconName = 'layers' | 'scale' | 'file' | 'shield' | 'database' | 'table' | 'chart' | 'pie' | 'box' | 'arrow' | 'check' | 'link' | 'people' | 'sliders' | 'swap' | 'network' | 'copy'

function Icon({ name, size = 24, className = '' }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 17l9 5 9-5" /></>,
    scale: <><path d="M12 3v18M5 7h14M7 7l-4 7h8L7 7Zm10 0-4 7h8l-4-7Z" /><path d="M5 21h14" /></>,
    file: <><path d="M6 2h8l4 4v16H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M14 2v5h5M8 12h8M8 16h8" /></>,
    shield: <><path d="m12 2 9 4v6c0 5-3.3 8.2-9 10-5.7-1.8-9-5-9-10V6l9-4Z" /></>,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3" /></>,
    table: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M10 3v18" /></>,
    chart: <><path d="M4 20V13M10 20V8M16 20V4M22 20V11" /></>,
    pie: <><path d="M21 13a9 9 0 1 1-10-10v10h10ZM14 3a9 9 0 0 1 7 7h-7V3Z" /></>,
    box: <><path d="m12 2 9 5v10l-9 5-9-5V7l9-5ZM3 7l9 5 9-5M12 12v10" /></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7 .3l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7-.3l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>,
    people: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2 21v-3a6 6 0 0 1 12 0v3H2ZM15 15a5 5 0 0 1 7 4v2h-6" /></>,
    sliders: <><path d="M4 7h16M4 17h16M9 4v6M16 14v6" /></>,
    swap: <><path d="M3 8h18m-5-5 5 5-5 5M21 16H3m5-5-5 5 5 5" /></>,
    network: <><circle cx="12" cy="4" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="m11 6-5 10m7-10 5 10M7 18h10" /></>,
    copy: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2" /></>,
  }
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const deliverables: { icon: IconName; title: string; body: string }[] = [
  { icon: 'database', title: 'Frozen evaluation snapshot', body: 'A versioned evaluation set and agreed protocol for repeatable comparison.' },
  { icon: 'table', title: 'Machine-readable paired results', body: 'Query-level results in structured formats, with metrics and annotations where supported.' },
  { icon: 'chart', title: 'Recovery / regression analysis', body: 'What improved, what regressed, and by how much, at query and slice level.' },
  { icon: 'pie', title: 'Failure-slice analysis', body: 'Breakdowns by error type, query intent, or other supported slices, where supplied artifacts allow.' },
  { icon: 'file', title: 'Technical report', body: 'Methods, findings, visualizations, limitations, and a balanced discussion of the evidence.' },
  { icon: 'box', title: 'Reproducibility package', body: 'Manifest, configuration, artifact hashes, machine-readable outputs, and reproduction details used for the analysis.' },
]

const workflow = [
  { title: 'Fit check', body: 'EDP confirms artifact compatibility and scope before any paid work.' },
  { title: 'Freeze artifacts', body: 'EDP and the project owner agree on the evaluation set, two comparable runs, and the analysis protocol.' },
  { title: 'Paired analysis', body: 'EDP compares query-level results and investigates supported differences and failure slices.' },
  { title: 'Delivery package', body: 'You receive a technical report, machine-readable results, and reproducibility evidence.' },
]

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id?: string }) {
  return <div className="section-heading" id={id}><span className="section-rule" /><p className="section-eyebrow">{eyebrow}</p><h2>{title}</h2>{description && <p>{description}</p>}</div>
}

function Dashboard() {
  return <div className="dashboard-shell" aria-label="Illustrative audit comparison dashboard with demo data">
    <div className="dashboard">
      <div className="dash-head"><span className="dash-head-icon"><Icon name="file" size={17} /></span><div><strong>Audit Comparison</strong><small>Baseline vs Candidate</small></div><span className="demo-badge">Illustrative demo</span></div>
      <div className="run-row">
        <div className="run-card"><span className="run-orb neutral" /><span><strong>Baseline</strong><small>baseline-v1<br />Demo run A</small></span></div>
        <Icon name="swap" size={22} className="run-swap" />
        <div className="run-card"><span className="run-orb active" /><span><strong>Candidate</strong><small>candidate-v2<br />Demo run B</small></span></div>
      </div>
      <div className="dash-grid">
        <div className="metric-card"><strong>Recoveries</strong><div className="metric-line"><span className="metric-value up">↗ <b>+12.6%</b></span><svg viewBox="0 0 78 35" aria-hidden="true"><path d="M2 28c10-5 12-16 22-12s14 8 21-3 14 4 23-11" fill="none" stroke="#0cbf67" strokeWidth="2.2" strokeLinecap="round" /></svg></div><small>Illustrative change</small></div>
        <div className="metric-card"><strong>Regressions</strong><div className="metric-line"><span className="metric-value down">↘ <b>−3.4%</b></span><svg viewBox="0 0 78 35" aria-hidden="true"><path d="M2 8c9 9 14-4 24 1s11 19 22 17 15-11 28 7" fill="none" stroke="#ff5f69" strokeWidth="2.2" strokeLinecap="round" /></svg></div><small>Illustrative change</small></div>
        <div className="slice-card"><strong>Failure slices</strong><div className="slice-content"><span className="donut" aria-hidden="true" /><ul><li><i className="dot d1" /><span>Missing evidence</span><b>42%</b></li><li><i className="dot d2" /><span>Rank displacement</span><b>28%</b></li><li><i className="dot d3" /><span>Duplicate competition</span><b>18%</b></li><li><i className="dot d4" /><span>Contract / other</span><b>12%</b></li></ul></div></div>
        <div className="hash-card"><strong><Icon name="file" size={16} /> Artifact hashes</strong><dl><div><dt>Eval set</dt><dd>demo…9c1e</dd></div><div><dt>Baseline run</dt><dd>demo…2e9a</dd></div><div><dt>Candidate run</dt><dd>demo…6d0c</dd></div></dl></div>
      </div>
    </div>
  </div>
}

function FitCheckForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'saved-locally' | 'error'>('idle')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    const request: FitCheckRequest = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      project: String(data.get('project') || '').trim(),
      repositoryUrl: String(data.get('repositoryUrl') || '').trim(),
      queryCount: Number(data.get('queryCount')),
      runsToCompare: String(data.get('runsToCompare') || '').trim(),
      perQueryResultsAvailable: String(data.get('perQueryResultsAvailable')) as 'yes' | 'no',
      description: String(data.get('description') || '').trim(),
    }
    setState('sending')
    try {
      const outcome = await submitFitCheck(request)
      setState(outcome)
      if (outcome === 'sent') form.reset()
    } catch {
      setState('error')
    }
  }

  return <form className="fit-form" onSubmit={onSubmit}>
    {!isFitCheckConnected && <p className="preview-notice"><Icon name="file" size={18} /><span><strong>Preview only — no request is sent.</strong> Completing this form downloads a draft to your device. EDP does not receive it.</span></p>}
    <div className="form-grid">
      <label>Name <input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
      <label>Email <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" /></label>
      <label>Project / company <input name="project" type="text" autoComplete="organization" required placeholder="Project or team" /></label>
      <label><span>Repository URL <span className="optional">optional</span></span><input name="repositoryUrl" type="url" inputMode="url" placeholder="https://github.com/…" /></label>
      <label>Approximate evaluation queries <input name="queryCount" type="number" inputMode="numeric" min="1" step="1" required placeholder="Estimated count" /></label>
      <label>Per-query retrieval results available? <select name="perQueryResultsAvailable" required defaultValue=""><option value="" disabled>Select one</option><option value="yes">Yes</option><option value="no">No</option></select></label>
      <label className="wide">What two runs / configurations do you want compared? <textarea name="runsToCompare" rows={3} required placeholder="Briefly describe baseline and candidate" /></label>
      <label className="wide">Short description <textarea name="description" rows={3} required placeholder="What decision should this audit help you make?" /></label>
    </div>
    <div className="form-bottom"><div><p className="form-note">{isFitCheckConnected ? 'Your request will be sent to the configured fit check endpoint.' : 'Preview mode: no submission is sent from this page.'}</p><p className="form-note muted">Please do not include secrets or sensitive data in this initial request.</p></div><button className="button button-primary" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Working…' : isFitCheckConnected ? 'Request Fit Check' : 'Download Fit Check Draft'} <Icon name="arrow" size={17} /></button></div>
    <p className={`form-feedback ${state === 'error' ? 'is-error' : ''}`} role="status" aria-live="polite">{state === 'sent' && 'Request sent. EDP will review the fit check details.'}{state === 'saved-locally' && 'Draft downloaded locally. No request was sent.'}{state === 'error' && 'The request could not be sent. Your answers remain in the form; please try again.'}</p>
  </form>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <>
    <header className="site-header"><div className="container header-inner"><a className="brand" href="#top" aria-label="EDP Retrieval Quality Audit home" onClick={closeMenu}><Icon name="layers" size={32} /><span><b>EDP</b> <span>Retrieval Quality Audit</span></span></a><button className="menu-toggle" type="button" aria-controls="primary-nav" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}<span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button><nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} id="primary-nav" aria-label="Main navigation"><a href="#method" onClick={closeMenu}>Method</a><a href="#case-studies" onClick={closeMenu}>Case Studies</a><a href="#deliverables" onClick={closeMenu}>Deliverables</a><a href="#fit-check" onClick={closeMenu}>Fit Check</a><a href="#contact" onClick={closeMenu}>Contact</a></nav><a className="button button-primary header-cta" href="#fit-check">Request a Fit Check <Icon name="arrow" size={16} /></a></div></header>
    <main id="top">
      <section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">INDEPENDENT <span>·</span> REPRODUCIBLE <span>·</span> EVIDENCE-DRIVEN</p><h1>Independent<br />Retrieval Quality Audits</h1><p className="hero-lead">Freeze your evaluation artifacts, compare two runs, and get query-level evidence on what improved, what regressed, and what only adds complexity.</p><p className="hero-support">Built from public beta case studies. Productized for fixed-scope technical audits.</p><div className="hero-actions"><a className="button button-primary" href="#fit-check">Request a Fit Check <Icon name="arrow" size={17} /></a><a className="button button-secondary" href="#case-studies">View Case Studies</a></div><div className="trust-strip"><span><Icon name="shield" size={17} /> Independent analysis</span><span><Icon name="file" size={17} /> Reproducible outputs</span><span><Icon name="chart" size={17} /> Evidence-first claims</span></div></div><Dashboard /></div></section>
      <section className="section why-section container" id="method"><SectionHeading eyebrow="THE METHOD" title="Why EDP" /><div className="why-grid"><article className="feature-card"><span className="round-icon"><Icon name="scale" size={31} /></span><div><h3>Paired analysis</h3><p>Compare baseline and candidate on the same frozen evaluation set.</p></div></article><article className="feature-card"><span className="round-icon"><Icon name="file" size={29} /></span><div><h3>Reproducible evidence</h3><p>Manifest, machine-readable outputs, technical report and artifact hashes.</p></div></article><article className="feature-card"><span className="round-icon"><Icon name="shield" size={29} /></span><div><h3>Careful claims</h3><p>Observed evidence stays separate from hypotheses and unsupported causal claims.</p></div></article></div></section>
      <section className="section container" id="deliverables"><SectionHeading eyebrow="EVIDENCE PACKAGE" title="What the audit delivers" description="A focused, reproducible analysis of retrieval quality changes." /><div className="deliverable-grid">{deliverables.map(item => <article className="deliverable-card" key={item.title}><span className="square-icon"><Icon name={item.icon} size={25} /></span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div><p className="section-footnote">Slice and forensic detail depend on what the supplied artifacts support.</p></section>
      <section className="section container workflow-section"><SectionHeading eyebrow="PROCESS" title="Audit workflow" description="A complete, focused path from fit check to final delivery." /><ol className="workflow-list">{workflow.map((step, index) => <li key={step.title}><span className="step-number">{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>)}</ol></section>
      <section className="section container cases-section" id="case-studies"><SectionHeading eyebrow="PUBLIC BETA" title="Case studies" description="Public beta case studies that validated the core investigative methodology. These were not paid client audits." /><div className="case-grid"><article className="case-card"><div className="case-top"><span className="square-icon"><Icon name="chart" size={27} /></span><div><h3>DPOLens <span>— Beta Audit #001</span></h3><p>Independent evaluation of retrieval and reranking changes, with query-level analysis and reproducible artifacts.</p></div></div><div className="case-bottom"><div className="tags"><span>query-level findings</span><span>reproducible artifacts</span></div><a href="https://github.com/devBorgesr/edp-audits/tree/main/audits/dpolens-beta-001" target="_blank" rel="noopener noreferrer">View case study <Icon name="arrow" size={15} /></a></div></article><article className="case-card"><div className="case-top"><span className="square-icon"><Icon name="network" size={27} /></span><div><h3>RouteMind <span>— Beta Audit #002</span></h3><p>Independent retrieval/reranking regression audit that reproduced 700 paired queries and surfaced a scoring-contract discrepancy in multi-document temporal cases.</p></div></div><div className="case-bottom"><div className="tags"><span>query-level findings</span><span>public beta study</span></div><a href="https://github.com/devBorgesr/edp-audits/tree/main/audits/routemind-beta-002" target="_blank" rel="noopener noreferrer">View case study <Icon name="arrow" size={15} /></a></div></article></div></section>
      <section className="section container pricing-section"><div className="pricing-copy"><SectionHeading eyebrow="STARTING POINT" title="Initial fixed-scope audit" description="For technical teams that need an independent, reproducible evaluation of retrieval changes." /><p>Larger or non-standard engagements are scoped separately.</p></div><div className="pricing-card"><div><span className="price-label">INITIAL AUDIT</span><p className="price">Starting at $400</p><p className="price-note">Final scope is confirmed after a no-commitment artifact fit check.</p></div><div className="price-includes"><ul><li><Icon name="check" size={17} /> Up to 2 comparable runs</li><li><Icon name="check" size={17} /> Explicit evaluation protocol</li><li><Icon name="check" size={17} /> Technical report + evidence package</li></ul><a className="button button-primary" href="#fit-check">Request a Fit Check <Icon name="arrow" size={16} /></a></div></div></section>
      <section className="section container audience-section"><SectionHeading eyebrow="WHO IT HELPS" title="Who this is for" description="Designed for technical teams working on retrieval and evaluation." /><div className="audience-list"><span><Icon name="people" size={19} /> RAG teams</span><span><Icon name="chart" size={19} /> Retrieval benchmarks</span><span><Icon name="swap" size={19} /> Reranking experiments</span><span><Icon name="file" size={19} /> Context selection</span><span><Icon name="sliders" size={19} /> Evaluation-heavy pipelines</span></div></section>
      <section className="contact-section" id="contact"><div className="container contact-grid"><div className="contact-copy"><SectionHeading eyebrow="NEXT STEP" title="Request a fit check" description="Tell EDP what you have and what you want compared. EDP reviews artifact compatibility and scope before any paid work." /><p>Sharing a repository is optional. A fit check does not commit you to an audit.</p><a className="text-link" href="https://github.com/devBorgesr/edp-audits" target="_blank" rel="noopener noreferrer">Explore the public audit repository <Icon name="arrow" size={16} /></a></div><div id="fit-check" className="form-wrap"><FitCheckForm /></div></div></section>
      <section className="privacy-section container" id="privacy"><h2>Privacy</h2><p>{isFitCheckConnected ? 'This page has no trackers. Fit check submissions send the details you enter to the configured contact service. Please do not include secrets or sensitive data in the initial request.' : 'This page has no trackers. In this preview, form answers stay in your browser. Request Fit Check downloads a local draft and sends nothing.'}</p></section>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><div><a className="footer-brand" href="#top"><Icon name="layers" size={24} /> EDP <span>Retrieval Quality Audit</span></a><p>Independent retrieval evidence, with claims kept in bounds.</p></div><nav aria-label="Footer navigation"><a href="https://github.com/devBorgesr/edp-audits" target="_blank" rel="noopener noreferrer">GitHub</a><a href="#case-studies">Case Studies</a><a href="#method">Methodology</a><a href="#contact">Contact</a><a href="#privacy">Privacy</a></nav></div></footer>
  </>
}

export default App
