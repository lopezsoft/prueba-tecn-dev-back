import bodyParser   = require('body-parser');
import {server, serverSocket, io, dbConfg } from './utils/utils';
import router from './routes/router';

server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(router);

server.publicFolder();

serverSocket.listen(server.port, () => {
    console.log('Servidor sokets', server.port);
});
