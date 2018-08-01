const WebHDFS = require('webhdfs');
module.exports = WebHDFS.createClient({
  user: 'dr.who',
  host: 'http://localhost',
  path: '/data/',
  port: 50070
});