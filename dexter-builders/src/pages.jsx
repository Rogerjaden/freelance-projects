import { useEffect, useState } from 'react'
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
            <div className="head-copy">
              <h2>Some of Our Valued Projects</h2>
              <p>A selection of our work, built with care, quality, and attention to detail.</p>
            </div>
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
                <Link
                  to="/interiors"
                  className="btn btn-o"
                  style={{ marginLeft: 12, marginTop: 12 }}
                >
                  View images
                </Link>
              )}
            </Reveal>
            <Reveal className="split-img" delay={150}>
              <img src={s.img} alt={s.title} />
            </Reveal>
          </div>
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
            <p>Complete Property Solutions Under One Roof: Construction, Interiors & Real Estate.</p>
            <p>Backed by 10 years of trusted foundational experience, Dexter builders is growing rapidly to build, design, and deliver your dream spaces in Coimbatore and dindigul.</p>
            <h1>About us</h1>
            <br></br>
            <h3>A Decade of Experience. A New Era of Growth.</h3>
            <p>For the past 10 years, we have built our reputation from the ground up through hard work, quality craftsmanship, and client trust. Today, Dexter Builders is stepping into an exciting new phase of growth. We have expanded our team and capabilities to offer seamless, end-to-end property services. Whether you are looking to buy the right plot, construct a strong building, or design stunning interiors, you no longer need to manage multiple contractors—we handle it all from start to finish.</p>
          </Reveal>
          <Reveal className="split-img" delay={150}><img src="/images/project 2/p2-1.png" alt="Building by Dexter Builders" /></Reveal>
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

function ImageLightbox({ images, index, onChange, onClose, alt }) {
  useEffect(() => {
    if (index === null) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [index, images.length, onChange, onClose])

  if (index === null || !images[index]) return null

  const previous = () => onChange((index - 1 + images.length) % images.length)
  const next = () => onChange((index + 1) % images.length)

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button className="lb-close" type="button" aria-label="Close photo viewer" onClick={onClose}>×</button>
      <button className="lb-nav lb-prev" type="button" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); previous() }}>‹</button>
      <figure className="lb-figure" onClick={(event) => event.stopPropagation()}>
        <img src={images[index]} alt={`${alt} ${index + 1}`} />
        <figcaption>{index + 1} / {images.length}</figcaption>
      </figure>
      <button className="lb-nav lb-next" type="button" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); next() }}>›</button>
    </div>
  )
}

export function InteriorGallery() {
  const interiorService = services.find((service) => service.title === 'Interiors')
  const images = interiorService?.images ?? []
  const [activeImage, setActiveImage] = useState(null)

  return (
    <>
      <PageHead title="Interior Project Gallery" text="Explore our interior work, from thoughtful layouts to carefully finished details." />
      <section className="sec">
        <div className="wrap">
          <div className="gallery-intro">
            <Link to="/services" className="gallery-back">← Back to services</Link>
            <p>{images.length} interior photos</p>
          </div>
          {images.length ? (
            <div className="gal interior-gal">
              {images.map((src, index) => (
                <button className="gallery-tile" type="button" key={src} onClick={() => setActiveImage(index)} aria-label={`Open interior photo ${index + 1}`}>
                  <img src={src} alt={`Dexter Builders interior ${index + 1}`} loading="lazy" />
                  <span>View photo ↗</span>
                </button>
              ))}
            </div>
          ) : <p>No interior photos have been added yet.</p>}
        </div>
      </section>
      <ImageLightbox
        images={images}
        index={activeImage}
        onChange={setActiveImage}
        onClose={() => setActiveImage(null)}
        alt="Interior project photo"
      />
    </>
  )
}

export function Projects() {
  return (
    <>
      <PageHead title="Some of Our Valued Projects" text="Explore a selection of our work, showcasing our commitment to quality construction, thoughtful design, and lasting value. Open any project to view photos and details." />
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
            {p.images.map((src, index) => (
              <button className="gallery-tile" type="button" key={src} onClick={() => setLb(index)} aria-label={`Open ${p.name} photo ${index + 1}`}>
                <img src={src} alt={`${p.name} photo ${index + 1}`} loading="lazy" />
                <span>View photo ↗</span>
              </button>
            ))}
          </div>
          <div className="pn">
            <Link to={`/projects/${prev.slug}`}>← {prev.name}</Link>
            <Link to={`/projects/${next.slug}`}>{next.name} →</Link>
          </div>
        </div>
      </section>
      <ImageLightbox
        images={p.images}
        index={lb}
        onChange={setLb}
        onClose={() => setLb(null)}
        alt={p.name}
      />
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
            <p>
              <small>Phone</small>
              <a href={`tel:${company.phoneLink}`}>{company.phone}</a>
              {' | '}
              <a
                href={`https://wa.me/${company.phoneLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </p>
            <p><small>Contact person</small>{company.secondPerson}</p>
            <p>
              <small>Phone</small>
              <a href={`tel:${company.secondPhoneLink}`}>
                {company.secondPhone}
              </a>
              {' | '}
              <a
                href={`https://wa.me/${company.secondPhoneLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </p>
            <p><small>Email</small><a href={`mailto:${company.email}`}>{company.email}</a></p>
            <p><small>Hours</small>{company.hours}</p>
          </div>
          <form onSubmit={send}>
            <input
              name="name"
              placeholder="Your name"
              required
              pattern="[A-Za-z ]+"
              title="Please enter your name using letters and spaces only."
              onChange={(e) => {
                e.target.value = e.target.value.replace(/[^A-Za-z ]/g, '')
              }}
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              required
              inputMode="numeric"
              pattern="[0-9]{10}"
              maxLength={10}
              title="Please enter a valid 10-digit phone number."
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
              }}
            />
            <textarea name="message" rows="5" placeholder="Tell us about your project" required />
            <button className="btn btn-d" type="submit">Send enquiry</button>
          </form>
        </div>
      </section>
    </>
  )
}
