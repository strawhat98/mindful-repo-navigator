
// Initialize the popup UI
document.addEventListener('DOMContentLoaded', async () => {
  const popupRoot = document.getElementById('popup-root');
  
  // Check if we're on a GitHub repo page
  const getCurrentTab = async () => {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };
  
  const tab = await getCurrentTab();
  const url = new URL(tab.url);
  const isGitHubRepo = url.hostname === 'github.com' && url.pathname.split('/').filter(Boolean).length >= 2;
  
  if (isGitHubRepo) {
    // Extract owner and repo name from URL
    const pathParts = url.pathname.split('/').filter(Boolean);
    const owner = pathParts[0];
    const repo = pathParts[1];
    
    renderRepoAnalysisUI(popupRoot, owner, repo);
  } else {
    renderNotOnRepoUI(popupRoot);
  }
});

// Render the main UI when on a GitHub repo
function renderRepoAnalysisUI(container, owner, repo) {
  // Create header
  const header = document.createElement('header');
  header.className = 'flex items-center justify-between p-4 border-b border-border bg-gradient-to-b from-background to-secondary/10';
  
  const titleWrapper = document.createElement('div');
  
  const logo = document.createElement('div');
  logo.className = 'text-lg font-semibold flex items-center gap-2';
  logo.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#F9FAFB"/>
      <path d="M60 100C82.0914 100 100 82.0914 100 60C100 37.9086 82.0914 20 60 20C37.9086 20 20 37.9086 20 60C20 82.0914 37.9086 100 60 100Z" fill="#F3F4F6"/>
      <path d="M39 48C39 43.5817 42.5817 40 47 40H73C77.4183 40 81 43.5817 81 48V72C81 76.4183 77.4183 80 73 80H47C42.5817 80 39 76.4183 39 72V48Z" fill="#E5E7EB"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M50 46C48.3431 46 47 47.3431 47 49V71C47 72.6569 48.3431 74 50 74H70C71.6569 74 73 72.6569 73 71V49C73 47.3431 71.6569 46 70 46H50ZM53 52C52.4477 52 52 52.4477 52 53C52 53.5523 52.4477 54 53 54H67C67.5523 54 68 53.5523 68 53C68 52.4477 67.5523 52 67 52H53ZM52 59C52 58.4477 52.4477 58 53 58H67C67.5523 58 68 58.4477 68 59C68 59.5523 67.5523 60 67 60H53C52.4477 60 52 59.5523 52 59ZM53 64C52.4477 64 52 64.4477 52 65C52 65.5523 52.4477 66 53 66H61C61.5523 66 62 65.5523 62 65C62 64.4477 61.5523 64 61 64H53Z" fill="#1F2937"/>
    </svg>
    <span>MindfulRepo</span>
  `;
  titleWrapper.appendChild(logo);

  const repoInfo = document.createElement('div');
  repoInfo.className = 'text-sm text-muted-foreground mt-1';
  repoInfo.textContent = `${owner}/${repo}`;
  titleWrapper.appendChild(repoInfo);

  header.appendChild(titleWrapper);

  const actionButton = document.createElement('button');
  actionButton.className = 'rounded-full w-8 h-8 flex items-center justify-center bg-primary/10 hover:bg-primary/20 transition-colors';
  actionButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  `;
  header.appendChild(actionButton);

  container.appendChild(header);

  // Create main content
  const content = document.createElement('main');
  content.className = 'p-4 overflow-y-auto h-[calc(100%-64px)]';
  
  // Display loading state initially
  content.innerHTML = `
    <div class="flex flex-col items-center justify-center p-8">
      <div class="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4"></div>
      <p class="text-muted-foreground">Analyzing repository structure...</p>
    </div>
  `;
  
  container.appendChild(content);
  
  // Simulate loading and then show analysis (would be replaced with actual API call)
  setTimeout(() => {
    renderAnalysisResult(content, owner, repo);
  }, 1500);
}

