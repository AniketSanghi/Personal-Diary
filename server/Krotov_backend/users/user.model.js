const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String,required: true },
    content: { type: String},
    date: {type: String},
    image: {type: String},
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('diaries', schema);