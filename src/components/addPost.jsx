import React from 'react';
import "../css/addPost.css";
import { CancelXIcon } from "../SvgComponents";

export default function AddPost() {
  return (
    <div className="addPostContainer">
      <div className="addPostHeader">
        <h2>Create New Post</h2>
      </div>
      
      <div className="postForm">
        <div className="userInfoSection">
          <div className="posterImage"></div>
          <div className="posterDetails">
            <div className="posterName">Your Name</div>
            <select className="privacySelector">
              <option value="public">Public</option>
              <option value="friends">Friends</option>
              <option value="private">Private</option>
            </select>
          </div>
        </div>
        
        <div className="postContentSection">
          <textarea 
            className="postTextArea" 
            placeholder="What's on your mind?"
          ></textarea>
          
          <div className="imagePreviewContainer">
            <button type="button" className="removeImageBtn">
              <CancelXIcon />
            </button>
            <div className="imagePreview"></div>
          </div>
        </div>
        
        <div className="attachmentOptions">
          <div className="attachmentLabel">Add to your post:</div>
          <div className="attachmentButtons">
            <div className="attachmentButton">
              <div className="iconWrapper">
                Photo
              </div>
            </div>
            
            <div className="attachmentButton">
              <div className="iconWrapper">
                Video
              </div>
            </div>
            
            <div className="attachmentButton">
              <div className="iconWrapper">
                Link
              </div>
            </div>
            
            <div className="attachmentButton">
              <div className="iconWrapper">
                Feeling
              </div>
            </div>
          </div>
        </div>
        
        <div className="formActions">
          <button type="button" className="postButton">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}