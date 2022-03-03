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
      <ul>
        {users &&
          users.map((user, i) => (
            <li key={i}>
              {user.first_name}, {user.last_name}
            </li>
          ))}
      </ul>
    </main>
  );
}

export default App;
