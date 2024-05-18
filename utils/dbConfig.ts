import { connect } from "mongoose";

const url: string = `mongodb://127.0.0.1:27017/mgnDB`;

export const dbConfig = async () => {
  try {
    await connect(url).then(() => {
      console.log("connection established ❤️❤️❤️");
    });
  } catch (error) {
    console.error();
  }
};
