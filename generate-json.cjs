const fs = require('fs');
const path = require('path');

const wallpapersDir = path.join(__dirname, 'public', 'wallpapers');
const outputFile = path.join(__dirname, 'src', 'wallpapers.json');

const categories = fs.readdirSync(wallpapersDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const wallpapers = [];

categories.forEach(category => {
    const catDir = path.join(wallpapersDir, category);
    const files = fs.readdirSync(catDir)
        .filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'));

    files.forEach(file => {
        wallpapers.push({
            id: file,
            src: `/wallpapers/${category}/${file}`,
            category: category.replace(/_/g, ' '),
            name: file.replace(/\.(jpeg|jpg|png)$/i, '').replace(/[-_]/g, ' ')
        });
    });
});

fs.writeFileSync(outputFile, JSON.stringify(wallpapers, null, 2));
console.log(`Generated src/wallpapers.json with ${wallpapers.length} Wallpapers!`);
