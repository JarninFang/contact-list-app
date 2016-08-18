var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {
  var ContactSchema = new Schema({
    name: String,
    email: String,
    number: String
  });

  mongoose.model('Contact', ContactSchema);
};
