document.addEventListener('DOMContentLoaded', () => {
  
  // === 1. МОБИЛЬНОЕ МЕНЮ (ГАМБУРГЕР) ===
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__link, .nav__cta a');

  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Переключаем классы активности для меню и кнопки бургера
      navList.classList.toggle('nav__list--active');
      menuToggle.classList.toggle('menu-toggle--active');
      
      // Блокируем скролл страницы, пока меню открыто
      document.body.classList.toggle('no-scroll');
    });

    // Закрытие меню при клике на любой пункт навигации
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('nav__list--active');
        menuToggle.classList.remove('menu-toggle--active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // === 2. КУКИ БАННЕР ===
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');

  if (cookieBanner && acceptCookiesBtn) {
    // Показываем баннер через 1 секунду после загрузки, если согласия еще нет
    if (!localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1000);
    }

    acceptCookiesBtn.addEventListener('click', () => {
      cookieBanner.classList.remove('show');
      localStorage.setItem('cookiesAccepted', 'true');
    });
  }

  // === 3. ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ ===
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Простейшая имитация отправки данных формы на сервер
      const formData = new FormData(contactForm);
      console.log('Отправка формы...', Object.fromEntries(formData));

      // Показ сообщения об успешной отправке
      if (successMsg) {
        successMsg.style.display = 'block';
        contactForm.reset(); // Очистка полей

        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
          successMsg.style.style.display = 'none';
        }, 5000);
      }
    });
  }

  // === 4. АНИМАЦИИ ПРИ СКРОЛЛЕ (FADE-UP) ===
  const fadeBlocks = document.querySelectorAll('.fade-up');

  if (fadeBlocks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Элемент анимируется только один раз
        }
      });
    }, observerOptions);

    fadeBlocks.forEach(block => {
      observer.observe(block);
    });
  }
});