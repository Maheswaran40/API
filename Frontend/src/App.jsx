import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  // ----- POST form state -----
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("");
  const [Desc, setDesc] = useState("");

  // ----- GET data state -----
  const [input, setInput] = useState([]);

  // ----- UPDATE state -----
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // ---------------- POST function ----------------
  async function submitForm(e) {
    e.preventDefault();
    if (!Name || !Price || !Category || !Desc) {
      alert("All fields are required!");
      return;
    }

    try {
      const formData = {
        name: Name.trim(),
        price: Number(Price),
        category: Category,
        desc: Desc.trim(),
      };
      await axios.post("http://localhost:5000/api/products/add", formData);
      alert("Data stored successfully");
      setName("");
      setPrice("");
      setCategory("");
      setDesc("");
      viewFun(); // refresh list
    } catch (err) {
      console.error(err.response || err.message);
      alert(err.response?.data?.message || "POST failed");
    }
  }

  // ---------------- GET function ----------------
  async function viewFun() {
    try {
      const dataBaseData = await axios.get(
        "http://localhost:5000/api/products/list"
      );
      setInput(dataBaseData.data);
    } catch (err) {
      console.error(err.message, "GET method error");
    }
  }

  useEffect(() => {
    viewFun();
  }, []);

  // ---------------- DELETE function ----------------
  async function deleteFun(proId) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${proId}`);
      alert("Data deleted");
      viewFun(); // refresh list
    } catch (err) {
      console.error("DELETE ERROR 👉", err.response || err.message);
      alert(err.response?.data?.message || "Delete failed");
    }
  }

  // ---------------- UPDATE function ----------------
  async function updateFun(proId) {
    if (!editName || !editPrice || !editCategory || !editDesc) {
      alert("All fields are required for update");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/update/${proId}`,
        {
          name: editName.trim(),
          price: Number(editPrice),
          category: editCategory,
          desc: editDesc.trim(),
        }
      );
      alert(response.data.message);
      setEditingId(null); // exit edit mode
      viewFun(); // refresh list
    } catch (err) {
      console.error("UPDATE ERROR ", err.response || err.message);
      alert(err.response?.data?.message || "Update failed");
    }
  }

  return (
    <>
      {/* ----- ADD PRODUCT FORM ----- */}
      <form onSubmit={submitForm} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">--Select Category--</option>
          <option value="tech">Tech</option>
          <option value="science">Science</option>
          <option value="arts">Arts</option>
          <option value="sports">Sports</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={Desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>

      {/* ----- DISPLAY PRODUCTS ----- */}
      <div className="row">
        {input.map((value) => (
          <div className="col-lg-4" key={value._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
            {editingId === value._id ? (
              // ----- EDIT FORM -----
              <div>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                />
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="">--Select Category--</option>
                  <option value="tech">Tech</option>
                  <option value="science">Science</option>
                  <option value="arts">Arts</option>
                  <option value="sports">Sports</option>
                </select>
                <input
                  type="text"
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                />
                <button onClick={() => updateFun(value._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              // ----- DISPLAY PRODUCT -----
              <div>
                <h3>{value.name}</h3>
                <p>Price: {value.price}</p>
                <p>Category: {value.category}</p>
                <p>{value.desc}</p>
                <button
                  onClick={() => {
                    setEditingId(value._id);
                    setEditName(value.name);
                    setEditPrice(value.price);
                    setEditCategory(value.category);
                    setEditDesc(value.desc);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteFun(value._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
