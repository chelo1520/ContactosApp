import mongoose from "mongoose";

export const conectDB = async() => {
  try {
    await mongoose.connect("mongodb://localhost/ContactosApp")
    console.log("BD conectada");
  } catch (error) {
    console.log(error)
  }
}
