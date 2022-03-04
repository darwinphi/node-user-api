import { useState, useEffect } from "react";
import "./App.css";
import { UsersTable } from "./components/UsersTable";
import { CreateUserForm } from "./components/CreateUserForm";
// import { LoginForm } from "./components/LoginForm";
import useCookie from "react-use-cookie";
import { Formik, Field, Form } from "formik";
import axios from "axios";

function App() {
  const [users, setUsers] = useState(null);
  const [userToken, setUserToken] = useCookie("token", null);

  console.log(users);

  useEffect(async () => {
    const response = await fetch("/users");
    const result = await response.json();
    console.log(result);
    setUsers(result.data);
  }, []);

  const login = async (user) => {
    try {
      const response = await axios.post("/auth/login", {
        email: user.email,
        password: user.password,
      });
      console.log(response.data);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  if (!userToken) {
    return (
      <main>
        <section>
          <h1>Please Login</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (user) => {
              login(user);
            }}
          >
            <Form>
              <p>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
              </p>
              <p>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
              </p>

              <button type="submit">🔒 Login</button>
            </Form>
          </Formik>
        </section>
      </main>
    );
  }

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
