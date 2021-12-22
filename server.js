const jsonServer = require('json-server'),
    server = jsonServer.create(),
    router = jsonServer.router('./db.json'),
    middlewares = jsonServer.defaults({
        static: './dist',
    });

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);

server.use(
    jsonServer.rewriter({
        '/api/*': '/$1',
    }),
);

server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`);
});

