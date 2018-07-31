const WebHDFS = require('webhdfs');
module.exports = WebHDFS.createClient({
  user: 'root',
  host: 'http://localhost',
  path: '/',
  port: 50070
});