const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const getinfo = require('.\systemInfo')

const server = http.createServer((req, res) => {
    const systemInfo = getinfo();
    const logFilePath = path.join(__dirname, 'logs', 'system-info.txt');
    
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(systemInfo, null, 2));
    } else if (req.url === '/log') {
        const logData = `System Info Logged at ${new Date().toLocaleString()}\n${JSON.stringify(systemInfo, null, 2)}\n\n`;
        
        fs.mkdir(path.dirname(logFilePath), { recursive: true }, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Error creating log directory');
            }
            
            fs.appendFile(logFilePath, logData, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    return res.end('Error writing to log file');
                }
                
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('System information logged successfully!');
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
