const fs = require('fs');
const path = require('path');

// Directory containing your apps
const appsDirectory = '.';

// Function to read HTML file content
function readHtmlFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8');
}

// Generate HTML with iframes and source code
function generateHtml(appPaths) {
  let htmlContent = `<!DOCTYPE html><html><head>
    <link rel="stylesheet" href="styles.css">
    </head><body><ul class="exercises">`;

  appPaths.forEach(appPath => {
    if (appPath === "00-boilerplate") return
    const indexPath = path.join(appPath, 'index.html');
    // const appHtml = readHtmlFile(indexPath);
    // htmlContent += `<li><h2>${appPath}</h2><iframe src="${indexPath}"></iframe><pre>${appHtml}</pre></li>`;
    htmlContent += `<li><h2>${appPath}</h2><iframe src="${indexPath}"></iframe></li>`;
  });

  htmlContent += '</ul></body></html>';
  return htmlContent;
}

// Get all app paths
const appPaths = fs.readdirSync(appsDirectory)
                  .map(dir => path.join(appsDirectory, dir))
                  .filter(appPath => fs.existsSync(path.join(appPath, 'index.html')));

// Generate the final HTML
const finalHtml = generateHtml(appPaths);

// Write to an output file
fs.writeFileSync('./index.html', finalHtml);

console.log('HTML file generated successfully!');
