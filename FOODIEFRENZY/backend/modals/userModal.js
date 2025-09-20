import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { collection: "" }
);

const userModal = mongoose.models.user || mongoose.model("user", userSchema);
export default userModal;
