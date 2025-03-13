
const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

async function generateIcons() {
  console.log('Generating extension icons...');
  const sizes = [16, 48, 128];
  const svgPath = path.resolve(__dirname, '../src/assets/icon.svg');
  const publicDir = path.resolve(__dirname, '../public');
  
  // Ensure the public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  try {
    // Load the SVG image
    const image = await loadImage(svgPath);
    
    // Generate each icon size
    for (const size of sizes) {
      const canvas = createCanvas(size, size);
      const ctx = canvas.getContext('2d');
      
      // Draw the image scaled to the canvas size
      ctx.drawImage(image, 0, 0, size, size);
      
      // Save as PNG
      const buffer = canvas.toBuffer('image/png');
      fs.writeFileSync(path.join(publicDir, `icon${size}.png`), buffer);
      console.log(`Generated icon${size}.png`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
    // Create fallback icons if SVG can't be processed
    createFallbackIcons(sizes, publicDir);
  }
}

function createFallbackIcons(sizes, publicDir) {
  console.log('Creating fallback icons...');
  
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Draw a simple colored square
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(0, 0, size, size);
    
    // Add "MR" text if size is large enough
    if (size >= 48) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${size/3}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MR', size/2, size/2);
    }
    
    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(publicDir, `icon${size}.png`), buffer);
    console.log(`Generated fallback icon${size}.png`);
  }
}

// Run the function
generateIcons();
