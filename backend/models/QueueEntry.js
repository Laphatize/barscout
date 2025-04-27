const mongoose = require('mongoose');
const queueEntrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bar: { type: mongoose.Schema.Types.ObjectId, ref: 'Bar' },
});
module.exports = mongoose.model('QueueEntry', queueEntrySchema);