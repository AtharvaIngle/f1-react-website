// src/parallax.js

document.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-depth]');
  
    parallaxElements.forEach(el => {
      const depth = el.getAttribute('data-depth');
      const movement = -(scrolled * depth);
      const translate3d = `translate3d(0, ${movement}px, 0)`;
  
      el.style.transform = translate3d;
    });
  });
  