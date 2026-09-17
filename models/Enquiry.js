import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    trim: true,
    lowercase: true,
  },
  qualification: {
    type: String,
    trim: true,
    default: '',
  },
  preferredDestination: {
    type: String,
    trim: true,
    default: 'General',
  },
  preferredIntake: {
    type: String,
    trim: true,
    default: 'Upcoming Intake',
  },
  interest: {
    type: String,
    trim: true,
    default: '',
  },
  studyLevel: {
    type: String,
    trim: true,
    default: '',
  },
  city: {
    type: String,
    trim: true,
    default: '',
  },
  office: {
    type: String,
    trim: true,
    default: 'Bareilly',
  },
  counseling: {
    type: String,
    trim: true,
    default: 'In Person',
  },
  source: {
    type: String,
    trim: true,
    default: 'Enquiry Form',
  },
  consent: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
