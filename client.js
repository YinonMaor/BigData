const WebHDFS = require('webhdfs');
module.exports = WebHDFS.createClient({
  user: 'webuser',
  host: 'localhost',
    //path: '/webhdfs/v1',
    port: 50070
});