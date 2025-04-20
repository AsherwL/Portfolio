export function initCertifications() {
  const certificationsContainer = document.getElementById('certifications-container');
  if (!certificationsContainer) return;
  
  // Get current language
  const currentLang = localStorage.getItem('language') || 'fr';
  
  // Fetch certifications data
  async function fetchCertifications() {
    try {
      const response = await fetch('/data/certifications.json');
      const certifications = await response.json();
      
      // Clear loading skeletons
      certificationsContainer.innerHTML = '';
      
      // Add certifications to container
      certifications.forEach(certification => {
        const certCard = createCertificationCard(certification, currentLang);
        certificationsContainer.appendChild(certCard);
      });
    } catch (error) {
      console.error('Failed to load certifications:', error);
      certificationsContainer.innerHTML = `<p class="col-span-full text-center text-red-500">Failed to load certifications.</p>`;
    }
  }
  
  // Create certification card
  function createCertificationCard(certification, lang) {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 transform hover:-translate-y-2 transition duration-300';
    
    // Use the appropriate language content
    const title = certification[lang]?.title || certification.fr.title;
    const issuer = certification[lang]?.issuer || certification.fr.issuer;
    const description = certification[lang]?.description || certification.fr.description;
    const viewCredential = lang === 'fr' ? 'Voir le certificat' : 'View credential';
    
    card.innerHTML = `
      <div class="flex items-center mb-4">
        <img src="${certification.logo}" alt="${issuer}" class="h-12 w-12 object-contain mr-4" loading="lazy" />
        <div>
          <h3 class="text-xl font-bold">${title}</h3>
          <p class="text-gray-600 dark:text-gray-400">${issuer}</p>
        </div>
      </div>
      <p class="text-gray-600 dark:text-gray-400 mb-4">${description}</p>
      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500 dark:text-gray-400">${certification.date}</span>
        ${certification.link ? `
          <a href="${certification.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            ${viewCredential} <i class="fas fa-external-link-alt ml-1"></i>
          </a>
        ` : ''}
      </div>
    `;
    
    return card;
  }
  
  // Load certifications
  fetchCertifications();
  
  // Reload certifications when language changes
  document.addEventListener('languageChanged', () => {
    fetchCertifications();
  });
}