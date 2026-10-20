import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Reveal, Counter, ProjectsRow } from './components.jsx'
import { company, services, steps, projects } from './data.js'

const PageHead = ({ title, text }) => (
  <section className="phead">
    <div className="wrap">
      <h1 className="up">{title}</h1>
      {text && <p className="up" style={{ animationDelay: '.15s' }}>{text}</p>}
    </div>
  </section>
)

const StatsBar = () => (
  <section className="sec dark">
    <div className="wrap stats">
      <div><strong><Counter value={30} suffix="+" /></strong><span>Projects completed</span></div>
      <div><strong><Counter value={services.length} /></strong><span>Core services</span></div>
    </div>
  </section>
)

export function Home() {
  return (
    <>
      <section className="hero">
        <img className="hero-img" src="/images/hero.png" alt="" />
        <div className="hero-shade" />
        <div className="wrap hero-c">
          <div className="hero-word up">DEXTER</div>
          <h1 className="up" style={{ animationDelay: '.2s' }}>{company.tagline}</h1>
          <p className="up" style={{ animationDelay: '.35s' }}>Construction, interiors and real estate, planned and delivered with care.</p>
          <div className="btns up" style={{ animationDelay: '.5s' }}>
            <Link className="btn btn-r" to="/projects">View our work</Link>
            <Link className="btn btn-l" to="/contact">Contact us</Link>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="wrap grid3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120}>
              <div className="scard">
                <h3>{s.title}</h3>
                <p>{s.short}</p>
                <Link to="/services">Learn more</Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <Reveal>
            <h2>Why people build with Dexter Builders</h2>
            <p>Every project is personal. From the first conversation to the finishing touches, I believe in putting honest effort, careful planning, and attention to detail into every build. My goal is to create spaces that are practical, well-built, and made to last.</p>
            <ul className="ticks">
              <li>Clear communication and realistic timelines</li>
              <li>Careful selection of materials and workmanship</li>
              <li>Personal attention from start to finish</li>
              <li>A commitment to quality in every project</li>
            </ul>
            <Link to="/about" className="btn btn-d">About us</Link>
          </Reveal>
          <Reveal className="split-img" delay={150}><img src="/images/project 1/p1-1.jpg" alt="Apartment building by Dexter Builders" /></Reveal>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="head">
            <h2>Our projects</h2>
            <Link to="/projects" className="btn btn-o">All projects</Link>
          </div>
          <ProjectsRow />
        </div>
      </section>

      <StatsBar />

      <section className="sec">
        <div className="wrap">
          <h2>How we work</h2>
          <div className="steps">
            {steps.map(([t, x], i) => (
              <Reveal key={t} delay={i * 100}>
                <div className="step"><b>{i + 1}</b><h3>{t}</h3><p>{x}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="wrap">
          <h2>Planning to build? Let's talk.</h2>
          <Link to="/contact" className="btn btn-r">Start a project</Link>
        </div>
      </section>
    </>
  )
}

export function Services() {
  const [showInteriorGallery, setShowInteriorGallery] = useState(false)

  return (
    <>
      <PageHead title="Services" text="Construction, interiors and real estate under one roof." />
      {services.map((s, i) => (
        <section key={s.title} className={`sec ${i % 2 ? 'alt' : ''}`}>
          <div className={`wrap split ${i % 2 ? 'rev' : ''}`}>
            <Reveal>
              <h2>{s.title}</h2>
              <p>{s.short}</p>
              <ul className="ticks">
                {s.points.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <Link to="/contact" className="btn btn-d">Enquire now</Link>

              {s.title === 'Interiors' && (
                <button
                  type="button"
                  className="btn btn-o"
                  style={{ marginLeft: 12, marginTop: 12, cursor: 'pointer' }}
                  aria-expanded={showInteriorGallery}
                  onClick={() => setShowInteriorGallery((visible) => !visible)}
                >
                  {showInteriorGallery ? 'Hide images' : 'View images'}
                </button>
              )}
            </Reveal>
            <Reveal className="split-img" delay={150}>
              <img src={s.img} alt={s.title} />
            </Reveal>
          </div>

          {s.title === 'Interiors' && showInteriorGallery && (
            <div className="wrap" style={{ marginTop: 32 }}>
              <h3 style={{ marginBottom: 20 }}>Interior Project Gallery</h3>
              {s.images?.length ? (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: 20,
                  }}
                >
                  {s.images.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt="Dexter Builders interior project"
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: 240,
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  ))}
                </div>
              ) : (
                <p>Add interior photo paths to the images array in src/data.js.</p>
              )}
            </div>
          )}
        </section>
      ))}
    </>
  )
}

