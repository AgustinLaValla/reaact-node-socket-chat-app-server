const { server } = require('./server');
const { green, magenta } = require('colors');

const port = process.env.PORT || 4000;

function main() {
    server.listen(port);
    console.log(`${green('Server on Port')} ${magenta(port)}`);
}

main();