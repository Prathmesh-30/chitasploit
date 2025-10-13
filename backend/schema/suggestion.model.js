const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const suggestionSchema = new Schema({
  movieTitle: {
    type: String,
    required: true,
    trim: true
  },
  reason: {
    type: String,
    required: true
  },
  suggestedBy: {
    type: String,
    default: 'Anonymous'
  },
  // 👇 Add this new field for the movie poster
  imageUrl: {
    type: String,
    default: 'https://i.imgur.com/3Z3gS6b.png' // Default placeholder image
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

// Export model
module.exports = Suggestion;