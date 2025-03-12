
import React from 'react';
import { motion } from 'framer-motion';
import { Code, FileCode, GitFork, GitPullRequest } from 'lucide-react';

const CodeExplainer = () => {
  return (
    <div className="p-6 bg-card rounded-lg shadow-soft border border-border">
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold mb-4 flex items-center gap-2"
      >
        <Code className="h-5 w-5 text-primary" />
        Extension Code Structure
      </motion.h3>

      <div className="space-y-4">
        <div className="p-3 bg-muted/50 rounded-md">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <FileCode className="h-4 w-4 text-primary" />
            Key Components
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="font-medium text-foreground">popup.html/js:</span> The extension popup interface</li>
            <li><span className="font-medium text-foreground">contentScript.js:</span> Runs on GitHub pages to inject UI and analyze repos</li>
            <li><span className="font-medium text-foreground">background.js:</span> Background service worker for extension communication</li>
            <li><span className="font-medium text-foreground">manifest.json:</span> Chrome extension configuration file</li>
          </ul>
        </div>

        <div className="p-3 bg-muted/50 rounded-md">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <GitFork className="h-4 w-4 text-primary" />
            How It Works
          </h4>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal pl-5">
            <li>The extension <span className="text-foreground">injects a UI</span> on GitHub repository pages</li>
            <li>It adds an <span className="text-foreground">"Analyze Repo" button</span> to the repository header</li>
            <li>When clicked, it <span className="text-foreground">analyzes the repository structure</span></li>
            <li>Results are displayed in a <span className="text-foreground">panel on the page</span></li>
          </ol>
        </div>

        <div className="p-3 bg-muted/50 rounded-md">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <GitPullRequest className="h-4 w-4 text-primary" />
            Code Flow
          </h4>
          <div className="text-sm text-muted-foreground">
            <p className="mb-2">1. User clicks extension icon → <code className="bg-background p-1 rounded text-xs">popup.html</code> loads</p>
            <p className="mb-2">2. User visits GitHub repo → <code className="bg-background p-1 rounded text-xs">contentScript.js</code> injects UI</p>
            <p className="mb-2">3. User clicks "Analyze" → Analysis request sent to <code className="bg-background p-1 rounded text-xs">background.js</code></p>
            <p>4. Results processed and displayed in the injected UI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExplainer;
