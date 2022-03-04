import { useState } from "react";

export const LoginForm = () => {
  return (
    <form action="">
      <h1>Login</h1>
      <p>
        <input type="text" placeholder="Email" />
      </p>
      <p>
        <input type="password" placeholder="Password" />
      </p>
      <p>
        <button type="submit">🔒 Login</button>
      </p>
    </form>
  );
};
