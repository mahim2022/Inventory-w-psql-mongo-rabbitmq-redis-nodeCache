var NodeCache = require("node-cache");
var myCache = new NodeCache({ stdTTL: 30 });
module.exports = myCache;
