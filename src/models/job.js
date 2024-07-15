import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  companyName: String,
  title: String,
  type: String,
  location: String,
  experience: String,
  description: String,
  skills: String,
  weOffer: String,
  salary: String,
  additionalInfo: String,
  recruiterId: String,
  applicants: [
    {
      userId: String,
      name: String,
      email: String,
      status: String,
    },
  ],
});

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
