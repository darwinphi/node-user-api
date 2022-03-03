import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState(null);

  console.log(users);

  useEffect(async () => {
    const response = await fetch("/users");
    const result = await response.json();
    setUsers(result.data);
  }, []);

  return (
    <main>
      <section>
        <h1>👨‍💻 Users</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Address</th>
              <th>Postcode</th>
              <th>Contact No.</th>
              <th>Email</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => (
                <tr key={i}>
                  <td>
                    {user.first_name}, {user.last_name}
                  </td>
                  <td>{user.username}</td>
                  <td>{user.address}</td>
                  <td>{user.postcode}</td>
                  <td>{user.contact_number}</td>
                  <td>{user.email}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <form>
          <h1>Create User</h1>
          <p>First Name</p>

          <input type="text" name="firstName" />
          <p>Last Name</p>
          <input type="text" name="lastName" />

          <p>Username </p>
          <input type="text" name="userName" />

          <p>Address </p>
          <input type="text" name="address" />

          <p>Postcode </p>
          <input type="text" name="postcode" />

          <p>Contact No </p>
          <input type="text" name="contactNumber" />

          <p>Email </p>
          <input type="text" name="email" />

          <p>
            <button type="submit" value="Submit">
              💾 Save
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

export default App;
