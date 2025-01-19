import { useState } from "react";

export default function TodoItem({ id, name, description, completed, onEdit, onDelete, onCompleted }) {
    
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name); 
  const [newDescription, setNewDescription] = useState(description); 

  const handleSave = () => {
    onEdit(id, newName, newDescription); 
    setIsEditing(false); 
  };

  return (
    <div className={`mt-5 bg-slate-100 rounded p-3 ${completed ? "bg-slate-700 line-through" : ""}`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            className="block w-full p-2 mb-2 border border-gray-300 rounded"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Todo Name"
          />
          <textarea
            className="block w-full p-2 border border-gray-300 rounded"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Todo Description"
          />
          <div className="flex flex-col md:flex-row gap-2 my-2">
            <button
              onClick={handleSave}
              className="w-full md:w-auto transition ease-in-out delay-100 py-1 px-3 rounded text-white font-medium hover:bg-green-600 bg-green-400"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="w-full md:w-auto transition ease-in-out delay-100 py-1 px-3 rounded text-white font-medium hover:bg-red-600 bg-red-400"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="font-bold text-lg">{newName}</h1>
          <p className="font-light">{newDescription}</p>
          <div className="flex flex-col md:flex-row gap-2 my-2">
            <button
              onClick={() => setIsEditing(true)}
              className={`w-full md:w-auto transition ease-in-out delay-100 py-1 px-3 rounded text-white font-medium hover:bg-green-600 bg-green-400 ${
                completed ? "bg-slate-400" : ""
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              className={`w-full md:w-auto transition ease-in-out delay-100 py-1 px-3 rounded text-white font-medium hover:bg-red-800 bg-red-600 ${
                completed ? "bg-slate-400" : ""
              }`}
            >
              Delete
            </button>
            <button
              onClick={() => onCompleted(id)}
              className={`w-full md:w-auto transition ease-in-out delay-100 py-1 px-3 rounded text-white font-medium hover:bg-blue-700 bg-blue-500 ${
                completed ? "bg-slate-400" : ""
              }`}
            >
              {completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
