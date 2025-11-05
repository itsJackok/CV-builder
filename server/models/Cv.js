import mongoose from 'mongoose';

const Section = new mongoose.Schema({
  title: String,
  items: [{}]
}, { _id: false });

const CvSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  fullName: String,
  role: String,
  summary: String,
  contacts: {
    phone: String,
    email: String,
    github: String,
    linkedin: String
  },
  skills: [String],
  education: [
    {
      school: String,
      qualification: String,
      period: String
    }
  ],
  projects: [
    {
      name: String,
      stack: String,
      description: String,
      relevance: String
    }
  ],
  sections: [Section]
}, { timestamps: true });

export default mongoose.model('Cv', CvSchema);
