const supergoose = require('@code-fellows/supergoose');
const server = require('../server');
const mockReq = supergoose(server.server);
process.env.SECRET = 'ajaz';