export function initLanguage() {
  // Language switching functionality
  const langSwitches = document.querySelectorAll('#lang-switch, #mobile-lang-switch, #footer-lang-switch');
  const langTexts = document.querySelectorAll('.lang-text');
  
  // Load translations
  let translations = {};
  let currentLang = localStorage.getItem('language') || 'fr';
  
  // Set initial language
  setLanguage(currentLang);
  
  // Toggle language
  function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(currentLang);
    localStorage.setItem('language', currentLang);
  }
  
  // Set language
  async function setLanguage(lang) {
    // If translations aren't loaded yet, load them
    if (!translations[lang]) {
      try {
        const response = await fetch(`/src/data/translations/${lang}.json`);
        translations[lang] = await response.json();
      } catch (error) {
        console.error(`Failed to load ${lang} translations:`, error);
        return;
      }
    }
    
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      const value = getNestedProperty(translations[lang], key);
      if (value) el.textContent = value;
    });
    
    // Update attributes with translations
    document.querySelectorAll('[data-translate-attr]').forEach(el => {
      const attrInfo = el.getAttribute('data-translate-attr').split(':');
      if (attrInfo.length === 2) {
        const [attr, key] = attrInfo;
        const value = getNestedProperty(translations[lang], key);
        if (value) el.setAttribute(attr, value);
      }
    });
    
    // Update the lang-text elements
    langTexts.forEach(text => {
      text.textContent = lang.toUpperCase();
    });
    
    // Update html lang attribute
    document.documentElement.setAttribute('lang', lang);
  }
  
  // Helper function to access nested properties
  function getNestedProperty(obj, path) {
    return path.split('.').reduce((prev, curr) => {
      return prev && prev[curr] ? prev[curr] : null;
    }, obj);
  }
  
  // Add event listeners
  langSwitches.forEach(btn => {
    btn.addEventListener('click', toggleLanguage);
  });
}