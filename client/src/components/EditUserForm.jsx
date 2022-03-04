import axios from "axios";
import { Formik, Field, Form } from "formik";

export const EditUserForm = ({ setDisplayEditUser, userToEdit }) => {
  console.log("User to edit", userToEdit);
  const editUser = async (user) => {
    try {
      const response = await axios.put("/users/edit", {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        postcode: user.postcode,
        contactNumber: user.contactNumber,
        username: user.username,
        password: user.password,
      });
      console.log(response.data);
      window.location.reload(false);
    } catch (e) {
      const { data } = e.response.data;
      alert(data.map((d) => d.msg));
      console.log(e);
    }
  };
  const confirmEditUser = async (user) => {
    const { firstName, lastName } = user;
    const message = `Are you sure you want to edit ${firstName} ${lastName}?`;
    if (confirm(message)) {
      editUser(user);
    }
  };

  return (
    <>
      <p>
        <button onClick={() => setDisplayEditUser(false)}>Back</button>
      </p>
      <h1>Edit User</h1>
      <Formik
        initialValues={{
          id: userToEdit.id,
          firstName: userToEdit.first_name,
          lastName: userToEdit.last_name,
          username: userToEdit.username,
          address: userToEdit.address,
          postcode: userToEdit.postcode,
          contactNumber: userToEdit.contact_number,
          email: userToEdit.email,
          password: "",
        }}
        onSubmit={async (user) => {
          confirmEditUser(user);
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
      <hr></hr>
    </>
  );
};
