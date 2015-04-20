
/* shortly-angular */

var mongoose = require('mongoose'),
    crypto   = require('crypto');

// var LinkSchema = new mongoose.Schema({
//  visits: Number,
//  link: String,
//  title: String,
//  code: String,
//  base_url: String,
//  url: String
// });

var EventSchema = new mongoose.Schema ({
	eventID : { type: Number, ref: 'eventID'},
	description : String,
	location : String,
	datetime: Date,
	creatorID : Number,
	attendeeIDs : []
});

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

EventSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = mongoose.model('Event', EventSchema);


/* awkwardalps */

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema,
//     autoIncrement = require('mongoose-auto-increment');

// var db = mongoose.createConnection("mongodb://localhost/corgi"); //connects to database called corgi

// autoIncrement.initialize(connection);  // required to get the tables to auto-increment for each new record (user or event)


// var EventSchema = new Schema ({
// 	eventID : { type: Number, ref: 'eventID'},
// 	description : String,
// 	location : String,
// 	datetime: Date,
// 	creatorID : Number,
// 	attendeeIDs : []
// });

// EventSchema.plugin(autoIncrement.plugin, 'eventID');  // extends the EventSchema to include the auto-increment
// var Event = db.model('Event', EventSchema)

// exports.Event = mongoose.model('events', EventSchema);
