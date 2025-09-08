document.addEventListener('DOMContentLoaded', function () {
    // Gestion du thème clair/sombre
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Vérifier le thème sauvegardé ou utiliser le thème sombre par défaut
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        // Animation du toggle
        gsap.to(themeToggle, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    });

    // Animation typewriter pour le mot qui change
    const changingWord = document.getElementById('changing-word');
    const words = ['Clarté', 'Inspiration', 'Innovation', 'Liberté'];
    let currentIndex = 0;
    let isTyping = false;

    function typeWriter(text, element, callback) {
        let i = 0;
        element.textContent = '';

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100); // Vitesse de frappe
            } else {
                setTimeout(callback, 2000); // Attendre 2 secondes avant d'effacer
            }
        }

        type();
    }

    function deleteText(element, callback) {
        let text = element.textContent;
        let i = text.length;

        function erase() {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(erase, 80); // Vitesse d'effacement
            } else {
                setTimeout(callback, 500); // Pause avant le prochain mot
            }
        }

        erase();
    }

    function cycleWords() {
        if (isTyping) return;
        isTyping = true;

        deleteText(changingWord, () => {
            currentIndex = (currentIndex + 1) % words.length;
            typeWriter(words[currentIndex], changingWord, () => {
                isTyping = false;
                setTimeout(cycleWords, 2000); // Attendre 2 secondes avant le prochain cycle
            });
        });
    }

    // Démarrer l'animation après 3 secondes
    setTimeout(() => {
        cycleWords();
    }, 3000);

    // Script pour les FAQ
    document.querySelectorAll('details').forEach((detail) => {
        detail.addEventListener('toggle', () => {
            const summary = detail.querySelector('summary');
            const icon = summary.querySelector('span');
            if (detail.open) {
                icon.style.transform = 'rotate(45deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Variables pour la modale
    const allBubbles = document.querySelectorAll('.floating-bubble');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    // Animations GSAP de fond pour les bulles
    allBubbles.forEach(bubble => {
        const randomDuration = gsap.utils.random(20, 35);
        gsap.to(bubble, {
            y: "random(-15, 15)",
            x: "random(-10, 10)",
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: "random(0, 2)"
        });
    });

    // Fonction d'explosion
    function createExplosion(x, y, color) {
        const container = document.body;
        const [r, g, b] = color.match(/\d+/g).map(Number);

        // Flash
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.inset = '0';
        flash.style.backgroundColor = 'white';
        flash.style.zIndex = '200';
        flash.style.pointerEvents = 'none';
        container.appendChild(flash);
        gsap.to(flash, {opacity: 0, duration: 0.4, ease: "power1.out", onComplete: () => flash.remove()});

        // Onde de choc
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
        gsap.fromTo(shockwave,
            {width: 0, height: 0, opacity: 1},
            {
                width: 500,
                height: 500,
                opacity: 0,
                duration: 0.6,
                ease: "expo.out",
                onComplete: () => shockwave.remove()
            }
        );

        // Particules
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

            gsap.set(particle, {x: x - size / 2, y: y - size / 2, opacity: 1});
            gsap.to(particle, {
                x: endX, y: endY, opacity: 0, scale: 0,
                duration: gsap.utils.random(1.5, 2.5),
                ease: "expo.out",
                onComplete: () => particle.remove()
            });
        }
    }

    // Logique d'ouverture de la modale
    allBubbles.forEach(bubble => {
        bubble.addEventListener('click', (e) => {
            if (document.body.classList.contains('modal-open')) return;
            document.body.classList.add('modal-open');

            const style = getComputedStyle(bubble);
            const color = style.backgroundColor;

            gsap.timeline()
                .to(bubble, {scale: 0.9, duration: 0.1, ease: "power1.in"})
                .to(bubble, {
                    scale: 1, duration: 0.5, ease: "elastic.out(1, 0.6)",
                    onStart: () => createExplosion(e.clientX, e.clientY, color)
                });

            setTimeout(() => {
                modalTitle.textContent = bubble.dataset.title;
                modalText.textContent = bubble.dataset.text;
                modal.classList.add('active');
                modalContent.classList.add('modal-blob-shape');

                gsap.fromTo(modalContent,
                    {scale: 0.5, y: 100, rotation: -15, opacity: 0},
                    {scale: 1, y: 0, rotation: 0, opacity: 1, duration: 0.6, ease: "elastic.out(1, 0.7)"}
                );
            }, 250);
        });
    });

    // Logique de fermeture de la modale
    function closeModal() {
        gsap.to(modalContent, {
            scale: 0.5, y: 100, opacity: 0, rotation: 15,
            duration: 0.3, ease: "power2.in",
            onComplete: () => {
                modal.classList.remove('active');
                modalContent.classList.remove('modal-blob-shape');
                document.body.classList.remove('modal-open');
            }
        });
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});