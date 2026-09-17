import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
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
  subtitle: {
    type: String,
    trim: true,
    default: '',
  },
  metaTitle: {
    type: String,
    trim: true,
    default: '',
  },
  metaDesc: {
    type: String,
    trim: true,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    required: [true, 'Please provide service content'],
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
