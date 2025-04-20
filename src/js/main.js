import { initTheme } from './theme.js';
import { initLanguage } from './language.js';
import { initNavbar } from './navbar.js';
import { initTypingEffect } from './typing.js';
import { initProjects } from './projects.js';
import { initCertifications } from './certifications.js';
import { initForms } from './forms.js';
import { initScrollEffects } from './scroll.js';

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLanguage();
  initNavbar();
  initTypingEffect();
  initProjects();
  initCertifications();
  initForms();
  initScrollEffects();
});