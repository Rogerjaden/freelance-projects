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
          <h4>Pages</h4>
          {links.map(([to, label]) => <Link key={to} to={to}>{label}</Link>)}
        </div>
        <div>
          <h4>Contact</h4>
          <p>{company.person}</p>
          <a href={`tel:${company.phoneLink}`}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
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
