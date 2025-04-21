import React, { useState } from 'react';
import "../css/addPost.css";
import { CancelXIcon } from "../SvgComponents";
import { useUser } from '../userContext';
import { requestPost } from '../backendOperation';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function AddPost() {
  const { user } = useUser();
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && (selected.type.startsWith("image/") || selected.type.startsWith("video/"))) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    } else {
      toast.error("Only image and video files are allowed.");
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    if (!postText && !file) {
      toast.error("Post cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.append("author", user.id);
    formData.append("content", postText);
    formData.append("privacy", privacy);
    if (file) formData.append("media", file);

    const toastId = toast.loading("Posting...");

    console.log(formData)
    const response = await requestPost(formData);

    toast.dismiss(toastId);
    if (response.success) {
      toast.success("Post created!");
      navigate("/homepage/home");
    } else {
      toast.error(response?.error?.message || "Failed to create post.");
    }
  };

  return (
    <div className="addPostContainer">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="addPostHeader">
        <h2>Create New Post</h2>
      </div>

      <div className="postForm">
        <div className="userInfoSection">
          <div className="posterImage"></div>
          <div className="posterDetails">
            <div className="posterName">{user.fullName}</div>
            <select className="privacySelector" value={privacy} onChange={e => setPrivacy(e.target.value)}>
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
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          ></textarea>

          {preview && (
            <div className="imagePreviewContainer">
              <button type="button" className="removeImageBtn" onClick={removeFile}>
                <CancelXIcon />
              </button>
              {file.type.startsWith("image/") ? (
                <img src={preview} alt="preview" className="imagePreview" />
              ) : (
                <video src={preview} controls className="imagePreview" />
              )}
            </div>
          )}
        </div>

        <div className="attachmentOptions">
          <div className="attachmentLabel">Add to your post:</div>
          <div className="attachmentButtons">
            <label className="attachmentButton">
              <div className="iconWrapper">Photo/Video</div>
              <input type="file" accept="image/*,video/*" hidden onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <div className="formActions">
          <button type="button" className="postButton" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
