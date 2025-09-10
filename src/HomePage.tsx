import React, { useEffect, useRef } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import WaitlistForm from './components/WaitlistForm';

const HomePage: React.FC = () => {
  const hasInitRef = useRef(false);

  useEffect(() => {
    if (hasInitRef.current) return;
    hasInitRef.current = true;

    const body = document.body;
    // Couleurs de fond/texte par défaut comme dans la version statique
    body.classList.add('bg-black', 'text-white');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
    }

    //const themeToggle = document.getElementById('theme-toggle');
    const themeToggle = document.querySelectorAll('.theme-toggle');
    if (themeToggle) {
      themeToggle.forEach((toggle) => {
        toggle.addEventListener('click', () => {
          if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
          } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
          }
        });
      });
    }

    document.querySelectorAll('details').forEach((detail) => {
      detail.addEventListener('toggle', () => {
        const summary = detail.querySelector('summary');
        const icon = summary?.querySelector('span') as HTMLElement | null;
        if (!icon) return;
        icon.style.transform = detail.open ? 'rotate(45deg)' : 'rotate(0deg)';
      });
    });

    // Rendre toute la carte d'accordéon cliquable (au-delà du <summary>)
    document.querySelectorAll('details.faq-item').forEach((detail) => {
      detail.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        // Évite la double bascule quand on clique sur <summary> ou éléments interactifs
        if (target.closest('summary, a, button, input, textarea, select, label')) return;
        const el = detail as HTMLDetailsElement;
        el.open = !el.open;
      });
    });

    // @ts-ignore
    if (window.gsap) {
      const gsap = (window as any).gsap;
      document.querySelectorAll('.floating-bubble').forEach((bubble) => {
        gsap.to(bubble, {
          y: 'random(-15, 15)',
          x: 'random(-10, 10)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 'random(0, 2)'
        });
      });
    }

    // Animation typewriter pour le mot changeant
    const changingWord = document.getElementById('changing-word');
    const words = ['Clarté', 'Inspiration', 'Innovation', 'Liberté'];
    let currentIndex = 0;
    let isTyping = false;
    function typeWriter(text: string, element: HTMLElement, callback: () => void) {
      let i = 0;
      element.textContent = '';
      function type() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(type, 100);
        } else {
          setTimeout(callback, 2000);
        }
      }
      type();
    }
    function deleteText(element: HTMLElement, callback: () => void) {
      let text = element.textContent || '';
      let i = text.length;
      function erase() {
        if (i > 0) {
          element.textContent = text.substring(0, i - 1);
          i--;
          setTimeout(erase, 80);
        } else {
          setTimeout(callback, 500);
        }
      }
      erase();
    }
    function cycleWords() {
      if (isTyping || !changingWord) return;
      isTyping = true;
      deleteText(changingWord, () => {
        currentIndex = (currentIndex + 1) % words.length;
        typeWriter(words[currentIndex], changingWord!, () => {
          isTyping = false;
          setTimeout(cycleWords, 2000);
        });
      });
    }
    setTimeout(() => { if (changingWord) cycleWords(); }, 3000);

    // Modale: ouverture/fermeture + remplissage titre/texte
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    // Effet d'explosion GSAP comme dans la version statique
    function createExplosion(x: number, y: number, color: string) {
      // @ts-ignore
      const gsap = window.gsap;
      const container = document.body;
      const match = color.match(/\d+/g);
      if (!gsap || !match) return;
      const [r, g, b] = match.map(Number);
      const flash = document.createElement('div');
      flash.style.position = 'fixed';
      flash.style.inset = '0';
      flash.style.backgroundColor = 'white';
      flash.style.zIndex = '200';
      flash.style.pointerEvents = 'none';
      container.appendChild(flash);
      gsap.to(flash, { opacity: 0, duration: 0.4, ease: 'power1.out', onComplete: () => flash.remove() });

      const shockwave = document.createElement('div');
      shockwave.style.position = 'fixed';
      shockwave.style.left = `${x}px`;
      shockwave.style.top = `${y}px`;
      shockwave.style.borderRadius = '50%';
      shockwave.style.border = `4px solid rgba(${r + 50}, ${g + 50}, ${b + 50}, 0.8)`;
      shockwave.style.zIndex = '150';
      shockwave.style.transform = 'translate(-50%, -50%)';
      shockwave.style.pointerEvents = 'none';
      container.appendChild(shockwave);
      gsap.fromTo(
        shockwave,
        { width: 0, height: 0, opacity: 1 },
        { width: 500, height: 500, opacity: 0, duration: 0.6, ease: 'expo.out', onComplete: () => shockwave.remove() }
      );

      const particleCount = 100;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.top = '0';
        particle.style.left = '0';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        const size = gsap.utils.random(5, 30);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `radial-gradient(circle, rgba(255,255,255,0.9) 0%, ${color} 80%)`;
        particle.style.borderRadius = '50%';
        container.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const radius = gsap.utils.random(100, window.innerWidth / 2);
        const endX = x + radius * Math.cos(angle);
        const endY = y + radius * Math.sin(angle);
        gsap.set(particle, { x: x - size / 2, y: y - size / 2, opacity: 1 });
        gsap.to(particle, { x: endX, y: endY, opacity: 0, scale: 0, duration: gsap.utils.random(1.5, 2.5), ease: 'expo.out', onComplete: () => particle.remove() });
      }
    }

    function openModal(title: string, text: string) {
      if (!modal || !modalContent || !modalTitle || !modalText) return;
      modalTitle.textContent = title;
      modalText.textContent = text;
      document.body.classList.add('modal-open');
      modal.classList.add('active');
      modalContent.classList.add('modal-blob-shape');
      // @ts-ignore
      if (window.gsap) {
        // @ts-ignore
        window.gsap.fromTo(modalContent, { scale: 0.5, y: 100, rotation: -15, opacity: 0 }, { scale: 1, y: 0, rotation: 0, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.7)' });
      }
    }

    function closeModal() {
      if (!modal || !modalContent) return;
      // @ts-ignore
      if (window.gsap) {
        // @ts-ignore
        window.gsap.to(modalContent, { scale: 0.5, y: 100, opacity: 0, rotation: 15, duration: 0.3, ease: 'power2.in', onComplete: () => {
          modal.classList.remove('active');
          modalContent.classList.remove('modal-blob-shape');
          document.body.classList.remove('modal-open');
        }});
      } else {
        modal.classList.remove('active');
        modalContent.classList.remove('modal-blob-shape');
        document.body.classList.remove('modal-open');
      }
    }

    document.querySelectorAll('.floating-bubble').forEach((el) => {
      el.addEventListener('click', (e: Event) => {
        const dataset = (el as HTMLElement).dataset as { title?: string; text?: string };
        // Effet d'interaction
        // @ts-ignore
        if (window.gsap) {
          // @ts-ignore
          const gsap = window.gsap;
          gsap.timeline()
            .to(el, { scale: 0.9, duration: 0.1, ease: 'power1.in' })
            .to(el, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
          const style = getComputedStyle(el as Element);
          const color = style.backgroundColor;
          const evt = e as MouseEvent;
          createExplosion(evt.clientX, evt.clientY, color);
        }
        openModal(dataset.title || '', dataset.text || '');
      });
    });

    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[5%] left-[5%] h-32 w-32 rounded-full bg-[var(--intense-blue)] opacity-40 blur-3xl shape animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[10%] h-40 w-40 bg-[var(--vivid-orange)] opacity-50 blur-3xl shape" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        <div className="absolute top-[20%] right-[15%] h-28 w-28 bg-[var(--bright-yellow)] opacity-40 blur-3xl shape"></div>
        <div className="absolute bottom-[5%] left-[15%] h-36 w-36 rounded-lg bg-[var(--deep-purple)] opacity-60 blur-2xl shape animate-pulse-slow"></div>
        <div className="absolute top-[50%] left-[50%] h-24 w-24 translate-x-[-50%] translate-y-[-50%] bg-white opacity-10 blur-2xl shape"></div>
      </div>
      <Header />
      <main className="relative z-10">
        <section className="py-20 md:py-32 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight dark:text-white text-dark">
              Façonnez le futur avec{' '}
              <span id="changing-word" className="text-[var(--vivid-orange)]">Créativité</span>
              <span id="cursor" className="text-[var(--vivid-orange)] animate-pulse">|</span>
            </h2>
            <p className="mt-4 text-lg md:text-xl text-slate-800 max-w-2xl mx-auto">
              Ne perdez plus jamais vos idées. DoozyJo, le bracelet intelligent qui capture et organise
              automatiquement toutes vos pensées en un simple clic, votre cerveau de poche toujours disponible.
            </p>
            <a className="mt-8 inline-block cursor-pointer rounded-lg bg-[var(--vivid-orange)] px-8 py-4 text-lg font-bold text-black dark:text-white transition-transform hover:scale-105 hover:bg-[var(--bright-yellow)] hover:text-[var(--deep-purple)]" href="#cta">
              Je rejoins la liste d’attente
            </a>
          </div>
        </section>

        <section className="py-20" id="features">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold text-center mb-20 dark:text-white text-dark">Pourquoi vous allez adorer Doozyjo</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-8 lg:gap-16" style={{ transform: 'perspective(1500px) rotateX(10deg)' }}>
              <div className="floating-bubble blob-1 w-72 h-72 flex flex-col items-center justify-center p-8 text-center cursor-pointer" style={{ background: 'radial-gradient(circle at 70% 30%, var(--intense-blue), var(--deep-purple))', animationDelay: '0s', ['--shadow-delay' as any]: '0s', ['--shadow-duration' as any]: '7s' }} data-title="Esprit Libre" data-text="Combien d’idées géniales disparaissent chaque jour parce qu’on n’a pas eu le temps de les noter ? DoozyJo capture vos pensées instantanément, sans détour. Une pression sur le bracelet, et c’est enregistré, sauvegardé, organisé. Jour comme nuit, vos inspirations sont protégées. Vous libérez votre esprit, sans craindre d’oublier ce qui compte vraiment.">
                <div className="text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}>🌙</div>
                <h4 className="text-2xl font-bold mb-2">Esprit Libre</h4>
                <p className="text-white/80 text-sm">Dites adieu à la charge mentale.</p>
              </div>
              <div className="floating-bubble blob-2 w-80 h-80 flex flex-col items-center justify-center p-8 text-center cursor-pointer" style={{ background: 'radial-gradient(circle at 30% 70%, var(--vivid-orange), var(--bright-yellow))', animationDelay: '-2s', ['--shadow-delay' as any]: '-2.5s', ['--shadow-duration' as any]: '10s' }} data-title="Action Immédiate" data-text="Une idée, c’est bien. Une action, c’est mieux. Avec DoozyJo, vos enregistrements sont organisés et deviennent des rappels, des listes de tâches ou même des événements dans votre agenda. Notre intelligence artificielle vous aide à structurer vos pensées et à passer du brouillon au concret. Résultat : moins de procrastination, plus d’efficacité, et une créativité qui prend enfin forme.">
                <div className="text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}>⚡️</div>
                <h4 className="text-2xl font-bold mb-2">Action Immédiate</h4>
                <p className="text-white/80 text-sm">De l’inspiration à la réalisation.</p>
              </div>
              <div className="floating-bubble blob-3 w-72 h-72 flex flex-col items-center justify-center p-8 text-center cursor-pointer" style={{ background: 'radial-gradient(circle at 50% 50%, var(--deep-purple), #4a0099)', animationDelay: '-4s', ['--shadow-delay' as any]: '-5s', ['--shadow-duration' as any]: '12s' }} data-title="Créativité Sans Limite" data-text="Chaque utilisateur a son style. Les musiciens enregistrent une mélodie, les parents dictent une liste de courses, les entrepreneurs notent une idée de pitch, et les penseurs nocturnes libèrent leurs réflexions avant de s’endormir. DoozyJo s’adapte à toutes ces vies. Plus qu’un outil, c’est un compagnon qui grandit avec vous et libère votre potentiel créatif, sans contrainte ni limite.">
                <div className="text-5xl mb-4" style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }}>🎵</div>
                <h4 className="text-2xl font-bold mb-2">Créativité Sans Limite</h4>
                <p className="text-white/80 text-sm">Un allié pour chaque profil.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20" id="cta">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="w-full max-w-lg rounded-2xl bg-black/30 backdrop-blur-md border border-white/10 p-8 md:p-12" style={{ transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)', boxShadow: '0 20px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 78, 0, 0.3)' }}>
              <h3 className="text-3xl font-bold text-center mb-2">Accès anticipé : soyez les premiers informés</h3>
              <p className="text-center text-white/70 mb-8">
                Inscrivez-vous gratuitement pour recevoir :
                La date de lancement en avant-première,
                Les offres spéciales early-bird,
                La possibilité de devenir bêta-testeur.
              </p>
              <WaitlistForm />
            </div>
          </div>
        </section>

        <section className="py-20" id="faq">
          <div className="container mx-auto px-4 max-w-3xl">
            <h3 className="text-4xl font-bold text-center mb-12 dark:text-white text-dark">Foire aux questions</h3>
            <div className="space-y-4">
              <details className="faq-item rounded-lg border border-white/10 p-6 cursor-pointer">
                <summary className="text-lg font-semibold flex justify-between items-center">Qu’est-ce que DoozyJo ?<span className="transform transition-transform duration-300 group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-white/70">DoozyJo est un bracelet intelligent relié à une application mobile. En un clic, vous capturez vos idées à la volée et elles sont automatiquement transcrites, organisées et transformées en actions.</p>
              </details>
              <details className="faq-item rounded-lg border border-white/10 p-6 cursor-pointer">
                <summary className="text-lg font-semibold flex justify-between items-center">En quoi est-ce différent des autres solutions ?<span className="transform transition-transform duration-300 group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-white/70">Contrairement aux applis classiques ou aux montres connectées, DoozyJo est conçu pour une seule mission : réduire la charge mentale. Pas de distraction. Pas de superflu. Juste un geste simple, vos idées sont sauvegardées et prêtes à être utilisées.</p>
              </details>
              <details className="faq-item rounded-lg border border-white/10 p-6 cursor-pointer">
                <summary className="text-lg font-semibold flex justify-between items-center">Quand est prévu le lancement officiel ?<span className="transform transition-transform duration-300 group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-white/70">La campagne de crowdfunding arrive début 2026. Les inscrits recevront la date exacte et auront un accès prioritaire aux préventes.</p>
              </details>
              <details className="faq-item rounded-lg border border-white/10 p-6 cursor-pointer">
                <summary className="text-lg font-semibold flex justify-between items-center">Est-ce gratuit de s’inscrire ?<span className="transform transition-transform duration-300 group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-white/70">Oui, totalement gratuit. L’inscription vous donne simplement accès aux infos en avant-première, à la bêta et aux offres exclusives de lancement.</p>
              </details>
              <details className="faq-item rounded-lg border border-white/10 p-6 cursor-pointer">
                <summary className="text-lg font-semibold flex justify-between items-center">Pour qui est fait DoozyJo ?<span className="transform transition-transform duration-300 group-open:rotate-45">+</span></summary>
                <p className="mt-4 text-black dark:text-white/70">Pour tous ceux qui jonglent avec mille pensées au quotidien : créateurs, professionnels, parents, étudiants, musiciens ou penseurs nocturnes. DoozyJo devient une extension naturelle de votre esprit.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* Modale */}
      <div id="modal" className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300 z-50">
        <div id="modal-content" className="bg-white shadow-2xl p-16 lg:p-20 relative max-w-[90vw] lg:max-w-2xl min-w-[300px]">
          <button id="modal-close" className="absolute top-8 right-8 z-10" aria-label="Fermer la modale">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <h2 id="modal-title" className="text-3xl font-bold mb-4 text-gray-800">Titre de la modale</h2>
          <p id="modal-text" className="text-gray-600 leading-relaxed">Description détaillée du service ou de l'information.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

