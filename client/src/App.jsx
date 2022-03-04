import { useState, useEffect } from "react";
import "./App.css";
import { UsersTable } from "./components/UsersTable";
import { CreateUserForm } from "./components/CreateUserForm";

function App() {
  const [users, setUsers] = useState(null);

  console.log(users);

  useEffect(async () => {
    const response = await fetch("/users");
    const result = await response.json();
    console.log(result);
    setUsers(result.data);
  }, []);

  return (
    <main>
      <section>

        {/* <UsersTable users={users} /> */}
        {/* <CreateUserForm /> */}
      </section>
    </main>
  );
}

export default App;
