const WebHDFS = require('webhdfs');
module.exports = WebHDFS.createClient({
  user: 'hadoop-docker',
  host: 'http://localhost',
  path: '/',
  port: 50070
});