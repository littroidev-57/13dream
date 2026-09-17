import mongoose from 'mongoose';

const SuccessStorySchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true,
  },
  category: {
    type: String,
    enum: ['visa', 'ielts', 'pte'],
    default: 'visa',
  },
  countryOrScore: {
    type: String,
    default: 'Canada',
  },
  testimonial: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  videoUrl: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SuccessStory || mongoose.model('SuccessStory', SuccessStorySchema);
