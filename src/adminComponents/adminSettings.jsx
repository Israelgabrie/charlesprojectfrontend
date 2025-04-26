import React, { useState } from "react";
import "../css/adminSettings.css";
import { changePassword, addProfilePic, deleteUsers } from "../backendOperation.js";
import { toast } from "react-toastify";
import { useUser } from "../userContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminSettings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedFile) return toast.error("Please choose an image first.");

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("userId", user.id);

    const toastId = toast.loading("Uploading image...");
    try {
      const response = await addProfilePic(formData);

      if (response.success) {
        toast.update(toastId, {
          render: "Profile picture updated!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setUser((prevUser) => ({ ...prevUser, profilePic: response.profilePic }));
      } else {
        toast.update(toastId, {
          render: response.error || "Failed to update profile picture",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Upload failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const requestObject = {
      userId: user.id,
      currentPassword: oldPassword,
      newPassword,
    };

    const toastId = toast.loading("Changing password...");
    try {
      const response = await changePassword(requestObject);

      if (response.success) {
        toast.update(toastId, {
          render: "Password changed successfully!",
          autoClose: 2000,
          isLoading: false,
          type: "success",
        });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.dismiss(toastId);
        toast.error(response.error || "Failed to change password");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.message || "An error occurred");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your admin account? This cannot be undone.")) {
      return;
    }

    const toastId = toast.loading("Deleting account...");
    try {
      const response = await deleteUsers({ userId: user.id });

      if (response.message) {
        toast.update(toastId, {
          render: "Account deleted successfully.",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        setTimeout(() => {
          setUser(null); // Clear the user context
          navigate("/login"); // Redirect to login
        }, 2000);
      } else {
        toast.update(toastId, {
          render: response.error || "Failed to delete account",
          type: "error",
          isLoading: false,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Error deleting account",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="adminSettingsContainer">
      <h1 className="adminSettingsTitle">Admin Account Settings</h1>

      {/* Change Password Section */}
      <div className="adminSettingsSection">
        <h2 className="adminSectionTitle">Change Password</h2>
        <div className="adminSectionContent">
          <form className="adminPasswordForm" onSubmit={handlePasswordChange}>
            <div className="adminFormGroup">
              <label htmlFor="adminOldPassword">Old Password</label>
              <input
                type="password"
                id="adminOldPassword"
                className="adminFormInput"
                placeholder="Enter your current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="adminFormGroup">
              <label htmlFor="adminNewPassword">New Password</label>
              <input
                type="password"
                id="adminNewPassword"
                className="adminFormInput"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="adminPasswordRequirements">
                Password must be at least 8 characters long and include letters, numbers, and symbols.
              </div>
            </div>

            <div className="adminFormGroup">
              <label htmlFor="adminConfirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="adminConfirmPassword"
                className="adminFormInput"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="adminSaveButton">
              Save Password
            </button>
          </form>
        </div>
      </div>

      {/* Change Profile Picture Section */}
      <div className="adminSettingsSection">
        <h2 className="adminSectionTitle">Profile Picture</h2>
        <div className="adminSectionContent adminImageSection">
          <div className="adminCurrentImageContainer">
            <div className="adminProfileImagePreview">
              <div
                className="adminProfileImage"
                style={{
                  backgroundImage: selectedImage
                    ? `url(${selectedImage})`
                    : user.profilePic
                    ? `url(${user.profilePic})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="adminImageInfo">
              <h3 className="adminImageTitle">Current Profile Picture</h3>
              <p className="adminImageDescription">
                This picture represents you across the platform as an admin.
              </p>
            </div>
          </div>

          <div className="adminImageUploadControls">
            <div className="adminUploadButtonContainer">
              <label htmlFor="adminImageUpload" className="adminUploadButton">
                Choose New Image
                <input
                  type="file"
                  id="adminImageUpload"
                  className="adminHiddenInput"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <span className="adminFileRequirements">
                JPG, PNG, or GIF. Maximum size 5MB.
              </span>
            </div>

            <div className="adminImageActionButtons">
              <button className="adminSaveImageButton" onClick={handleSaveImage}>
                Save New Image
              </button>
              <button
                className="adminCancelButton"
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone Section */}
      <div className="adminSettingsSection adminDangerZone">
        <h2 className="adminSectionTitle">Danger Zone</h2>
        <div className="adminSectionContent">
          <div className="adminWarningText">
            Deleting or deactivating your admin account is a serious action. Please proceed with caution.
          </div>
          <button className="adminDeactivateButton" onClick={handleDeleteAccount}>
            Delete Admin Account
          </button>
        </div>
      </div>
    </div>
  );
}
