document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('year').textContent = new Date().getFullYear();

    const typewriterElement = document.getElementById('typewriter');
    
    // MODIFIÉ : Le texte est maintenant aligné sur le poste "Growth Ops"
    const textToType = "Epitech Pré-MSc Student | Focusing on Web Development & Data";
    
    let index = 0;
    function type() {
        if (index < textToType.length) {
            typewriterElement.textContent += textToType.charAt(index);
            index++;
            setTimeout(type, 60);
        }
    }
    type();

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-slate-900/80', 'backdrop-blur-sm', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-slate-900/80', 'backdrop-blur-sm', 'shadow-lg');
        }
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // MODIFIÉ : J'ai changé 'accueil' en 'home' pour matcher le lien de la nav
            if (section.getAttribute('id') === 'home' && pageYOffset < sectionTop + 150) {
                 current = 'home';
            } else if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        // Petite correction pour s'assurer que 'home' est détecté
         if (window.scrollY < 200) {
             current = 'home';
         }

        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            current = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('nav-link-active');
            // MODIFIÉ : J'ai changé 'accueil' en 'home' pour matcher la nav
            if (link.getAttribute('href') === '#home' && current === 'home') {
                link.classList.add('nav-link-active');
            } else if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('nav-link-active');
            }
        });
    });

    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => {
        observer.observe(el);
    });
});

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contact-form');
    const notification = document.getElementById('notification-popup');

    if (form) {
        form.addEventListener('submit', function (e) {

            e.preventDefault();

            const formData = new FormData(form);
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let jsonResponse = await response.json();
                    if (response.status == 200) {

                        notification.classList.remove('hidden', 'translate-x-full');
                        notification.classList.add('translate-x-0');
                        form.reset();

                        setTimeout(() => {
                            notification.classList.remove('translate-x-0');
                            notification.classList.add('translate-x-full');

                            setTimeout(() => notification.classList.add('hidden'), 500);
                        }, 5000);

                    } else {
                        console.log(response);
                        // MODIFIÉ : Traduction de l'alerte
                        alert("An error occurred. Please try again.");
                    }
                })
                .catch(error => {
                    console.log(error);
                    // MODIFIÉ : Traduction de l'alerte
                    alert("An error occurred. Please try again.");
                });
        });
    }

});