// Render the analysis results
function renderAnalysisResult(container, owner, repo) {
  container.innerHTML = `
    <div class="space-y-6 animate-fade-in">
      <section>
        <div class="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <h2 class="text-lg font-medium">Repository Overview</h2>
        </div>
        
        <div class="rounded-lg bg-secondary/50 p-4 text-sm">
          <p>This repository appears to be a <span class="font-medium">JavaScript application</span> with a focus on web development. It includes React components and API integration.</p>
        </div>
      </section>
      
      <section class="animate-slide-up" style="animation-delay: 100ms">
        <div class="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <path d="M8 18L12 22L16 18"></path>
            <path d="M12 2V22"></path>
          </svg>
          <h2 class="text-lg font-medium">Directory Structure</h2>
        </div>
        
        <div class="glass rounded-lg p-4 text-sm">
          <ul class="space-y-2">
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 text-muted-foreground">
                <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L20 7v9a2 2 0 0 1-2 2h-9Z"></path>
              </svg>
              <div>
                <span class="font-medium">/src</span>
                <p class="text-muted-foreground mt-1">Main source code directory containing application logic.</p>
              </div>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 text-muted-foreground">
                <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L20 7v9a2 2 0 0 1-2 2h-9Z"></path>
              </svg>
              <div>
                <span class="font-medium">/components</span>
                <p class="text-muted-foreground mt-1">Reusable UI components for the application interface.</p>
              </div>
            </li>
            <li class="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 text-muted-foreground">
                <path d="M20 7h-3a2 2 0 0 1-2-2V2"></path>
                <path d="M9 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L20 7v9a2 2 0 0 1-2 2h-9Z"></path>
              </svg>
              <div>
                <span class="font-medium">/api</span>
                <p class="text-muted-foreground mt-1">API services and data fetching utilities.</p>
              </div>
            </li>
          </ul>
          
          <button class="mt-4 text-xs text-primary font-medium hover:underline w-full text-center">
            View full directory structure
          </button>
        </div>
      </section>
      
      <section class="animate-slide-up" style="animation-delay: 200ms">
        <div class="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <circle cx="18" cy="18" r="3"></circle>
            <circle cx="6" cy="6" r="3"></circle>
            <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
            <path d="M11 18H8a2 2 0 0 1-2-2V9"></path>
          </svg>
          <h2 class="text-lg font-medium">Key Files</h2>
        </div>
        
        <div class="overflow-hidden rounded-lg border border-border">
          <div class="bg-secondary/30 p-3 flex items-center gap-2 cursor-pointer hover:bg-secondary/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
              <path d="M12 3v6"></path>
            </svg>
            <span class="font-medium">README.md</span>
          </div>
          
          <div class="p-4 text-sm">
            <p class="mb-3">The README provides an overview of the project:</p>
            <ul class="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Project description and purpose</li>
              <li>Installation instructions</li>
              <li>Usage examples</li>
              <li>Configuration options</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section class="animate-slide-up" style="animation-delay: 300ms">
        <div class="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
            <line x1="3" x2="21" y1="9" y2="9"></line>
            <line x1="3" x2="21" y1="15" y2="15"></line>
            <line x1="9" x2="9" y1="3" y2="21"></line>
            <line x1="15" x2="15" y1="3" y2="21"></line>
          </svg>
          <h2 class="text-lg font-medium">Technologies Used</h2>
        </div>
        
        <div class="flex flex-wrap gap-2">
          <span class="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">JavaScript</span>
          <span class="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">React</span>
          <span class="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">Node.js</span>
          <span class="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">Express</span>
          <span class="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">MongoDB</span>
        </div>
      </section>
      
      <button class="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-soft animate-slide-up" style="animation-delay: 400ms">
        Generate Detailed Report
      </button>
    </div>
  `;
}

// Render UI when not on a GitHub repo
function renderNotOnRepoUI(container) {
  container.innerHTML = `
    <div class="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground mb-4">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
      <h2 class="text-xl font-medium mb-2">Not a GitHub Repository</h2>
      <p class="text-muted-foreground mb-6">Navigate to a GitHub repository to use MindfulRepo Navigator.</p>
      <a href="https://github.com" target="_blank" class="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium hover:bg-primary/90 transition-colors shadow-soft">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
        Go to GitHub
      </a>
    </div>
  `;
}
