import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Node", default: null },
});

export default mongoose.model("Node", NodeSchema);
