import mongoose from "mongoose";

const BookmarkSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    candidateUserId: { type: String, required: true },
    jobId: { type: String, required: true },
    jobSaveDate: String,
  },
  {
    indexes: [
      { fields: { candidateUserId: 1, jobId: 1 }, options: { unique: true } },
    ],
  }
);

const Bookmark =
  mongoose.models.Bookmark || mongoose.model("Bookmark", BookmarkSchema);

export default Bookmark;
