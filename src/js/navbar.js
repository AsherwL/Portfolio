export function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Toggle mobile menu
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Toggle between menu and close icons
    const icon = mobileMenuButton.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', e => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      const icon = mobileMenuButton.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      const icon = mobileMenuButton.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('bg-white', 'dark:bg-gray-900', 'shadow-md');
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('bg-white', 'dark:bg-gray-900', 'shadow-md');
      navbar.classList.add('bg-transparent');
    }
  });
  
  // Trigger scroll event to set initial state
  window.dispatchEvent(new Event('scroll'));
}