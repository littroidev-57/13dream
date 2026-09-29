import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please provide an identifier'],
    unique: true,
    trim: true,
  },
  countryName: {
    type: String,
    required: [true, 'Please provide a country name'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Please provide a unique slug'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: '',
  },
  bannerImg: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  tagline: {
    type: String,
    default: '',
  },
  overview: {
    type: String,
    default: '',
  },
  whyStudyPoints: [{
    type: String,
  }],
  topUniversities: [{
    type: String,
  }],
  visaFacts: [{
    type: String,
  }],
  metaTitle: {
    type: String,
    default: '',
  },
  metaDesc: {
    type: String,
    default: '',
  },
  keywords: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
