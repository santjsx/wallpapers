const fs = require('fs');
const path = require('path');

const srcDir = __dirname;
const destDir = path.join(__dirname, 'public', 'wallpapers');

const categories = {
  Anime: ['kakashi', 'izuku', 'levi', 'light', 'midoriya', 'ackerman', 'yagami', 'samurai'],
  Abstract_and_Aesthetic: ['abstract', 'aesthetic', 'neon', 'glow', 'geometric', 'gradient', 'dynamic-glass', 'golden', 'violet', 'blue', 'purple', 'green', 'circular', 'fluid', '3d'],
  Space_and_Nature: ['saturn', 'earth', 'sun', 'sky', 'night', 'tree', 'desert', 'tropical', 'apocalyptic', 'cliffhanger', 'moon'],
  OS_Defaults: ['macos', 'windows', 'huawei', 'samsung', 'pc'],
  Pop_Culture: ['batman', 'darth-vader', 'captain-america', 'darksiders', 'den-of-wolves']
};

// Create dirs
Object.keys(categories).forEach(cat => {
  fs.mkdirSync(path.join(destDir, cat), { recursive: true });
});
fs.mkdirSync(path.join(destDir, 'Uncategorized'), { recursive: true });

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));

let moved = 0;
files.forEach(file => {
  const lowerFile = file.toLowerCase();
  let matchedCat = 'Uncategorized';
  
  // Custom checks for HRSC, HEROSCREEN, WALLPAPER generic names which we can just put in Abstract or Uncategorized
  if (lowerFile.includes('heroscreen') || lowerFile.includes('hrsc') || lowerFile.includes('wallpaper')) {
       // if it doesn't match a specific keyword, we can put it in Abstract 
       matchedCat = 'Abstract_and_Aesthetic';
  }

  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some(kw => lowerFile.includes(kw))) {
      matchedCat = cat;
      break;
    }
  }

  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, matchedCat, file);
  fs.renameSync(srcPath, destPath);
  moved++;
});

console.log(`Organized ${moved} files into categories!`);
