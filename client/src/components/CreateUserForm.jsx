export const CreateUserForm = () => {
  return (
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
  );
};
