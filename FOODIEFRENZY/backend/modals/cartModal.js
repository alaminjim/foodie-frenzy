import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema(
  {
    user: {
      type: String, // ObjectId নয়
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

export const CartItem = mongoose.model("CartItem", cartItemSchema);