export function About() {
  const values = [
    ['Quality', 'I pay attention to the details, materials, and finish that help make a space practical and built to last.'],
    ['Transparency', 'I believe in open communication, clear expectations, and keeping clients informed as work progresses.'],
    ['Commitment', 'I take personal responsibility for the work and approach every project with care, effort, and respect for the client’s vision.'],
  ]
  return (
    <>
      <PageHead title="About Dexter Builders" text={company.tagline} />
      <section className="sec">
        <div className="wrap split">
          <Reveal>
            <h2>Our story</h2>
            <p>Dexter Builders is built on a simple belief: good construction begins with hard work, honesty, and personal responsibility. As an independent builder, I take pride in being closely involved in every project, understanding each client’s needs, and working towards a result they can feel proud of.</p>
            <p>Every new project is an opportunity to learn, improve, and build lasting relationships. Whether it involves a new home, a renovation, or another construction project, I approach the work with dedication, careful planning, and respect for the client’s vision.</p>
            <p>My aim is simple: to build with care, communicate openly, and deliver work that reflects the effort put into it. Every project carries my commitment to doing the job properly, one step at a time.</p>
          </Reveal>
          <Reveal className="split-img" delay={150}><img src="/images/p2-1.png" alt="Building by Dexter Builders" /></Reveal>
        </div>
      </section>
      <StatsBar />
      <section className="sec alt">
        <div className="wrap">
          <h2>What we value</h2>
          <div className="grid3" style={{ marginTop: 32 }}>
            {values.map(([t, x], i) => (
              <Reveal key={t} delay={i * 120}><div className="scard"><h3>{t}</h3><p>{x}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <h2>{company.person}</h2>
          <p style={{ margin: '12px 0 20px' }}>One builder. Every project. A personal commitment.</p>
          <p style={{ maxWidth: 680, marginBottom: 24 }}>I believe the difference is in the details. I take the time to understand what each project needs, put in the work, and keep moving forward until the pieces come together. Every new association is a chance to create something meaningful through trust, effort, and quality workmanship.</p>
          <Link to="/contact" className="btn btn-d">Let’s build together</Link>
        </div>
      </section>
    </>
  )
}

export function Projects() {
  return (
    <>
      <PageHead title="Projects" text="Scroll sideways to browse our work. Open any project for photos and details." />
      <section className="sec"><div className="wrap"><ProjectsRow /></div></section>
    </>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const [lb, setLb] = useState(null)
  const i = projects.findIndex((p) => p.slug === slug)
  if (i < 0) return <PageHead title="Project not found" text="This project does not exist. Go back to the projects page." />
  const p = projects[i]
  const n = projects.length
  const prev = projects[(i + n - 1) % n]
  const next = projects[(i + 1) % n]
  const specs = [
    ['Location', p.location],
    ['Status', p.status],
    ['Type', p.type],
    ['Length', p.length],
    ['Width', p.width],
    ['Land area', p.area],
    ['Built-up area', p.builtUpArea],
    ['Floors', p.floors],
  ]
return (
    <>
      <section className="phead">
        <div className="wrap">
          <h1 className="up">{p.name}</h1>

          {p.mapUrl && (
            <p className="up" style={{ animationDelay: '.15s' }}>
              <a
                href={p.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white', textDecoration: 'underline' }}
              >
                View on Google Maps ↗
              </a>
            </p>
          )}
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <Reveal><img className="dcover" src={p.cover} alt={p.name} /></Reveal>
          <div className="specs">{specs.map(([k, v]) => <div key={k}><small>{k}</small><b>{v}</b></div>)}</div>
          <Reveal>
            <h2>About this project</h2>
            <p className="dtext">{p.description}</p>
          </Reveal>
          <h2 style={{ marginBottom: 24 }}>Photos</h2>
          <div className="gal">
            {p.images.map((src) => <img key={src} src={src} alt={p.name} onClick={() => setLb(src)} />)}
          </div>
          <div className="pn">
            <Link to={`/projects/${prev.slug}`}>← {prev.name}</Link>
            <Link to={`/projects/${next.slug}`}>{next.name} →</Link>
          </div>
        </div>
      </section>
      {lb && <div className="lb" onClick={() => setLb(null)}><img src={lb} alt="" /></div>}
    </>
  )
}

export function Contact() {
  const send = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const body = `Name: ${f.get('name')}\nPhone: ${f.get('phone')}\n\n${f.get('message')}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent('Enquiry from ' + f.get('name'))}&body=${encodeURIComponent(body)}`
  }
  return (
    <>
      <PageHead title="Contact" text="Tell us about your plot and your plans. We will get back to you." />
      <section className="sec">
        <div className="wrap cgrid">
          <div className="info">
            <p><small>Contact person</small>{company.person}</p>
            <p><small>Phone</small><a href={`tel:${company.phoneLink}`}>{company.phone}</a></p>
            <p><small>Email</small><a href={`mailto:${company.email}`}>{company.email}</a></p>
            <p><small>Hours</small>{company.hours}</p>
          </div>
          <form onSubmit={send}>
            <input name="name" placeholder="Your name" required />
            <input name="phone" placeholder="Phone number" required />
            <textarea name="message" rows="5" placeholder="Tell us about your project" required />
            <button className="btn btn-d" type="submit">Send enquiry</button>
          </form>
        </div>
      </section>
    </>
  )
}
