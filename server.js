// Simple server for Connections-plus

const http = require('http');
const fs = require('fs');
const path = require('path');
const net = require('net');

// Start with port 8080, but will find an available port if this one is in use
let PORT = process.env.PORT || 8080;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Create the server
const server = http.createServer((req, res) => {
    // Get the file path
    let filePath = '.' + req.url;
    
    // Default to index.html if the path is '/'
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get the file extension
    const extname = path.extname(filePath);
    
    // Set the content type based on the file extension
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // Read the file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                fs.readFile('./index.html', (err, content) => {
                    if (err) {
                        // Server error
                        res.writeHead(500);
                        res.end('Error loading index.html');
                    } else {
                        // Return the index.html for client-side routing
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Function to check if a port is available
function isPortAvailable(port) {
    return new Promise((resolve) => {
        const testServer = net.createServer()
            .once('error', () => {
                resolve(false);
            })
            .once('listening', () => {
                testServer.close();
                resolve(true);
            })
            .listen(port);
    });
}

// Function to find an available port
async function findAvailablePort(startPort) {
    let port = startPort;
    const maxPort = startPort + 100; // Don't check more than 100 ports
    
    while (port < maxPort) {
        if (await isPortAvailable(port)) {
            return port;
        }
        console.log(`Port ${port} is in use, trying ${port + 1}...`);
        port++;
    }
    
    throw new Error(`Could not find an available port after checking ${maxPort - startPort} ports`);
}

// Start the server on an available port
async function startServer() {
    try {
        PORT = await findAvailablePort(PORT);
        server.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
}

startServer(); 