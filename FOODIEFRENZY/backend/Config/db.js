import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://foodie-frenzy:T2nZkyr4hMETOD0h@cluster0.hdvmz.mongodb.net/foodie_frenzyDb?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Connected DB");
    });
};
