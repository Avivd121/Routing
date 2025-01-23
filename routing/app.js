// Import the required modules
const http = require("http"); // For creating the server
const url = require("url"); // For parsing URL strings
const fs = require("fs"); // For interacting with the file system
const path = require("path"); // For working with file and directory paths

// Create the HTTP server
const server = http.createServer(function (req, res) {
  // Get the full URL path from the request
  let pathNameFull = req.url;

  // Parse the URL into an object to extract its components
  const pathNameObj = url.parse(pathNameFull, true);

  // Extract the pathname from the parsed URL (e.g., '/about.html')
  const pathName = pathNameObj.pathname;

  // Check if the root URL ("/") is accessed
  if (pathName === "/") {
    // Define the path to the "home.html" file in the templates directory
    const htmlPath = path.join(__dirname, "templates", "home.html");

    // Create a read stream for the HTML file
    const fileStream = fs.createReadStream(htmlPath, "utf-8");

    // Set the response header to indicate HTML content
    res.writeHead(200, { "Content-Type": "text/html" });

    // Pipe the file stream to the response
    fileStream.pipe(res);
  }
  // Check if the URL ends with ".html"
  else if (req.url.match("[.]html$")) {
    // Construct the path for the requested HTML file
    const htmlPath = path.join(__dirname, "templates", req.url);

    // Create a read stream for the HTML file
    const fileStream = fs.createReadStream(htmlPath, "utf-8");

    // Set the response header to indicate HTML content
    res.writeHead(200, { "Content-Type": "text/html" });

    // Pipe the file stream to the response
    fileStream.pipe(res);
  }
  // Check if the URL ends with ".css"
  else if (req.url.match("[.]css$")) {
    // Construct the path for the requested CSS file
    const htmlPath = path.join(__dirname, "templates/css", req.url);

    // Create a read stream for the CSS file
    const fileStream = fs.createReadStream(htmlPath, "utf-8");

    // Set the response header to indicate CSS content
    res.writeHead(200, { "Content-Type": "text/css" });

    // Pipe the file stream to the response
    fileStream.pipe(res);
  }
  // If the requested file or path does not match any condition
  else {
    // Send a 404 Not Found response
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

// Start the server and listen on port 3000
server.listen(3000);

// Log a message to indicate the server is running
console.log("Node.js web server at port 3000 is running..");
