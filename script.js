       // ── 1. THEME TOGGLE ──────────────────────────────────────────
        const themeBtn = document.querySelector('.theme-toggle');
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            themeBtn.textContent = document.body.classList.contains('light-mode') ? '◑' : '◐';
        });

        // ── 2. CUSTOM CURSOR ─────────────────────────────────────────
        const cursor     = document.getElementById('cursor');
        const cursorRing = document.getElementById('cursor-ring');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left     = e.clientX + 'px';
            cursor.style.top      = e.clientY + 'px';
            cursorRing.style.left = e.clientX + 'px';
            cursorRing.style.top  = e.clientY + 'px';
        });

        // Enlarge cursor on interactive elements
        const hoverTargets = document.querySelectorAll('a, button, .project-card, .nav-menu-btn');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovered');
                cursorRing.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovered');
                cursorRing.classList.remove('hovered');
            });
        });

        // ── 3. SCROLL FADE-IN (IntersectionObserver) ─────────────────
        const fadeEls = document.querySelectorAll('.info-row, .project-card, .section-header, .info-section');
        fadeEls.forEach(el => el.classList.add('fade-in'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, i * 80);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        fadeEls.forEach(el => observer.observe(el));

        // ── 4. SCROLL-TO-TOP BUTTON ───────────────────────────────────
        const scrollTopBtn = document.getElementById('scroll-top');

        window.addEventListener('scroll', () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // ── 5. NAV MENU BUTTON TOGGLE ────────────────────────────────
        const navMenuBtn = document.querySelector('.nav-menu-btn');
        navMenuBtn.addEventListener('click', () => {
            navMenuBtn.classList.toggle('active');
        });

        // ── 6. SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ── 7. SKILL TAGS — CLICK TOAST ──────────────────────────────
        const skillMap = {
            'HTML/CSS':    '🎨 The foundation of every webpage.',
            'JavaScript':  '⚡ Brings interactivity to life.',
            'React':       '⚛️  Component-based UI library by Meta.',
            'Node.js':     '🟢 JavaScript on the server side.'
        };

        document.querySelectorAll('.info-section ul li').forEach(li => {
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
                const tip = skillMap[li.textContent.trim()];
                if (!tip) return;
                const toast = document.createElement('div');
                toast.textContent = tip;
                Object.assign(toast.style, {
                    position: 'fixed', bottom: '80px', left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#06aa08', color: '#000',
                    padding: '8px 20px', borderRadius: '20px',
                    fontFamily: 'Space Mono, monospace', fontSize: '12px',
                    zIndex: '9999', opacity: '1',
                    transition: 'opacity 0.5s ease'
                });
                document.body.appendChild(toast);
                setTimeout(() => { toast.style.opacity = '0'; }, 1800);
                setTimeout(() => toast.remove(), 2400);
            });
        });