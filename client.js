const WebHDFS = require('webhdfs');
module.exports = WebHDFS.createClient({
  user: 'webuser',
  host: 'localhost',
  path: '/',
  port: 50070
});