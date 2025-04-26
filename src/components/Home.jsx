import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getUserFeed,
  addComment,
  getComments,
  followUser,
  unFollowUser,
  addLike,
  backendLocation,
  savePost,
  socket,
} from "../backendOperation";
import { useUser } from "../userContext";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { getTimeAgo } from "../helperFuntions.js";
import {
  CancelXIcon,
  CommentIcon,
  LikeIcon,
  SaveIcon,
  ShareIcon,
} from "../SvgComponents";
import "../css/home.css";

export default function Home() {
  const { user } = useUser();
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [followedUsers, setFollowedUsers] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [filteredFeed, setFilteredFeed] = useState([]);

  const location = useLocation();

  // Use URLSearchParams to get query params
  const queryParams = new URLSearchParams(location.search);
  const searchValue = queryParams.get("search");

  useEffect(() => {
    if (user?.following?.length) {
      const map = {};
      user.following.forEach((follow) => {
        const id = typeof follow === "string" ? follow : follow._id;
        map[id] = true;
      });
      setFollowedUsers(map);
    }
  }, [user]);

  useEffect(() => {
    const fetchFeed = async () => {
      if (!user?.id) return;
      setLoading(true);
      const data = await getUserFeed({ id: user.id });

      if (data.success) {
        setFeed(data.feed || []);
        setSavedPosts(data.savedPosts || []);
      } else {
        toast.error(data.message || "Failed to load feed");
      }

      setLoading(false);
    };

    fetchFeed();
  }, [user?.id]);

  const handleCommentIconClick = async (postId) => {
    setCurrentPost(postId);
    setShowComments(true);
    setCommentLoading(true);
    const data = await getComments({ postId });
    if (data.success) {
      setComments(data.comments || []);
      setCommentText("");
    } else {
      toast.error(data.message || "Could not load comments");
    }
    setCommentLoading(false);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const loadingToast = toast.loading("Posting comment...");
    const data = await addComment({
      postId: currentPost,
      text: commentText,
      commenter: user.id,
    });

    if (data.success) {
      toast.update(loadingToast, {
        render: "Comment added",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setComments(data.comments || []);
      setCommentText("");
    } else {
      toast.update(loadingToast, {
        render: data.message || "Failed to add comment",
        type: "error",
        isLoading: false,
      });
    }
  };

  const handleFollow = async (targetUserId) => {
    const isFollowing = followedUsers[targetUserId];
    const toastId = toast.loading(
      isFollowing ? "Unfollowing user..." : "Following user..."
    );

    const response = isFollowing
      ? await unFollowUser({ followerId: user.id, targetId: targetUserId })
      : await followUser({ followerId: user.id, targetId: targetUserId });

    if (response.success) {
      toast.update(toastId, {
        render: isFollowing ? "User unfollowed!" : "User followed!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setFollowedUsers((prev) => ({
        ...prev,
        [targetUserId]: !isFollowing,
      }));
    } else {
      toast.update(toastId, {
        render: response.message || "Follow/unfollow failed",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleLike = async (postId) => {
    const result = await addLike({ postId, userId: user.id });
    if (result.success) {
      setFeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.includes(user.id)
                  ? post.likes.filter((id) => id !== user.id)
                  : [...post.likes, user.id],
              }
            : post
        )
      );
    } else {
      toast.error(result.message || "Failed to like post");
    }
  };

  const handleSave = async (postId) => {
    const toastId = toast.loading("Saving post...");
    const result = await savePost({ postId, userId: user.id });
    if (result.success) {
      toast.update(toastId, {
        render: savedPosts.includes(postId) ? "Post unsaved!" : "Post saved!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setSavedPosts(result.savedPosts || []);
    } else {
      toast.update(toastId, {
        render: result.message || "Failed to save post",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    if (searchValue) {
      const filtered = feed.filter((post) => {
        const name = post.author?.fullName || "";
        return name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredFeed(filtered);
    } else {
      setFilteredFeed(feed);
    }
  }, [feed, searchValue]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div className="feed-layout">
      <div className="feed-posts-container">
        {loading ? (
          <div className="feed-loading">
            <ClipLoader size={40} color="#6366f1" />
            <p>Loading posts...</p>
          </div>
        ) : filteredFeed.length === 0 ? (
          <div className="feed-empty">No posts found.</div>
        ) : (
          filteredFeed.map((post) => {
            const isLiked = post.likes?.includes(user.id);
            const isSaved = savedPosts.includes(post._id);
            return (
              <div key={post._id} className="feed-post">
                {/* Post Header */}
                <div className="feed-post-header">
                  <div className="feed-post-user">
                    <div className="feed-user-avatar">
                      {post.author?.profileImage && (
                        <div
                          className="feed-avatar-image"
                          style={{
                            backgroundImage: `url(${backendLocation}${post.author?.profileImage})`,
                          }}
                        ></div>
                      )}
                    </div>
                    <div className="feed-user-info">
                      <div className="feed-user-name">
                        {post.author?.fullName || "Unknown"}
                      </div>
                      {post.author?._id !== user.id && (
                        <button
                          className={`feed-follow-btn ${
                            followedUsers[post.author._id] ? "following" : ""
                          }`}
                          onClick={() => handleFollow(post.author._id)}
                        >
                          {followedUsers[post.author._id]
                            ? "Unfollow"
                            : "Follow"}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="feed-post-meta">
                    <div className="feed-post-time">
                      {getTimeAgo(post.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="feed-post-content">{post.content}</div>

                {post.image && (
                  <div
                    className="feed-post-image"
                    style={{
                      backgroundImage: `url("${backendLocation}${post.image}")`,
                    }}
                  />
                )}

                {post.video &&
                  typeof post.video === "string" &&
                  post.video.trim() !== "" && (
                    <div className="feed-post-video">
                      <video controls width="100%">
                        <source
                          src={`${backendLocation}${post.video}`}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}

                <div className="feed-post-actions">
                  <button
                    className={`feed-action-btn ${isLiked ? "active" : ""}`}
                    onClick={() => handleLike(post._id)}
                  >
                    <LikeIcon color={isLiked ? "#6366f1" : "#666"} />
                    <span className="feed-action-count">
                      {post.likes?.length || 0}
                    </span>
                  </button>
                  <button
                    className="feed-action-btn"
                    onClick={() => handleCommentIconClick(post._id)}
                  >
                    <CommentIcon />
                    <span className="feed-action-count">
                      {post.comments?.length || 0}
                    </span>
                  </button>
                  <button
                    className={`feed-action-btn ${isSaved ? "active" : ""}`}
                    onClick={() => handleSave(post._id)}
                  >
                    <SaveIcon color={isSaved ? "#6366f1" : "#666"} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="feed-comments-container">
          <div className="feed-comments-header">
            <h3 className="feed-comments-title">Comments</h3>
            <button
              className="feed-close-btn"
              onClick={() => setShowComments(false)}
            >
              <CancelXIcon />
            </button>
          </div>
          <div className="feed-comments-list">
            {commentLoading ? (
              <div className="feed-comments-loading">
                <ClipLoader size={30} color="#6366f1" />
              </div>
            ) : !Array.isArray(comments) || comments.length === 0 ? (
              <div className="feed-comments-empty">No comments yet.</div>
            ) : (
              comments.map((comment, index) => (
                <div className="feed-comment" key={comment._id || index}>
                  <div className="feed-comment-header">
                    <div
                      className="feed-comment-avatar"
                      style={{
                        backgroundImage: `url(${backendLocation}${comment?.profileImage})`,
                        backgroundPosition:"center",
                        backgroundSize:"cover"
                      }}
                    ></div>
                    <div className="feed-comment-meta">
                      <div className="feed-comment-name">
                        {comment?.fullName || "Unknown"}
                      </div>
                      <div className="feed-comment-time">
                        {getTimeAgo(comment.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="feed-comment-content">{comment.comment}</div>
                </div>
              ))
            )}
          </div>

          <form className="feed-comment-form" onSubmit={handleAddComment}>
            <input
              className="feed-comment-input"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <button className="feed-comment-btn" type="submit">
              +
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
