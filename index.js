const http = require('http');
const fs = require('fs');
const path = require('path');

// Server configuration
const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`Request received for ${req.url}`);

    // Set default response header
    res.setHeader('Content-Type', 'text/html');

    // Handle routing
    switch (req.url) {
        //first page will be home page as default
        case '/':
            servePage('home.html', res);
            break;
        case '/home':
            servePage('home.html', res);
            break;
        case '/about':
            servePage('about.html', res);
            break;
        case '/contact':
            servePage('contact.html', res);
            break;
        default:
            servePage('pageNotFound.html', res, 404);
            break;
    }
});

// Helper function to serve an HTML page
function servePage(page, res, statusCode = 200) {
    const filePath = path.join(__dirname, page);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('<h1>Server Error</h1>');
            return;
        }

        res.statusCode = statusCode;
        res.end(data);
    });
}

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});