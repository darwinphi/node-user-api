import axios from "axios";
import { useState } from "react";
import { EditUserForm } from "./EditUserForm";

export const UsersTable = ({ users, isAdmin }) => {
  const [displayEditUser, setDisplayEditUser] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [usersToDelete, setUsersToDelete] = useState([]);

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

  const confirmDeleteUsers = async () => {
    const message = `Are you sure you want to delete the selected users?`;
    if (confirm(message)) {
      deleteUsers();
    }
  };

  const deleteUsers = async () => {
    try {
      await axios.post("/users/delete", {
        ids: usersToDelete,
      });
      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheck = (e) => {
    const id = e.target.value;
    const isChecked = e.target.checked;

    if (e.target.checked) {
      setUsersToDelete([...usersToDelete, id]);
      console.log("Check and Value", isChecked, id);
    } else {
      setUsersToDelete(
        usersToDelete.filter((userToDelete) => userToDelete !== id)
      );
    }
  };

  if (displayEditUser) {
    return (
      <EditUserForm
        setDisplayEditUser={(value) => setDisplayEditUser(value)}
        userToEdit={userToEdit}
      />
    );
  }

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
            {isAdmin() && (
              <th colSpan={2}>
                <button onClick={confirmDeleteUsers}>
                  Delete All Selected
                </button>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="checkbox"
                    value={user.id}
                    onChange={(e) => handleCheck(e)}
                    style={{ marginRight: "0.5rem" }}
                  />
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
                      <button
                        onClick={() => {
                          setDisplayEditUser(true);
                          setUserToEdit(user);
                        }}
                      >
                        Edit
                      </button>
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
