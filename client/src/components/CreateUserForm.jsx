import axios from "axios";
import { Formik, Field, Form } from "formik";

export const CreateUserForm = () => {
  const createUser = async (user) => {
    try {
      const response = await axios.post("/users/create", {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        postcode: user.postcode,
        contactNumber: user.contactNumber,
        username: user.username,
        password: user.password,
        isAdmin: false,
      });
      console.log(response.data);
      window.location.reload(false);
    } catch (e) {
      const { data } = e.response.data;
      alert(data.map((d) => d.msg));
    }
  };
  const confirmCreateUser = async (user) => {
    const { firstName, lastName } = user;
    const message = `Are you sure you want to create ${firstName} ${lastName}?`;
    if (confirm(message)) {
      createUser(user);
    }
  };

  return (
    <>
      <h1>Create User</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          address: "",
          postcode: "",
          email: "",
          password: "",
        }}
        onSubmit={async (user) => {
          confirmCreateUser(user);
        }}
      >
        <Form>
          <p>
            <Field
              id="firstName"
              name="firstName"
              placeholder="First Name"
              type="text"
              required
            />
          </p>
          <p>
            <Field
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              type="text"
              required
            />
          </p>
          <p>
            <Field
              id="username"
              name="username"
              placeholder="Username"
              type="username"
              required
            />
          </p>
          <p>
            <Field
              id="address"
              name="address"
              placeholder="Address"
              type="text"
              required
            />
          </p>
          <p>
            <Field
              id="postcode"
              name="postcode"
              placeholder="Postcode"
              type="text"
              required
            />
          </p>
          <p>
            <Field
              id="contactNumber"
              name="contactNumber"
              placeholder="Contact No."
              type="text"
              required
            />
          </p>
          <p>
            <Field
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              required
            />
          </p>
          <p>
            <Field
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              required
            />
          </p>

          <button type="submit">💾 Save</button>
        </Form>
      </Formik>
    </>
  );
};
