import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a unique slug'],
    unique: true,
    trim: true,
  },
  excerpt: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide blog content'],
  },
  image: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'Study Abroad',
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
