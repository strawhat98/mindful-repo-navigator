
import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import { motion } from 'framer-motion';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl w-full px-6 py-8 relative z-10"
      >
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 relative">
              <img 
                src={logo} 
                alt="MindfulRepo Logo" 
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-xl opacity-70 animate-pulse-subtle" />
            </div>
          </div>
          
          <h1 className="text-4xl font-semibold tracking-tight mb-3">
            MindfulRepo
          </h1>
          
          <div className="flex items-center justify-center">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground"
            >
              Chrome Extension
            </motion.span>
          </div>
          
          <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto">
            Elegantly navigate any GitHub repository with AI-powered insights and code analysis.
          </p>
        </header>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="glass rounded-2xl p-8 shadow-soft"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium mb-4">Getting Started</h2>
            <p className="text-muted-foreground">
              Install the extension and visit any GitHub repository to begin analyzing its structure.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium mb-1">Navigate to a Repository</h3>
                <p className="text-sm text-muted-foreground">Visit any GitHub repository in your Chrome browser.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium mb-1">Click the Extension Icon</h3>
                <p className="text-sm text-muted-foreground">Open the extension from your browser toolbar.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium mb-1">Explore Repository Insights</h3>
                <p className="text-sm text-muted-foreground">Get AI-powered analysis of code structure and organization.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              This extension is currently in development. Visit our GitHub repository for updates.
            </p>
          </div>
        </motion.div>
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Designed with precision. Built with care.</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default Index;
