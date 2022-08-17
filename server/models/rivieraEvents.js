var mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    event_name: {
        type: String,
        required: true
    }, 
    event_start_timestamp: {
        type: String,
        required: true
    }, 
    event_end_timestamp: {
        type: String,
        required: true
    },
     event_location :{Lat :{type: String, require: true}, Lon: {type: String, require: true}},
     event_capacity: {type: Number, require: true}
});

const eventSchemaData = new mongoose.model('rivieraEvents',eventSchema);

module.exports = eventSchemaData;