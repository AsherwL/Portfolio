export function initProjects() {
  const projectsContainer = document.getElementById('projects-container');
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeModal = document.getElementById('close-modal');
  
  if (!projectsContainer || !modal) return;
  
  // Get current language
  const currentLang = localStorage.getItem('language') || 'fr';
  
  // Fetch projects data
  async function fetchProjects() {
    try {
      const response = await fetch('/src/data/projects.json');
      const projects = await response.json();
      
      // Clear loading skeletons
      projectsContainer.innerHTML = '';
      
      // Add projects to container
      projects.forEach(project => {
        const projectCard = createProjectCard(project, currentLang);
        projectsContainer.appendChild(projectCard);
      });
      
      // Add click event to project cards
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
          const projectId = card.getAttribute('data-id');
          const project = projects.find(p => p.id === projectId);
          if (project) {
            openProjectModal(project, currentLang);
          }
        });
      });
    } catch (error) {
      console.error('Failed to load projects:', error);
      projectsContainer.innerHTML = `<p class="col-span-full text-center text-red-500">Failed to load projects.</p>`;
    }
  }
  
  // Create project card
  function createProjectCard(project, lang) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-id', project.id);
    
    // Use the appropriate language content
    const title = project[lang]?.title || project.fr.title;
    const description = project[lang]?.shortDescription || project.fr.shortDescription;
    const tags = project.tags || [];
    
    card.innerHTML = `
      <img src="${project.image}" alt="${title}" class="project-card-img" loading="lazy" />
      <div class="project-card-content">
        <h3 class="text-xl font-bold mb-2">${title}</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">${description}</p>
        <div class="flex flex-wrap gap-2">
          ${tags.map(tag => `<span class="badge">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    
    return card;
  }
  
  // Open project modal
  function openProjectModal(project, lang) {
    // Use the appropriate language content
    const title = project[lang]?.title || project.fr.title;
    const description = project[lang]?.description || project.fr.description;
    const clientLabel = lang === 'fr' ? 'Client' : 'Client';
    const dateLabel = lang === 'fr' ? 'Date' : 'Date';
    const technologiesLabel = lang === 'fr' ? 'Technologies' : 'Technologies';
    const viewProjectLabel = lang === 'fr' ? 'Voir le projet' : 'View project';
    
    modalTitle.textContent = title;
    
    modalContent.innerHTML = `
      <img src="${project.image}" alt="${title}" class="w-full h-64 object-cover rounded-lg mb-6" />
      <p class="text-gray-600 dark:text-gray-400 mb-6">${description}</p>
      
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h4 class="font-bold text-gray-700 dark:text-gray-300">${clientLabel}</h4>
          <p>${project.client}</p>
        </div>
        <div>
          <h4 class="font-bold text-gray-700 dark:text-gray-300">${dateLabel}</h4>
          <p>${project.date}</p>
        </div>
      </div>
      
      <div class="mb-6">
        <h4 class="font-bold text-gray-700 dark:text-gray-300 mb-2">${technologiesLabel}</h4>
        <div class="flex flex-wrap gap-2">
          ${project.technologies.map(tech => `<span class="badge">${tech}</span>`).join('')}
        </div>
      </div>
      
      ${project.link ? `
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="btn-primary w-full text-center">
          ${viewProjectLabel} <i class="fas fa-external-link-alt ml-2"></i>
        </a>
      ` : ''}
    `;
    
    // Show modal with animation
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      modal.querySelector('div').classList.remove('scale-95');
      modal.querySelector('div').classList.add('scale-100');
    }, 10);
    
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  // Close modal functionality
  closeModal.addEventListener('click', () => {
    modal.classList.add('opacity-0');
    modal.querySelector('div').classList.remove('scale-100');
    modal.querySelector('div').classList.add('scale-95');
    
    setTimeout(() => {
      modal.classList.add('hidden');
      // Re-enable scrolling
      document.body.style.overflow = 'auto';
    }, 300);
  });
  
  // Close modal when clicking outside
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal.click();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal.click();
    }
  });
  
  // Load projects
  fetchProjects();
  
  // Reload projects when language changes
  document.addEventListener('languageChanged', () => {
    fetchProjects();
  });
}