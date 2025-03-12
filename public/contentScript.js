
// Inject the UI container when page loads
document.addEventListener('DOMContentLoaded', () => {
  injectUI();
});

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeRepo') {
    analyzeCurrentRepo();
  }
  return true;
});

// Check if we're on a GitHub repo page
function isGitHubRepo() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  return pathParts.length >= 2 && !['settings', 'trending', 'notifications'].includes(pathParts[0]);
}

// Extract repo information
function getRepoInfo() {
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  return {
    owner: pathParts[0],
    repo: pathParts[1]
  };
}

// Inject UI container
function injectUI() {
  if (!isGitHubRepo()) return;
  
  // Check if our UI is already injected
  if (document.getElementById('mindfulrepo-container')) return;
  
  // Create container for our UI
  const container = document.createElement('div');
  container.id = 'mindfulrepo-container';
  container.className = 'mindfulrepo-container';
  container.style.display = 'none'; // Hidden by default
  
  document.body.appendChild(container);
  
  // Add analyze button next to repo name
  try {
    const repoNavLinks = document.querySelector('ul.pagehead-actions');
    if (repoNavLinks) {
      const analyzeButton = document.createElement('li');
      analyzeButton.innerHTML = `
        <button class="mindfulrepo-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="m15 9-6 6"></path>
            <path d="m9 9 6 6"></path>
          </svg>
          Analyze Repo
        </button>
      `;
      
      analyzeButton.addEventListener('click', (e) => {
        e.preventDefault();
        analyzeCurrentRepo();
      });
      
      repoNavLinks.appendChild(analyzeButton);
    }
  } catch (error) {
    console.error('Error adding analyze button:', error);
  }
}

// Analyze current repository
function analyzeCurrentRepo() {
  const { owner, repo } = getRepoInfo();
  
  // Show a loading indicator
  showLoadingOverlay();
  
  // Request data from background script
  chrome.runtime.sendMessage(
    { action: 'getRepoData', owner, repo },
    (response) => {
      if (response && response.success) {
        showAnalysisResults(response.data);
      } else {
        hideLoadingOverlay();
        showError('Failed to analyze repository');
      }
    }
  );
}

// Show loading overlay
function showLoadingOverlay() {
  let loadingOverlay = document.getElementById('mindfulrepo-loading');
  
  if (!loadingOverlay) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'mindfulrepo-loading';
    loadingOverlay.className = 'mindfulrepo-overlay';
    loadingOverlay.innerHTML = `
      <div class="mindfulrepo-loading-content">
        <div class="mindfulrepo-spinner"></div>
        <p>Analyzing repository structure...</p>
      </div>
    `;
    
    document.body.appendChild(loadingOverlay);
  }
  
  loadingOverlay.style.display = 'flex';
}

// Hide loading overlay
function hideLoadingOverlay() {
  const loadingOverlay = document.getElementById('mindfulrepo-loading');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }
}

// Show analysis results
function showAnalysisResults(data) {
  hideLoadingOverlay();
  
  const container = document.getElementById('mindfulrepo-container');
  if (!container) return;
  
  // This would be where we'd display the actual analysis results
  // For now we'll just show a placeholder
  container.innerHTML = `
    <div class="mindfulrepo-results">
      <div class="mindfulrepo-header">
        <h2>Repository Analysis</h2>
        <button class="mindfulrepo-close-btn">✕</button>
      </div>
      
      <div class="mindfulrepo-content">
        <p>Analysis complete! Click the extension icon for full details.</p>
      </div>
    </div>
  `;
  
  container.style.display = 'block';
  
  // Add close button functionality
  const closeBtn = container.querySelector('.mindfulrepo-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      container.style.display = 'none';
    });
  }
}

// Show error message
function showError(message) {
  const container = document.getElementById('mindfulrepo-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="mindfulrepo-error">
      <p>${message}</p>
      <button class="mindfulrepo-close-btn">Close</button>
    </div>
  `;
  
  container.style.display = 'block';
  
  // Add close button functionality
  const closeBtn = container.querySelector('.mindfulrepo-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      container.style.display = 'none';
    });
  }
}
