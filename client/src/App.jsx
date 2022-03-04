import { useState, useEffect } from "react";
import "./App.css";
import { UsersTable } from "./components/UsersTable";
import { CreateUserForm } from "./components/CreateUserForm";
import { LoginForm } from "./components/LoginForm";
import useCookie from "react-use-cookie";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import { Button } from "./components/Button";
import jwt_decode from "jwt-decode";
import jwtDecode from "jwt-decode";

function App() {
  const [users, setUsers] = useState(null);
  const [userToken, setUserToken] = useCookie("token", null);
  const [loginErrorMessage, setLogInErrorMessage] = useState("");

  const isAdmin = () => {
    return userToken && jwtDecode(userToken).is_admin;
  };

  console.log(isAdmin());

  console.log(users);
  console.log(userToken);

  useEffect(async () => {
    const response = await fetch("/users");
    const result = await response.json();
    console.log(result);
    setUsers(result.data);
  }, []);

  if (!userToken) {
    return (
      <main>
        <section>
          <h1>Please Login</h1>
          <p>{loginErrorMessage}</p>
          <LoginForm
            setUserToken={(value) => setUserToken(value)}
            setLogInErrorMessage={(value) => setLogInErrorMessage(value)}
          />
        </section>
      </main>
    );
  }

  const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.reload(false);
  };

  return (
    <main>
      <section>
        <Button onClick={logout} value="↩️ Log Out" />

        <UsersTable users={users} isAdmin={isAdmin}/>
        {isAdmin() && <CreateUserForm />}
      </section>
    </main>
  );
}

export default App;
