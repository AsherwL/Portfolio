export function initForms() {

  const successToast = document.getElementById('success-toast');
  const successMessage = document.getElementById('success-message');
  const cvDownload = document.getElementById('cv-download');
  
  // Get current language
  const currentLang = localStorage.getItem('language') || 'fr';
  

  
  // Handle CV download
  if (cvDownload) {
    cvDownload.addEventListener('click', e => {
      e.preventDefault();

      const lang = localStorage.getItem('language') || 'fr';
      const fileName = lang === 'fr' 
        ? 'cv_asher_wl_fr.pdf' 
        : 'cv_asher_wl_en.pdf'; 
      
      const filePath = `/cv/${fileName}`; // Assure-toi que ce fichier est dans /public/cv/

      // Crée dynamiquement un lien pour forcer le téléchargement
      const link = document.createElement('a');
      link.href = filePath;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Affiche le toast
      showSuccessToast(lang === 'fr'
        ? 'Téléchargement du CV en cours...'
        : 'Downloading CV...');
    });
  }

  
  // Show success toast
  function showSuccessToast(message) {
    successMessage.textContent = message;
    successToast.classList.remove('translate-y-12', 'opacity-0');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      successToast.classList.add('translate-y-12', 'opacity-0');
    }, 3000);
  }
}