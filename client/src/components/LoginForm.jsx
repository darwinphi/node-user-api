import { useState } from "react";
import { Formik, Field, Form } from "formik";
import axios from "axios";

export const LoginForm = ({ setUserToken, setLogInErrorMessage }) => {
  const handleLogin = async (user) => {
    try {
      const response = await axios.post("/auth/login", {
        email: user.email,
        password: user.password,
      });
      const { data } = response.data;
      setUserToken(data.token);
      console.log("Response", data.token);
    } catch (e) {
      const { message } = e.response.data;
      console.log(message);
      setLogInErrorMessage(`⛔ ${message}`);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (user) => {
          handleLogin(user);
        }}
      >
        <Form>
          <p>
            <Field id="email" name="email" placeholder="Email" type="email" />
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
    </>
  );
};
