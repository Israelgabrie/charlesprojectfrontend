import React, { useEffect, useState } from "react";
import "../css/manageRequests.css";
import { getPendingPosts, approvePosts, deletePost } from "../backendOperation";
import { useUser } from "../userContext";
import { toast } from "react-toastify";

export default function ManageRequests() {
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchPendingPosts();
    }
  }, [user?.id]);

  const fetchPendingPosts = async () => {
    setLoading(true);
    const data = await getPendingPosts({ id: user.id });
    if (data.success) {
      setPosts(data.posts);
    } else {
      toast.error(data.message || "Failed to fetch posts");
    }
    setLoading(false);
  };

  const handleApprove = async (postId) => {
    toast.info("Approving post...");
    const data = await approvePosts({ adminId: user.id, postId });
    if (data.success) {
      setPosts(data.remainingPendingPosts);
      toast.success("Post approved successfully.");
    } else {
      toast.error(data.message || "Failed to approve post");
    }
  };

  const handleDelete = async (postId) => {
    toast.info("Deleting post...");
    const data = await deletePost({ adminId: user.id, postId });
    if (data.success) {
      setPosts(data.remainingPendingPosts);
      toast.success("Post deleted successfully.");
    } else {
      toast.error(data.message || "Failed to delete post");
    }
  };

  return (
    <div className="manage-requests-container" style={{ overflow: "scroll" }}>
      <div className="requests-header">
        <h2>Manage Post Requests</h2>
      </div>

      {loading ? (
        <div>Loading posts...</div>
      ) : posts.length === 0 ? (
        <div>No pending posts to review.</div>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post" style={{ backgroundColor: "white",width:"80%",margin:"auto" }}>
            <div className="postTopBar">
              <div className="postTopBarRightSide">
                <div className="posterImage">
                  {post.author?.profilePic && (
                    <img src={post.author.profilePic} alt="profile" />
                  )}
                </div>
                <div className="posterDetails">
                  <div className="posterName" style={{ fontFamily: "CalibreBold", fontSize: 18 }}>
                    {post.author?.fullName}
                  </div>
                  <div className="matricNumber" style={{ fontSize: 16 }}>
                    {post.author?.idNumber}
                  </div>
                </div>
              </div>
              <div className="postTopSideLeftSide">
                <div className="postTopSideTime">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
                <div className="postStatus">{post.status || "Pending"}</div>
              </div>
            </div>

            <div className="postText" style={{ fontSize: 17, fontFamily: "CalibreRegular" }}>
              {post.content}
            </div>

            {post.image && (
              <div
                className="postImage"
                style={{
                  backgroundImage: `url("http://localhost:4200${post.image}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "400px",
                  width: "400px",
                  margin:"auto"
                }}
              />
            )}

            {post.video &&
              typeof post.video === "string" &&
              post.video.trim() !== "" && (
                <div className="postVideo">
                  <video controls width="100%">
                    <source
                      src={`http://localhost:4200${post.video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

            <div className="postActionBar">
              <button className="approveBtn" onClick={() => handleApprove(post._id)}>
                ✅ Approve
              </button>
              <button className="deleteBtn" onClick={() => handleDelete(post._id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
