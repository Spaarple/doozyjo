import React, { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Link } from 'react-router-dom'

const ThankYou: React.FC = () => {
  useEffect(() => {
    const body = document.body
    body.classList.add('bg-black', 'text-white')
    const saved = localStorage.getItem('theme') || 'dark'
    if (saved === 'light') body.classList.add('light-mode')
    else body.classList.remove('light-mode')

    const toggle = document.getElementById('theme-toggle')
    const onClick = () => {
      body.classList.toggle('light-mode')
      const isLight = body.classList.contains('light-mode')
      localStorage.setItem('theme', isLight ? 'light' : 'dark')
    }
    toggle?.addEventListener('click', onClick)
    return () => toggle?.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <Header />

      <main className="min-h-[70vh] bg-black text-white">

        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[5%] left-[5%] h-32 w-32 rounded-full bg-[var(--intense-blue)] opacity-40 blur-3xl shape animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[10%] h-40 w-40 bg-[var(--vivid-orange)] opacity-50 blur-3xl shape" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
          <div className="absolute top-[20%] right-[15%] h-28 w-28 bg-[var(--bright-yellow)] opacity-40 blur-3xl shape"></div>
          <div className="absolute bottom-[5%] left-[15%] h-36 w-36 rounded-lg bg-[var(--deep-purple)] opacity-60 blur-2xl shape animate-pulse-slow"></div>
          <div className="absolute top-[50%] left-[50%] h-24 w-24 translate-x-[-50%] translate-y-[-50%] bg-white opacity-10 blur-2xl shape"></div>
      </div>

        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-gray-50">
              {/* simple check icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold">Merci pour votre inscription 🎉</h1>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
              <p className="mt-4 text-white/80 text-lg">
                Votre inscription a bien été prise en compte. Vous recevrez un e-mail dès que notre campagne
                de <span className="font-semibold">crowdfunding</span> sera lancée.
              </p>
              <p className="mt-6 text-md">
                Pensez à ajouter <a className="underline" href="mailto:contact@doozyjo.fr">contact@doozyjo.fr</a>&nbsp;
                à vos contacts pour éviter que nos messages n'arrivent dans vos spams ou votre courrier indésirable.
              </p>

              <div className="mt-4">
                <p className="text-white/80">Suivez nos actualités :</p>
                <div className="mt-2 flex items-center gap-3">
                  <a
                    href="https://instagram.com/doozyjo_fr"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 hover:bg-white/10 transition"
                  >
                    {/* Instagram glyph (simple) */}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6"/>
                      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                    </svg>
                    <span>@doozyjo_fr</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <Link
                to="/"
                className="inline-block rounded-lg bg-[var(--vivid-orange)] px-6 py-3 font-bold text-black hover:scale-105 transition"
              >
                Retour à l’accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ThankYou
