import type { PropsWithChildren, ReactNode } from 'react'

export function GlassCard({ children, title, eyebrow }: PropsWithChildren<{ title?: string; eyebrow?: string }>) {
  return (
    <section className="glass-card">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  )
}

export function InfoList({ items }: { items: Array<{ label: string; value: ReactNode }> }) {
  return (
    <dl className="info-list">
      {items.map((item) => (
        <div key={item.label}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function StatusPill({ label, tone = 'info' }: { label: string; tone?: 'info' | 'warn' | 'success' }) {
  return <span className={`status-pill status-pill--${tone}`}>{label}</span>
}
