import Node from "../models/NodeModel.js";

// Create node
export async function createNode(req, res) {
  try {
    const { name, email, parent } = req.body;
    const node = await Node.create({ name, email, parent: parent || null });
    res.status(201).json(node);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all nodes
export async function getNodes(req, res) {
  try {
    const nodes = await Node.find();
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update node
export async function updateNode(req, res) {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const updated = await Node.findByIdAndUpdate(id, { name, email }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Recursive delete
async function deleteRecursive(id) {
  const children = await Node.find({ parent: id });
  for (let child of children) {
    await deleteRecursive(child._id);
  }
  await Node.findByIdAndDelete(id);
}

// Delete node
export async function deleteNode(req, res) {
  try {
    const { id } = req.params;
    await deleteRecursive(id);
    res.json({ message: "Node and its children deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
