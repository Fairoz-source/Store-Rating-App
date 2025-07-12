import { useState } from "react";
import api from "../api/api"; // axios instance
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend field checks
    const { name, email, password, address } = form;

    if (!name || !email || !password || !address) {
      alert("Please fill all fields");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      alert("Password must be 8–16 characters, include one uppercase letter and one special character.");
      return;
    }

    try {
      console.log("Sending signup data:", form);
      const response = await api.post("/auth/register", form);

      alert(response.data.message || "Signup successful!");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        alert("Signup failed. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="owner">Store Owner</option>
      </select>
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
