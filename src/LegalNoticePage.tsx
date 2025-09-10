import React, { useEffect } from 'react';
import Header from './components/Header';
import { Link } from 'react-router-dom';

const LegalNoticePage: React.FC = () => {
  useEffect(() => {
    const body = document.body;
    body.classList.add('bg-black', 'text-white');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
    }

    const themeToggle = document.getElementById('theme-toggle');
    const onClick = () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      // @ts-ignore
      if (window.gsap) {
        // @ts-ignore
        window.gsap.to(themeToggle, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' });
      }
    };
    themeToggle?.addEventListener('click', onClick);
    return () => themeToggle?.removeEventListener('click', onClick);
  }, []);
  return (
    <>
      <Header />
      <nav className="bg-black text-white">
        <div className="container mx-auto px-4 py-4 text-sm text-white/70">
          <Link to="/" className="hover:text-white underline">Accueil</Link>
          <span className="mx-2">/</span>
          <span className="text-white/60">Mentions légales & RGPD</span>
        </div>
      </nav>
      <main className="min-h-screen bg-black text-white px-4 py-12">
      <div className="container mx-auto max-w-3xl space-y-8">
        <header>
          <h1 className="text-4xl font-bold mb-2">Mentions légales & Politique de confidentialité (RGPD)</h1>
          <p className="text-white/70">Dernière mise à jour : 10/09/2025</p>
        </header>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Éditeur du site</h2>
          <p><span className="text-white/70">Raison sociale</span> : DoozyJo (SAS)</p>
          <p><span className="text-white/70">Siège social</span> : 41 RUE PASTEUR, 76530 GRAND-COURONNE</p>
          <p><span className="text-white/70">RCS / SIREN</span> : 928 227 917 R.C.S. Rouen / 928227917</p>
          <p><span className="text-white/70">Directeur de la publication</span> : Antoine FOURCIN, Dirigeant</p>
          <p><span className="text-white/70">Contact</span> : <a href="mailto:contact@doozyjo.fr" className="underline">contact@doozyjo.fr</a></p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Hébergeur</h2>
          <p><span className="text-white/70">Hébergeur</span> : LWS (Ligne Web Services)</p>
          <p><span className="text-white/70">Adresse</span> : 10, RUE PENTHIEVRE, 75008 PARIS, FRANCE</p>
          <p>Téléphone : <a href="tel:+331 77 62 30 03" className="underline">01 77 62 30 03</a></p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Délégué à la protection des données (DPO)</h2>
          <p>Contact DPO : <a href="mailto:contact@doozyjo.fr" className="underline">contact@doozyjo.fr</a></p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Finalités et bases légales</h2>
          <ul className="list-disc pl-6 space-y-1 ">
            <li>Gestion de la liste d’attente et envoi d’informations (consentement, art. 6.1.a RGPD)</li>
            <li>Fonctionnement, sécurité et amélioration du site (intérêt légitime, art. 6.1.f)</li>
            <li>Respect des obligations légales (obligation légale, art. 6.1.c)</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Données personnelles collectées</h2>
          <ul className="list-disc pl-6 space-y-1 ">
            <li>Identité et contact: nom, email</li>
            <li>Données de navigation: pages consultées, logs techniques, cookies</li>
            <li>Échanges: contenus des messages via formulaires/support</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Durées de conservation</h2>
          <ul className="list-disc pl-6 space-y-1 ">
            <li>Liste d’attente / newsletter: jusqu’au retrait du consentement ou 3 ans sans interaction</li>
            <li>Logs techniques: 6 à 13 mois selon la finalité de sécurité</li>
            <li>Pièces comptables/contractuelles: durées légales applicables</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Destinataires</h2>
          <p>Accès restreint aux équipes habilitées de DoozyJo et à nos sous-traitants (hébergement, emailing, analytics) liés par clauses contractuelles conformes au RGPD.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Transferts hors UE</h2>
          <p>En cas de transferts, ils sont encadrés par des garanties appropriées (clauses contractuelles types, mesures complémentaires). Informations disponibles sur demande.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Vos droits</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Droit d’accès, de rectification, d’effacement</li>
            <li>Droit d’opposition et de limitation</li>
            <li>Droit à la portabilité</li>
            <li>Droit de retirer votre consentement à tout moment</li>
            <li>Directive sur le sort des données après décès</li>
          </ul>
          <p>Exercer vos droits: <a href="mailto:contact@doozyjo.fr" className="underline">contact@doozyjo.fr</a>. Joindre un justificatif d’identité si nécessaire.</p>
          <p>Réclamation possible auprès de la CNIL: <a className="underline" href="https://www.cnil.fr">https://www.cnil.fr</a>.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Cookies et traceurs</h2>
          <p>Des cookies techniques (indispensables) et, le cas échéant, des cookies de mesure d’audience et marketing peuvent être utilisés. Vous pouvez gérer vos préférences via le bandeau cookies. Le refus des cookies non essentiels n’entrave pas l’accès au site.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Sécurité</h2>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données (chiffrement en transit, contrôle d’accès, journalisation, sauvegardes).</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Modifications</h2>
          <p>Nous pouvons mettre à jour cette page pour refléter les évolutions légales ou techniques. Les changements importants seront notifiés.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <p>Contact général: <a href="mailto:contact@doozyjo.fr" className="underline">contact@doozyjo.fr</a></p>
        </section>
      </div>
      </main>
    </>
  );
};

export default LegalNoticePage;
