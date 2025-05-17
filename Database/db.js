const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://jigarunagar:oUmiSAxMwqRKI180@cluster0.zsieghq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to the Mongodb.....");
  } catch (error) {
    console.log("error",error);
    
  }
};
module.exports = dbConnect;
 