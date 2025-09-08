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
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-gray-50">
              {/* simple check icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold">Merci pour votre inscription 🎉</h1>
            <p className="mt-4 text-white/80">
              Votre inscription a bien été prise en compte. Vous recevrez un e-mail dès que notre campagne
              de <span className="font-semibold">crowdfunding</span> sera lancée.
            </p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left">
              <h2 className="text-xl font-semibold">Besoin d’aide ?</h2>
              <p className="mt-2 text-white/80">
                Contactez-nous à&nbsp;
                <a className="underline" href="mailto:contact@doozyjo.com">contact@doozyjo.com</a>.
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

            <p className="mt-6 text-sm">
              Astuce : ajoutez <a className="underline" href="mailto:contact@doozyjo.com">contact@doozyjo.com</a> à vos contacts pour ne rien manquer.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ThankYou
