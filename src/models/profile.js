import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  userId: String,
  role: String,
  email: String,
  isPremiumUser: Boolean,
  memberShipType: String,
  memberShipStartDate: String,
  memberShipEndDate: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companySize: String,
    companyRole: String,
    description: String,
  },
  candidateInfo: {
    name: String,
    skills: String,
    country: String,
    currentCompany: String,
    phone: String,
    salary: String,
    resume: String,
    coverLetter: String,
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;
