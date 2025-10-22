// Import required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Define the port
const PORT = 3000;

// Function to serve HTML pages
function servePage(filePath, contentType, res, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - Internal Server Error');
    } else {
      res.writeHead(statusCode, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Create the server
const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/' || url === '/home') {
    servePage(path.join(__dirname, 'pages', 'index.html'), 'text/html', res);
  } 
  else if (url === '/about') {
    servePage(path.join(__dirname, 'pages', 'about.html'), 'text/html', res);
  } 
  else if (url === '/contact') {
    servePage(path.join(__dirname, 'pages', 'contact.html'), 'text/html', res);
  }
  else if (url === '/api/data') {
    const jsonData = {
      message: "Welcome to the Node.js API",
      date: new Date(),
      version: "1.0.0"
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(jsonData));
  }
  else if (url.match("\.css$")) {
    const cssPath = path.join(__dirname, url);
    servePage(cssPath, 'text/css', res);
  }
  else if (url.match("\.js$")) {
    const jsPath = path.join(__dirname, url);
    servePage(jsPath, 'text/javascript', res);
  }
  else {
    servePage(path.join(__dirname, 'pages', '404.html'), 'text/html', res, 404);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
