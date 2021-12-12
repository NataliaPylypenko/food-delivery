const jsonServer = require('json-server'),
    server = jsonServer.create(),
    router = jsonServer.router('./db.json'),
    middlewares = jsonServer.defaults({
        static: './dist',
    });

const PORT = process.env.PORT || 8001;

server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
    console.log('Server is running');
});