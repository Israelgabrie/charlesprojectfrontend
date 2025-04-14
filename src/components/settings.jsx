import React from 'react';
import "../css/settings.css";

export default function Settings() {
  return (
    <div className="settingsContainer">
      <h1 className="settingsTitle">Account Settings</h1>
      
      {/* Change Password Section */}
      <div className="settingsSection">
        <h2 className="sectionTitle">Change Password</h2>
        <div className="sectionContent">
          <form className="passwordForm">
            <div className="formGroup">
              <label htmlFor="oldPassword">Old Password</label>
              <input 
                type="password" 
                id="oldPassword" 
                className="formInput" 
                placeholder="Enter your current password"
              />
            </div>
            
            <div className="formGroup">
              <label htmlFor="newPassword">New Password</label>
              <input 
                type="password" 
                id="newPassword" 
                className="formInput" 
                placeholder="Enter your new password"
              />
              <div className="passwordRequirements">
                Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
              </div>
            </div>
            
            <div className="formGroup">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className="formInput" 
                placeholder="Confirm your new password"
              />
              <div className="passwordMismatch">
                Passwords do not match.
              </div>
            </div>
            
            <button type="submit" className="saveButton">Save Changes</button>
          </form>
        </div>
      </div>
      
      {/* Notification Preferences Section */}
      <div className="settingsSection">
        <h2 className="sectionTitle">Notification Preferences</h2>
        <div className="sectionContent">
          <div className="notificationOption">
            <div className="optionInfo">
              <h3 className="optionTitle">Receive Messages</h3>
              <p className="optionDescription">Get notified when someone sends you a direct message.</p>
            </div>
            <div className="toggleSwitch">
              <input type="checkbox" id="messages" className="toggleInput" defaultChecked />
              <label htmlFor="messages" className="toggleLabel"></label>
            </div>
          </div>
          
          <div className="notificationOption">
            <div className="optionInfo">
              <h3 className="optionTitle">Receive Likes and Comments</h3>
              <p className="optionDescription">Get notified when someone likes or comments on your posts.</p>
            </div>
            <div className="toggleSwitch">
              <input type="checkbox" id="likesComments" className="toggleInput" defaultChecked />
              <label htmlFor="likesComments" className="toggleLabel"></label>
            </div>
          </div>
          
          <div className="notificationOption">
            <div className="optionInfo">
              <h3 className="optionTitle">Receive New Followers</h3>
              <p className="optionDescription">Get notified when someone follows your account.</p>
            </div>
            <div className="toggleSwitch">
              <input type="checkbox" id="followers" className="toggleInput" defaultChecked />
              <label htmlFor="followers" className="toggleLabel"></label>
            </div>
          </div>
          
          <div className="notificationOption">
            <div className="optionInfo">
              <h3 className="optionTitle">Email Notifications</h3>
              <p className="optionDescription">Receive email notifications for important updates.</p>
            </div>
            <div className="toggleSwitch">
              <input type="checkbox" id="email" className="toggleInput" />
              <label htmlFor="email" className="toggleLabel"></label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Deactivate Account Section */}
      <div className="settingsSection dangerZone">
        <h2 className="sectionTitle">Deactivate Account</h2>
        <div className="sectionContent">
          <div className="warningText">
            Deactivating your account will hide your profile and posts until you log back in.
          </div>
          <button className="deactivateButton">Deactivate My Account</button>
        </div>
      </div>
    </div>
  );
}