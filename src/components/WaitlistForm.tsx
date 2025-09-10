import React, { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'   // ⬅️ import

type SubmissionState = 'idle' | 'loading' | 'success' | 'error'
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const WaitlistForm: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail]         = useState('')
  const [status, setStatus]       = useState<SubmissionState>('idle')
  const [message, setMessage]     = useState('')

  const navigate = useNavigate()  // ⬅️ hook pour redirection

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!firstName.trim() || firstName.trim().length < 2) {
      setStatus('error'); setMessage('Veuillez saisir un prénom valide (min. 2 caractères).'); return
    }
  
    if (!emailRegex.test(email.trim())) {
      setStatus('error'); setMessage("Veuillez saisir une adresse e-mail valide."); return
    }

    setStatus('loading'); setMessage('')
    try {
      const { error } = await supabase
        .from('preorders') // ou 'waitlist' si tu as choisi cette table
        .insert([{
          first_name: firstName.trim(),
          email:      email.trim(),
        }])

      if (error) {
        console.error('Supabase insert error:', error)
        if ((error as any).code === '23505') {
          setStatus('error'); setMessage("Cet e-mail est déjà inscrit à la liste d'attente.")
        } else {
          setStatus('error'); setMessage("Une erreur est survenue. Merci de réessayer plus tard.")
        }
        return
      }

      // ✅ Redirection vers la page /merci
      navigate('/merci')

    } catch (err) {
      console.error(err)
      setStatus('error'); setMessage("Une erreur inattendue est survenue. Veuillez réessayer.")
    }
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2">
        <label className="text-white/80" htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          name="firstName"
          placeholder="Votre prénom"
          className="form-input w-full rounded-lg border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--vivid-orange)] focus:ring-[var(--vivid-orange)]"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={status === 'loading'}
          autoComplete="given-name"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white/80" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="vous@exemple.com"
          className="form-input w-full rounded-lg border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--vivid-orange)] focus:ring-[var(--vivid-orange)]"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          autoComplete="email"
          required
        />
      </div>

      {message && (
        <div className={status === 'success' ? 'text-green-400 text-sm' : 'text-red-400 text-sm'}>
          {message}
        </div>
      )}

      <button id="submit-form-preorders"
        className="w-full cursor-pointer rounded-lg bg-[var(--vivid-orange)] py-3 text-lg font-bold text-white transition-transform hover:scale-105 hover:bg-[var(--bright-yellow)] hover:text-[var(--deep-purple)] disabled:opacity-60 disabled:cursor-not-allowed"
        type="submit"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? 'Inscription…' : 'Je m’inscris maintenant'}
      </button>
    </form>
  )
}

export default WaitlistForm
