import axios from "axios";

export const UsersTable = ({ users, handleEdit, handleDelete, isAdmin }) => {
  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`/users/delete/${id}`);
      console.log(response.data);
      window.location.reload(false);
    } catch (e) {
      console.log(e.response.data.message);
      alert(e.response.data.message);
    }
  };
  const confirmDeleteUser = async (user) => {
    const { id, first_name, last_name } = user;
    const message = `Are you sure you want to delete ${first_name} ${last_name}?`;
    if (confirm(message)) {
      deleteUser(id);
    }
  };

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
            {isAdmin() && <th colSpan={2}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={i}>
                <td>
                  {user.first_name} {user.last_name}
                </td>
                <td>{user.username}</td>
                <td>{user.address}</td>
                <td>{user.postcode}</td>
                <td>{user.contact_number}</td>
                <td>{user.email}</td>

                {isAdmin() && (
                  <>
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      <button onClick={() => confirmDeleteUser(user)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};
