const http = require('http');

const reqListener = (req, res) => {
    const url = req.url;
    const method = req.method;

    if ('/' === url) {
        res.setHeader('Content-Type','text/html')

        res.write('<h1>Hello Welcome</h1>');
        res.write('<form method="POST" action="/create-user">');
        res.write('<input type="text" name="userName" value="" ></input>');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.end();
    } else if ('/users' === url) {
        res.setHeader('Content-Type','text/html')

        res.write('<ul>');
        res.write('<li>User 1</li>');
        userList.forEach((value) => {
            res.write('<li>' + value + '</li>');
        });
        res.write('</ul>');

        res.write('<div><a href="/">Return</a></div>');
        res.end();
    } else if ('/create-user' === url && 'POST' === method) {
        const buffer = [];
        req.on('data', (chunk) => {
            buffer.push(chunk);
        });
        req.on('end', () => {
            const parseDate = Buffer.concat(buffer).toString();
            // console.log(parseDate);
            const userNameInput = parseDate.split('=')[1];
            userList.push(userNameInput);

            res.statusCode = 302; // redirect
            res.setHeader('Location', '/users');
            res.end();
        });
        return;
    }
};

const userList = [];
const server = http.createServer(reqListener);

server.listen(3000);