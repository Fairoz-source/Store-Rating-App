import { useEffect, useState } from "react";
import api from "../api/api";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.address.toLowerCase().includes(filter.toLowerCase()) ||
        user.role.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey].toLowerCase();
      const bVal = b[sortKey].toLowerCase();
      return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

  return (
    <div>
      <h2>Admin Panel</h2>

      <input
        placeholder="Filter by name, email, address, role"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ padding: "5px", width: "300px", marginBottom: "10px" }}
      />

      <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="address">Address</option>
        <option value="role">Role</option>
      </select>
      <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
        <option value="asc">⬆ Ascending</option>
        <option value="desc">⬇ Descending</option>
      </select>

      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
