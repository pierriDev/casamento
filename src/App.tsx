import { useEffect, useState } from 'react'
import { wedding } from './wedding'

const nav = [
  { href: '#story', label: 'Story' },
  { href: '#details', label: 'Details' },
  { href: '#rsvp', label: 'RSVP' },
]

function formatDate(dateISO: string) {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${dateISO}T00:00:00`))
}

function Countdown({ dateISO }: { dateISO: string }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const remaining = Math.max(
    0,
    new Date(`${dateISO}T00:00:00`).getTime() - now,
  )
  const days = Math.floor(remaining / 86_400_000)
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000)
  const minutes = Math.floor((remaining % 3_600_000) / 60_000)

  const parts = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
  ]

  return (
    <dl className="countdown">
      {parts.map((part) => (
        <div key={part.label}>
          <dt>{part.label}</dt>
          <dd>{String(part.value).padStart(2, '0')}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const dateText = wedding.dateISO
    ? formatDate(wedding.dateISO)
    : wedding.dateLabel

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <a className="skip-link" href="#story">
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          {wedding.partnerOne}
          <span aria-hidden="true"> & </span>
          {wedding.partnerTwo}
        </a>
        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
        <nav id="site-nav" className={menuOpen ? 'is-open' : undefined}>
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="couple-names">
          <p className="eyebrow">Save the date</p>
          <h1 id="couple-names">
            <span>{wedding.partnerOne}</span>
            <em>&</em>
            <span>{wedding.partnerTwo}</span>
          </h1>
          <p className="hero-meta">
            {dateText}
            <span aria-hidden="true"> · </span>
            {wedding.city}
          </p>
          {wedding.dateISO ? <Countdown dateISO={wedding.dateISO} /> : null}
        </section>

        <section id="story" className="panel story" aria-labelledby="story-title">
          <div className="section-intro">
            <p className="eyebrow">Our story</p>
            <h2 id="story-title">How we got here</h2>
          </div>
          <div className="story-copy">
            <p className="welcome">{wedding.welcome}</p>
            {wedding.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section id="details" className="panel" aria-labelledby="details-title">
          <div className="section-intro">
            <p className="eyebrow">The day</p>
            <h2 id="details-title">Details</h2>
          </div>
          <dl className="facts">
            <div>
              <dt>When</dt>
              <dd>{dateText}</dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>
                {wedding.venue}
                <span>{wedding.city}</span>
              </dd>
            </div>
            <div>
              <dt>Attire</dt>
              <dd>{wedding.dressCode}</dd>
            </div>
          </dl>
          <ol className="schedule">
            {wedding.schedule.map((item, index) => (
              <li key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="rsvp" className="panel rsvp" aria-labelledby="rsvp-title">
          <p className="eyebrow">Kindly reply</p>
          <h2 id="rsvp-title">We would love to see you there</h2>
          <p>
            Replies will open on this page once the guest list and the date are
            set. Until then, hold the day if you can.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          {wedding.partnerOne} & {wedding.partnerTwo}
        </p>
        <p>{dateText}</p>
      </footer>
    </>
  )
}
