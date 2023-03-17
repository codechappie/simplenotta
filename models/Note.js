import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    colour: { type: String, required: true },
  },
  { collection: "note" }
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
