import React, { useEffect, useState } from "react";
import API from "./api";
import NodeCard from "./components/NodeCard";
import { buildTree } from "./utils/buildTree";
import "./App.css"
export default function App() {
  const [nodes, setNodes] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  const fetchNodes = async () => {
    const res = await API.get("/nodes");
    setNodes(buildTree(res.data));
  };

  useEffect(() => { fetchNodes(); }, []);

  const addParent = async () => {
    if(form.name && form.email){
      await API.post("/nodes", form);
      setForm({ name: "", email: "" });
      fetchNodes();
    }
  };

  const addChild = async (parentId, data) => {
    await API.post("/nodes", { ...data, parent: parentId });
    fetchNodes();
  };

  const updateNode = async (id, data) => {
    await API.put(`/nodes/${id}`, data);
    fetchNodes();
  };

  const deleteNode = async (id) => {
    await API.delete(`/nodes/${id}`);
    fetchNodes();
  };

  return (
    <div>
      <div className="add-parent-form">
        <h2>Add Parent</h2>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button onClick={addParent}>Add Parent</button>
      </div>

      <h2>Tree Structure</h2>
      {nodes.map(node => (
        <NodeCard key={node._id} node={node} onAddChild={addChild} onUpdate={updateNode} onDelete={deleteNode} />
      ))}
    </div>
  );
}
