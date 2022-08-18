var mongoose = require('mongoose');

const participantSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    }, 
});

const participantSchemaData = new mongoose.model('participants',participantSchema);

module.exports = participantSchemaData;