export const UsersTable = ({ users, handleEdit, handleDelete }) => {
  return (
    <>
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
    </>
  );
};
