export function initScrollEffects() {
  const backToTopButton = document.getElementById('back-to-top');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Show/hide back to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopButton.classList.remove('hidden');
    } else {
      backToTopButton.classList.add('hidden');
    }
    
    // Highlight current section in navigation
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 300)) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-semibold');
      
      const href = link.getAttribute('href');
      if (href && href.substring(1) === currentSection) {
        link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-semibold');
      }
    });
  });
  
  // Scroll to top when clicking the back to top button
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Simple animation on scroll for elements with data-aos attribute
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        let delay = el.getAttribute('data-aos-delay') || 0;
        
        setTimeout(() => {
          el.classList.add('animate-fade-in');
          
          // Add direction-based animation classes
          const aosType = el.getAttribute('data-aos');
          if (aosType === 'fade-up') {
            el.classList.add('animate-slide-up');
          } else if (aosType === 'fade-right') {
            el.classList.add('animate-slide-right');
          } else if (aosType === 'fade-down') {
            el.classList.add('animate-slide-down');
          } else if (aosType === 'fade-left') {
            el.classList.add('animate-slide-left');
          }
        }, delay);
        
        observer.unobserve(el);
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}