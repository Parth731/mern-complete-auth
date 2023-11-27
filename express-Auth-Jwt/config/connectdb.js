import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async (DATABASE_URL) => {
  // const connectionUrl = `mongodb+srv://parthdangroshiya31:5JNDyagEMGRjpEG7@cluster0.9fsm5wt.mongodb.net/nextjs-thirteen-ecommerce`;

  mongoose
    .connect(DATABASE_URL, configOptions)
    .then(() => console.log("schooldb database connected successfully!"))
    .catch((err) =>
      console.log(`Getting Error from DB connection ${err.message}`)
    );
};

export default connectToDB;