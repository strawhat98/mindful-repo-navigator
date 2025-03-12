
// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('MindfulRepo Navigator extension installed');
});

// Create a context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'analyzerepo',
    title: 'Analyze This Repository',
    contexts: ['page'],
    documentUrlPatterns: ['https://github.com/*/*']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'analyzerepo') {
    chrome.tabs.sendMessage(tab.id, { action: 'analyzeRepo' });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getRepoData') {
    // This would be where we'd make API calls to GitHub or our backend
    // For now we'll just simulate a response
    setTimeout(() => {
      sendResponse({
        success: true,
        data: {
          repoStructure: 'Sample repository structure data'
        }
      });
    }, 1000);
    return true; // Required for async sendResponse
  }
});
