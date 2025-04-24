import React, { useState } from "react";
import "../css/settings.css";
import { changePassword, addProfilePic } from "../backendOperation";
import { useUser } from "../userContext";
import { toast } from "react-toastify";

export default function Settings() {
  const { user, setUser } = useUser();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
    try {
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
      toast.dismiss();
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="settingsContainer">
      <h1 className="settingsTitle">Account Settings</h1>

      {/* Change Password Section */}
      <div className="settingsSection">
        <h2 className="sectionTitle">Change Password</h2>
        <div className="sectionContent">
          <form className="passwordForm" onSubmit={handlePasswordChange}>
            <div className="formGroup">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                className="formInput"
                placeholder="Enter your current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="formGroup">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                className="formInput"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="passwordRequirements">
                Password must be at least 8 characters long and include a mix of
                letters, numbers, and symbols.
              </div>
            </div>

            <div className="formGroup">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="formInput"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {error && <div className="passwordMismatch">{error}</div>}
            </div>

            <button type="submit" className="saveButton">
              Save Changes
            </button>
          </form>
        </div>
      </div>

      {/* Change Profile Image Section */}
      <div className="settingsSection">
        <h2 className="sectionTitle">Profile Picture</h2>
        <div className="sectionContent imageSection">
          <div className="currentImageContainer">
            <div className="profileImagePreview">
              <div
                className="profileImage"
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
            <div className="imageInfo">
              <h3 className="imageTitle">Current Profile Picture</h3>
              <p className="imageDescription">
                Your profile picture appears on your profile page and in your
                posts across the platform.
              </p>
            </div>
          </div>

          <div className="imageUploadControls">
            <div className="uploadButtonContainer">
              <label htmlFor="imageUpload" className="uploadButton">
                Choose New Image
                <input
                  type="file"
                  id="imageUpload"
                  className="hiddenInput"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <span className="fileRequirements">
                JPG, PNG or GIF. Maximum size 5MB.
              </span>
            </div>

            <div className="imageActionButtons">
              <button className="saveImageButton" onClick={handleSaveImage}>
                Save New Image
              </button>
              <button
                className="cancelButton"
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

      {/* Deactivate Account Section */}
      <div className="settingsSection dangerZone">
        <h2 className="sectionTitle">Deactivate Account</h2>
        <div className="sectionContent">
          <div className="warningText">
            Deactivating your account will hide your profile and posts until you
            log back in.
          </div>
          <button className="deactivateButton" onClick={(()=>{
            toast.info("Feature Not Availabe ")
          })}>Deactivate My Account</button>
        </div>
      </div>
    </div>
  );
}
