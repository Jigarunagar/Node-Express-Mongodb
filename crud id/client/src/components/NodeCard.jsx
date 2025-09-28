import React, { useState } from "react";

const NodeCard = ({ node, onAddChild, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  return (
    <div className="node-card">
      {isEditing ? (
        <>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <button onClick={() => { onUpdate(node._id, form); setIsEditing(false); }}>Save</button>
        </>
      ) : (
        <>
          <h4>{node.name}</h4>
          <p>{node.email}</p>
        </>
      )}

      <div>
        <button onClick={() => setIsAdding(!isAdding)}>+ Add Child</button>
        <button onClick={() => setIsEditing(!isEditing)}>✏️ Edit</button>
        <button onClick={() => onDelete(node._id)}>🗑️ Delete</button>
      </div>

      {isAdding && (
        <div style={{ marginTop: "8px" }}>
          <input placeholder="Child Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Child Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <button onClick={() => { onAddChild(node._id, form); setIsAdding(false); setForm({name:'',email:''}) }}>Add</button>
        </div>
      )}

      <div style={{ marginLeft: "20px" }}>
        {node.children.map(child => (
          <NodeCard
            key={child._id}
            node={child}
            onAddChild={onAddChild}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default NodeCard;
