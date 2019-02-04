require('dotenv').config();

const server = require('./api/server.js');



const port = process.env.PORT || 7111;

server.listen(port, () => {
  console.log(`\n=== Web API Listening on === \n=== http://localhost:${port} ===\n`);
});