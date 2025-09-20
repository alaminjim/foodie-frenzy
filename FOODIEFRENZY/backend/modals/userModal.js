import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const userModal = mongoose.models.user || mongoose.model("user", userSchema);

export default userModal;
