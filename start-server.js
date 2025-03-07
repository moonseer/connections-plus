// Script to find an available port and start the server

const { spawn } = require('child_process');
const net = require('net');

// Function to check if a port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', () => {
      resolve(false);
    });
    
    server.once('listening', () => {
      server.close();
      resolve(true);
    });
    
    server.listen(port);
  });
}

// Function to find an available port starting from the given port
async function findAvailablePort(startPort) {
  let port = startPort;
  
  while (!(await isPortAvailable(port))) {
    console.log(`Port ${port} is in use, trying next port...`);
    port++;
    
    // Avoid checking too many ports
    if (port > startPort + 100) {
      throw new Error('Could not find an available port after 100 attempts');
    }
  }
  
  return port;
}

// Main function to start the server
async function startServer() {
  try {
    // Try to find an available port starting from 8080
    const port = await findAvailablePort(8080);
    
    console.log(`Starting server on port ${port}...`);
    
    // Set the PORT environment variable for the server
    process.env.PORT = port;
    
    // Start the server
    const server = spawn('node', ['server.js'], {
      stdio: 'inherit',
      env: { ...process.env, PORT: port }
    });
    
    server.on('close', (code) => {
      console.log(`Server process exited with code ${code}`);
    });
    
    console.log(`Server running at http://localhost:${port}/`);
  } catch (error) {
    console.error('Error starting server:', error.message);
  }
}

// Start the server
startServer(); 