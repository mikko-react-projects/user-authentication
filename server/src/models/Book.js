import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  cover: { type: String, required: true },
  goodreadsId: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
})

export default mongoose.model("Book", schema);
