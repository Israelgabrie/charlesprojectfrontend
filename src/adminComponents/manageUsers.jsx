import React, { useEffect, useState } from "react";
import "../css/manageUsers.css";
import { backendLocation, socket, deleteUsers } from "../backendOperation";
import { useOutletContext } from "react-router-dom";
import { formatDateAndHandleErrors } from "../helperFuntions.js";
import { useUser } from "../userContext";
import { toast } from "react-toastify";

export default function ManageUsers() {
  const { manageUserStats, setManageUserStats } = useOutletContext();
  const { user } = useUser();
  const [myDataBox, setMyDataBox] = useState(false);
  const [usersPicked, setUsersPicked] = useState([]);
  const [filteredUserValue, setFilteredUserValue] = useState("All");
  const [searchStudentsText, setSearchStudentsText] = useState("");
  console.log(manageUserStats)

  // Debounce the search text
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchStudentsText.trim() !== "") {
        socket.emit("getStudentUser", searchStudentsText, (data) => {
          if (data?.success) {
            setManageUserStats((prev) => ({
              ...prev,
              studentUsers: data.students || [],
            }));
          }
        });
      } else {
        socket.emit("getFilteredUsers", filteredUserValue, (data) => {
          setManageUserStats((prev) => ({
            ...prev,
            studentUsers: data.users || [],
          }));
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchStudentsText, filteredUserValue, setManageUserStats]);

  useEffect(() => {
    socket.emit("getFilteredUsers", filteredUserValue, (data) => {
      setManageUserStats((prev) => ({
        ...prev,
        studentUsers: data.users || [],
      }));
    });
  }, [filteredUserValue, setManageUserStats]);

  const numberOfActiveUsers = manageUserStats?.studentUsers?.filter(
    (user) => user.active
  );

  async function handleDeleteSingleUser(userId) {
    try {
      const response = await deleteUsers({ userId });
      if (response.success) {
        socket.emit("getFilteredUsers", filteredUserValue, (data) => {
          setManageUserStats((prev) => ({
            ...prev,
            studentUsers: data.users || [],
          }));
        });
      } else {
        toast.error(
          response.message || response.error || "Something went wrong"
        );
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  async function handleDeleteSelectedUsers() {
    if (usersPicked.length === 0) return;
    try {
      const userIds = usersPicked.map((user) => user._id);
      await deleteUsers({ userId: userIds });
      setUsersPicked([]); // Clear selected users after delete
      socket.emit("getFilteredUsers", filteredUserValue, (data) => {
        setManageUserStats((prev) => ({
          ...prev,
          studentUsers: data.users || [],
        }));
      });
    } catch (error) {
      console.error("Error deleting selected users:", error);
    }
  }

  return (
    <div className="manage-users-container">
      <div className="users-header">
        <h2>Manage Users</h2>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by name..."
              value={searchStudentsText}
              onChange={(e) => setSearchStudentsText(e.target.value)}
            />
            <button className="search-button">🔍</button>
          </div>
          <div className="filter-container">
            {/* <select
              className="filter-select"
              value={filteredUserValue}
              onChange={(e) => setFilteredUserValue(e.target.value)}
            >
              <option value="All">All Students</option>
              <option value="active">Active</option>
            </select> */}
            <div
              className="filter-select"
              style={{
                backgroundColor: "#6366f1",
                color: "white",
                fontWeight: "bold",
                fontFamily: "CalibreRegular",
                cursor: "pointer",
              }}
              onClick={() => setMyDataBox(true)}
            >
              My Account
            </div>
          </div>
        </div>
      </div>

      <div className="users-stats">
        <div className="stat-card total">
          <div className="stat-value">
            {manageUserStats?.totalUsers || "NaN"}
          </div>
          <div className="stat-label">Total Users</div>
        </div>
        {/* <div className="stat-card active">
          <div className="stat-value">
            {numberOfActiveUsers?.length || "NaN"}
          </div>
          <div className="stat-label">Active Users</div>
        </div> */}
        <div className="stat-card suspended">
          <div className="stat-value">
            {manageUserStats?.totalStudents || "NaN"}
          </div>
          <div className="stat-label">Total Students</div>
        </div>
        <div className="stat-card new">
          <div className="stat-value">
            {manageUserStats?.usersLastWeek || "NaN"}
          </div>
          <div className="stat-label">Users Last Week</div>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="select-all-checkbox" />
              </th>
              <th>User</th>
              <th>ID Number</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {manageUserStats?.studentUsers?.length > 0 ? (
              manageUserStats.studentUsers.map((studentUser, index) =>
                studentUser.role === "student" ? (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        className="user-checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUsersPicked((prev) => [...prev, studentUser]);
                          } else {
                            setUsersPicked((prev) =>
                              prev.filter(
                                (user) => user._id !== studentUser._id
                              )
                            );
                          }
                        }}
                      />
                    </td>
                    <td>
                      <div className="user-info">
                        <div
                          className="user-avatar"
                          style={{
                            backgroundImage: `url(${backendLocation}${studentUser.profileImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 3,
                          }}
                        ></div>
                        <div
                          className="user-name"
                          style={{ fontFamily: "CalibreRegular" }}
                        >
                          {studentUser.fullName}
                        </div>
                      </div>
                    </td>
                    <td>{studentUser.idNumber}</td>
                    <td>{studentUser.email}</td>
                    <td>Student</td>
                    {/* <td>
                      <span
                        className={`status-badge ${
                          studentUser.active ? "active" : "bg-warning"
                        }`}
                        style={{ color: !studentUser.active ? "yellow" : "" }}
                      >
                        {studentUser.active ? "Active" : "Offline"}
                      </span>
                    </td> */}
                    <td>{formatDateAndHandleErrors(studentUser.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn delete"
                          onClick={() =>
                            handleDeleteSingleUser(studentUser._id)
                          }
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : null // If role is not student, return null
              )
            ) : (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#888",
                    fontStyle: "italic",
                  }}
                >
                  No Students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bulk-actions">
        <div className="selected-count">
          {usersPicked.length || "0"} users selected
        </div>
        <div className="bulk-buttons">
          <button
            className="bulk-btn delete-selected"
            onClick={handleDeleteSelectedUsers}
          >
            Delete Selected
          </button>
        </div>
      </div>

      {/* User Details Modal */}
      <div
        className="user-modal"
        style={{ display: myDataBox ? "flex" : "none" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>User Details</h3>
            <button className="close-modal" onClick={() => setMyDataBox(false)}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <div className="user-profile-header">
              <div
                className="large-avatar"
                style={{
                  backgroundImage: `url(${backendLocation}${user?.profileImage})`,
                }}
              ></div>
              <div className="user-profile-info">
                <h2 className="profile-name">{user?.fullName}</h2>
                <div className="profile-id">
                  {user?.idNumber || "CSC/2020/001"}
                </div>
                <div className="profile-email">{user?.email}</div>
              </div>
            </div>
            <div className="user-details-section">
              <h4>Account Information</h4>
              <div className="details-grid">
                <div className="detail-item">
                  <div className="detail-label">Status</div>
                  <div className="detail-value">Active</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Role</div>
                  <div className="detail-value">Admin</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Joined Date</div>
                  <div className="detail-value">
                    {formatDateAndHandleErrors(user?.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-btn edit-user">Edit User</button>
            <button className="modal-btn suspend-user">Suspend Account</button>
            <button className="modal-btn delete-user">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
