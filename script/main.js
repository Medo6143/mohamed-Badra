        document.addEventListener('DOMContentLoaded', function () {
            // إنشاء النجوم المتلألئة
            function createStars() {
                const container = document.getElementById('stars-container');
                const starCount = 30;
                for (let i = 0; i < starCount; i++) {
                    const star = document.createElement('div');
                    star.className = 'twinkle-star';
                    // أحجام عشوائية للنجوم
                    const size = Math.random() * 2 + 1;
                    star.style.width = `${size}px`;
                    star.style.height = `${size}px`;
                    // مواقع عشوائية
                    star.style.left = `${Math.random() * 100}%`;
                    star.style.top = `${Math.random() * 100}%`;
                    // تأخيرات عشوائية للأنيميشن
                    star.style.animationDelay = `${Math.random() * 5}s`;
                    container.appendChild(star);
                }
            }
            // إنشاء الجسيمات المتحركة
            function createParticles() {
                const container = document.getElementById('particles-container');
                const particleCount = 15;
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'floating-particle';
                    // أحجام عشوائية للجسيمات
                    const size = Math.random() * 8 + 3;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    // مواقع عشوائية
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.top = `${Math.random() * 100}%`;
                    // تأخيرات عشوائية للأنيميشن
                    particle.style.animationDelay = `${Math.random() * 15}s`;
                    particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
                    // ألوان عشوائية
                    const colors = [
                        'rgba(229, 62, 62, 0.3)',
                        'rgba(26, 54, 93, 0.3)',
                        'rgba(45, 55, 72, 0.3)',
                        'rgba(252, 129, 129, 0.3)'
                    ];
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    container.appendChild(particle);
                }
            }
            createStars();
            createParticles();

            // تأثير التمرير للهيدر
            const mainHeader = document.getElementById('mainHeader');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
            });

            // هامبورجر للجوال
            const hamburger = document.getElementById('hamburger-menu');
            const navContainer = document.getElementById('nav-container');
            const overlay = document.getElementById('overlay');
            const body = document.body;

            function toggleMenu() {
                hamburger.classList.toggle('active');
                navContainer.classList.toggle('active');
                overlay.classList.toggle('active');
                body.classList.toggle('menu-open');
            }
            hamburger.addEventListener('click', toggleMenu);

            // إغلاق القائمة عند النقر على رابط أو التعتيم
            navContainer.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navContainer.classList.contains('active')) { // الإغلاق فقط إذا كانت القائمة مفتوحة
                        toggleMenu();
                    }
                });
            });
            overlay.addEventListener('click', toggleMenu);

            // تحديث اسم الملف المرفوع
            const fileInput = document.getElementById('join-cv');
            if (fileInput) {
                const fileLabel = document.querySelector('label[for="join-cv"]');
                const originalLabelText = fileLabel.innerHTML;
                fileInput.addEventListener('change', function () {
                    if (this.files.length > 0) {
                        fileLabel.innerHTML = `<i class="fas fa-file"></i> ${this.files[0].name}`;
                    } else {
                        fileLabel.innerHTML = originalLabelText;
                    }
                });
            }

            // تأثيرات التمرير السلس
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetElement = document.querySelector(this.getAttribute('href'));
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // تأثيرات الظهور عند التمرير
            const revealElements = document.querySelectorAll('.reveal');
            const revealObserver = new IntersectionObserver((entries, observer) => {
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
                revealObserver.observe(el);
            });

            // أنيميشن إضافية للعناصر عند التمرير
            const animatedElements = document.querySelectorAll('.feature, .value-card, .project-card, .position-card');
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running';
                    }
                });
            });
            animatedElements.forEach(el => {
                animationObserver.observe(el);
            });

            // فلاش الكاميرا عند التمرير
            const cameraFlash = document.getElementById('cameraFlash');
            let lastScrollY = window.scrollY;
            let flashTimeout;
            window.addEventListener('scroll', () => {
                const currentScrollY = window.scrollY;
                // تفعيل الفلاش عند التمرير السريع
                if (Math.abs(currentScrollY - lastScrollY) > 100) {
                    cameraFlash.classList.add('active');
                    clearTimeout(flashTimeout);
                    flashTimeout = setTimeout(() => {
                        cameraFlash.classList.remove('active');
                    }, 500);
                }
                lastScrollY = currentScrollY;
            });

            // أنيميشن النص الكتابي
            const typewriterText = document.querySelector('.typewriter-text');
            if (typewriterText) {
                // إعادة تشغيل الأنيميشن عند ظهور النص في الشاشة
                const typewriterObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // إعادة تعيين الأنيميشن
                            typewriterText.style.animation = 'none';
                            setTimeout(() => {
                                typewriterText.style.animation = 'typewriter 3s steps(40, end), blinkCursor 0.75s step-end infinite';
                            }, 10);
                        }
                    });
                });
                typewriterObserver.observe(typewriterText);
            }

            // أنيميشن الموجة للعناصر
            const waveElements = document.querySelectorAll('.btn-primary, .btn-secondary');
            waveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    element.classList.add('wave-animation');
                });
                element.addEventListener('mouseleave', () => {
                    element.classList.remove('wave-animation');
                });
            });

            // التأكد من ظهور الأيقونات على الموبايل
            const socialIcons = document.querySelectorAll('.social-icon');
            socialIcons.forEach(icon => {
                icon.style.display = 'flex';
            });

            // إضافة وظيفة عرض/إخفاء محتوى المدونة
            const readMoreButtons = document.querySelectorAll('.read-more-btn');
            readMoreButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const targetId = this.getAttribute('data-target');
                    const targetElement = document.getElementById(targetId);
                    if (targetElement.classList.contains('active')) {
                        targetElement.classList.remove('active');
                        this.textContent = 'اقرأ المزيد';
                    } else {
                        targetElement.classList.add('active');
                        this.textContent = 'اقرأ أقل';
                    }
                });
            });
        });

        // دالة لفتح الفيديو
        function openVideo(url) {
            window.open(url, '_blank');
        }