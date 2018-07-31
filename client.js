const WebHDFS = require('webhdfs');
module.exports = WebHDFS.createClient({
  user: 'maorshabtay',
  host: 'http://localhost',
  path: '/',
  port: 50070
});