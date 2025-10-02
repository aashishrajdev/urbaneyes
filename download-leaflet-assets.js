const fs = require('fs');
const path = require('path');
const https = require('https');


const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}


function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}


const files = [
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon.png',
    dest: path.join(imagesDir, 'marker-icon.png')
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x.png',
    dest: path.join(imagesDir, 'marker-icon-2x.png')
  },
  {
    url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
    dest: path.join(imagesDir, 'marker-shadow.png')
  }
];


Promise.all(files.map(file => downloadFile(file.url, file.dest)))
  .then(() => {
    console.log('All Leaflet assets downloaded successfully!');
  })
  .catch(err => {
    console.error('Error downloading Leaflet assets:', err);
    process.exit(1);
  }); 