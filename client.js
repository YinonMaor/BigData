const WebHDFS = require('webhdfs');
module.exports = WebHDFS.createClient({
  //user: 'webuser',
  host: 'http://localhost',
  path: '/',
  port: 50070
});