var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User schema
var CardSchema = new Schema({
  title: {
    type: String,
  },
  archived: { 
    type: Boolean,
    optional: true,
  },
  listId: {
    type: String,
    optional: true,
  },
  // The system could work without this `boardId` information (we could deduce
  // the board identifier from the card), but it would make the system more
  // difficult to manage and less efficient.
  boardId: {
    type: String,
    optional: true,
  },
  coverId: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    denyUpdate: true,
    optional: true,
  },
  dateLastActivity: {
    type: Date,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
  labelIds: {
    type: [String],
    optional: true,
  },
  members: {
    type: [String],
    optional: true,
  },
  // XXX Should probably be called `authorId`. Is it even needed since we have
  // the `members` field?
  userId: {
    type: String,
    optional: true,
  },
  sort: {
    type: Number,
    decimal: true,
    optional: true,
  },
    category: {
        type: String
    },
    sub_category: {
        type: String
    },
    priority: {
        type: Number
    }
});

module.exports = mongoose.model('cards', CardSchema);
