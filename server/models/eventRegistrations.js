var mongoose = require('mongoose');

const eventRegSchema = mongoose.Schema({
    event_code: {
        type: String,
        required: true,
        unique: true
    }, 
    userID: {
        type: String,
        required: true,
    }, 
});

const eventRegSchemaData = new mongoose.model('eventRegistrations',eventRegSchema);

module.exports = eventRegSchemaData;