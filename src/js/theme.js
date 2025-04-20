export function initTheme() {
  // Theme toggle functionality
  const themeSwitch = document.getElementById('theme-switch');
  const mobileThemeSwitch = document.getElementById('mobile-theme-switch');
  const html = document.documentElement;
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply the appropriate theme
  if (savedTheme === 'dark' || (!savedTheme && systemTheme)) {
    html.classList.add('dark');
  }
  
  // Toggle theme and save preference
  function toggleTheme() {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  // Add event listeners
  themeSwitch.addEventListener('click', toggleTheme);
  if (mobileThemeSwitch) {
    mobileThemeSwitch.addEventListener('click', toggleTheme);
  }
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  });
}