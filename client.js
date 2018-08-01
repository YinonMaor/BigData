const WebHDFS = require('webhdfs');
const hdfs = WebHDFS.createClient({
  user: 'dr.who',
  host: 'localhost',
  port: 50070
});

module.exports = hdfs;