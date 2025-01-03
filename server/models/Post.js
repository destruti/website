const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  meta_description: {
    type: String,
    required: true
  },
  meta_og_image: {
    type: String,
    required: true
  },
  meta_keywords: {
    type: String,
    required: true
  },
  linkedin_post: {
    type: String,
    required: true
  },
  post_active: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);