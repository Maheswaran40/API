import React, { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
 var url = "http://localhost:5000/api/products";
  var [Name, setname] = useState("");
  var [Price, setPrice] = useState("");
  var [Category, setCategory] = useState("");
  var [Desc, setDesc] = useState("");
  async function submitForm(e) {
    e.preventDefault();
    try {
      var formData = {
        Name,
        Price,
        Category,
        Desc,
      };
      await axios.post(`${url}/add`, formData);
      alert("data stored successfully");
    } catch (err) {
      alert(err, "axios err");
    }
  }
  return (
    <>
      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <select
          name="category"
          id="category"
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
          name="desc"
          placeholder="desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;

// A-1 B-2 C-3 D-4 E-5 F-6 G-7 H-8 I-9 J-10 K-11 L-13 M-13 N-14
// O-15 P-16 Q-17 R-18 S-19 T-20 U-21 V-22 W-23 X-24 Y-25 Z-26
