const fs = require('fs');

const requestHandler = (req, res) => {
        const url = req.url;
        const method = req.method;

        if (url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.write('<body>');
            res.write('<form action = "/message" method = "POST" >');
            res.write('<input type = "text" name = "message"></input>');
            res.write('<button type = "submit">Send</button>');
            res.write('</form>');
            res.write('</body>');
            res.end();     
            return;   
        } else if (url === '/message' && method === 'POST') {
            const box = [];
            req.on('data', (chunk) => {
                box.push(chunk);
            });
            req.on('end', () => {
                const parsedData = Buffer.concat(box).toString();
                const message = parsedData.split('=')[1];
                fs.writeFile('messageSave.txt', message, err => {
                    res.statusCode = 304;
                    res.setHeader('Location', '/');
                    res.end();
                });
            });
            return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.write('<body><h1>Hello World!</h1></body>');
        res.end();
    };

// module.exports = requestHandler;

module.exports = {
    handler : requestHandler,
    text : 'abc'
}

// module.exports.handler = requestHandler;
// module.exports.text = '123';

// exports.handler = requestHandler;
// exports.text = '123';
