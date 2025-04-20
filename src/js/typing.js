export function initTypingEffect() {
  const typingContainer = document.getElementById('typing-container');
  if (!typingContainer) return;
  
  // Get current language
  const currentLang = localStorage.getItem('language') || 'fr';
  
  // Different phrases for each language
  const phrases = {
    fr: [
      'Développeur Front-end',
      'Développeur Back-end',
      'Débogueur de problèmes complexes',
      'Créateur Web',
      'Passionné par les bonnes pratiques',
    ],
    en: [
      'Front-end Developer',
      'Back-end Developer',
      'Debugger of complex issues',
      'Web Creator',
      'Passionate about clean code & dev craft'
    ]
  };
  
  // Initialize variables
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  // Start the typing effect
  function type() {
    // Get the current phrase based on language
    const currentPhrases = phrases[currentLang] || phrases.fr;
    const currentPhrase = currentPhrases[phraseIndex];
    
    // Set typing speed based on state
    if (isDeleting) {
      typingSpeed = 50; // Faster when deleting
    } else {
      typingSpeed = 100 + Math.random() * 100; // Randomize typing speed
    }
    
    // Add or remove characters
    if (isDeleting) {
      typingContainer.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingContainer.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }
    
    // Add blinking cursor with CSS
    typingContainer.classList.add('typing-animation');
    
    // Switch to deleting mode when phrase is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause before deleting
    // Switch to next phrase when deleted
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % currentPhrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }
    
    // Continue the animation
    setTimeout(type, typingSpeed);
  }
  
  // Watch for language changes and restart typing
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'lang') {
        const newLang = document.documentElement.getAttribute('lang');
        if (newLang && newLang !== currentLang) {
          phraseIndex = 0;
          charIndex = 0;
          isDeleting = false;
        }
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  // Start typing
  setTimeout(type, 1000);
}