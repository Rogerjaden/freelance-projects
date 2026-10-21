import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { company, projects } from './data.js'

export function useInView() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, on]
}

export function Reveal({ children, delay = 0, className = '' }) {
  const [ref, on] = useInView()
  return (
    <div ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

export function Counter({ value, suffix = '' }) {
  const [ref, on] = useInView()
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!on) return
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min((t - t0) / 1500, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [on, value])
  return <span ref={ref}>{n}{suffix}</span>
}

const links = [['/', 'Home'], ['/services', 'Services'], ['/about', 'About'], ['/projects', 'Projects'], ['/contact', 'Contact']]

export function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img src="/images/logo.png" alt={company.name} />
        </Link>
        <nav className={open ? 'links open' : 'links'}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn btn-o nav-cta">Start a project</Link>
        <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap fgrid">
        <div>
          <img className="flogo" src="/images/logo.png" alt={company.name} />
          <p>{company.tagline}</p>
        </div>
          <div>
            <h4>Contact</h4>
            <p>{company.person}</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={`tel:${company.phoneLink}`}>{company.phone}</a>
            <div className="contact-actions">
              <a className="contact-call" href={`tel:${company.phoneLink}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Now
              </a>

              <a
                className="contact-whatsapp"
                href={`https://wa.me/${company.phoneLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1C18.7 23.6 24 18.3 24 11.8a11.8 11.8 0 0 0-3.5-8.3ZM12.1 21.6a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.7 9.7 0 1 1 8.5 4.7Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4 2.4 3.7 5.8 5c.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4s.3-1.3.2-1.4-.3-.2-.6-.4Z" />
                </svg>
                WhatsApp
              </a>
            </div>
            <p>{company.secondPerson}</p>
            <a href={`mailto:${company.secondEmail}`}>{company.secondEmail}</a>
            <a href={`tel:${company.secondPhoneLink}`}>
              {company.secondPhone}
            </a>
            <div className="contact-actions">
              <a className="contact-call" href={`tel:${company.secondPhoneLink}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call Now
              </a>
              <a
                className="contact-whatsapp"
                href={`https://wa.me/${company.secondPhoneLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1C18.7 23.6 24 18.3 24 11.8a11.8 11.8 0 0 0-3.5-8.3ZM12.1 21.6a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.7 9.7 0 1 1 8.5 4.7Zm5.3-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6s-.7-1.7-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.2-1.2 2.8 1.2 3.2 1.4 3.4 2.4 3.7 5.8 5c.8.3 1.4.5 1.9.6.8.2 1.5.2 2 .1.6-.1 1.8-.7 2-1.4s.3-1.3.2-1.4-.3-.2-.6-.4Z" />
                </svg>
                WhatsApp
              </a>
            </div>
            <p>{company.address}</p>
          </div>
      </div>
      <div className="wrap copy">© {new Date().getFullYear()} {company.name}. All rights reserved.</div>
    </footer>
  )
}

export function ProjectsRow() {
  const ref = useRef(null)
  const go = (d) => ref.current.scrollBy({ left: d * ref.current.clientWidth * 0.8, behavior: 'smooth' })
  return (
    <div>
      <div className="row-ctl">
        <button onClick={() => go(-1)} aria-label="Previous projects">←</button>
        <button onClick={() => go(1)} aria-label="Next projects">→</button>
      </div>
      <div className="row" ref={ref}>
        {projects.map((p) => (
          <article className="pcard" key={p.slug}>
            <div className="pimg"><img src={p.cover} alt={p.name} loading="lazy" /></div>
            <div className="pbody">
              <h3>{p.name}</h3>
              <p>{p.location}, {p.year}</p>
              <Link to={`/projects/${p.slug}`} className="btn btn-d">View details</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
