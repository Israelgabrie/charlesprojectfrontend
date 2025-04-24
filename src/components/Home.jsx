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
import "../css/home.css";
import { getTimeAgo } from "../helperFuntions.js";
import {
  CancelXIcon,
  CommentIcon,
  LikeIcon,
  SaveIcon,
  ShareIcon,
} from "../SvgComponents";

export default function Home({}) {
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
  const searchValue = queryParams.get("search"); // "izzy"

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
  



  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", overflow: "hidden" }}>
      <div className="postsContainer" style={{ overflowY: "scroll", height: "500px", width: "55%" }}>
        {loading ? (
          <div>Loading posts...</div>
        ) : filteredFeed.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          filteredFeed.map((post) => {
            const isLiked = post.likes?.includes(user.id);
            const isSaved = savedPosts.includes(post._id);
            return (
              <div key={post._id} className="post" style={{ backgroundColor: "white" }}>
                {/* Post Header */}
                <div className="postTopBar">
                  <div className="postTopBarRightSide">
                    <div className="posterImage" >
                      {post.author?.profileImage && (                
                        <div style={{backgroundImage:`url(${backendLocation}${post.author?.profileImage})`, backgroundSize:"cover",width: 40, height: 40,borderRadius:0}} alt="profile" ></div>
                      )}
                    </div>
                    <div className="posterDetails">
                      <div className="posterName">{post.author?.fullName || "Unknown"}</div>
                      {post.author?._id !== user.id && (
                        <div className="followBtn" onClick={() => handleFollow(post.author._id)} style={{ cursor: "pointer", color: followedUsers[post.author._id] ? "black" : "white" }}>
                          {followedUsers[post.author._id] ? "Unfollow" : "Follow"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="postTopSideLeftSide">
                    <div className="postTopSideTime">{getTimeAgo(post.createdAt)}</div>
                    
                  </div>
                </div>

                <div className="postText">{post.content}</div>

                {post.image && (
                  <div
                    className="postImage"
                    style={{
                      backgroundImage: `url("${backendLocation}${post.image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "400px",
                      width: "100%",
                    }}
                  />
                )}

                {post.video && typeof post.video === "string" && post.video.trim() !== "" && (
                  <div className="postVideo">
                    <video controls width="100%">
                      <source src={`${backendLocation}${post.video}`} type="video/mp4" />
                    </video>
                  </div>
                )}

                <div className="postActionBar" style={{ gap: 10 }}>
                  <div className="postActionBox" onClick={() => handleLike(post._id)} style={{ cursor: "pointer" }}>
                    <LikeIcon color={isLiked ? "black" : "white"} />
                    <div className="postActionTextDetails">{post.likes?.length || 0}</div>
                  </div>
                  <div className="postActionBox" onClick={() => handleCommentIconClick(post._id)}>
                    <CommentIcon />
                    <div className="postActionTextDetails">{post.comments?.length || 0}</div>
                  </div>
                  <div className="postActionBox" onClick={() => handleSave(post._id)} style={{ cursor: "pointer" }}>
                    <SaveIcon color={isSaved ? "black" : "white"} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="commentsContainer" style={{ width: "45%", height: "500px" }}>
          <div className="commentSectionTop">
            <div className="postCommentHead">Comment Section</div>
            <span onClick={() => setShowComments(false)} style={{ cursor: "pointer" }}>
              <CancelXIcon />
            </span>
          </div>
          <div className="commentsBox" style={{ height: "78%", overflowY: "scroll", padding: "10px" }}>
            {commentLoading ? (
              <div style={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
                <ClipLoader size={30} />
              </div>
            ) : !Array.isArray(comments) || comments.length === 0 ? (
              <div>No comments yet.</div>
            ) : (
              comments.map((comment, index) => (
                <div className="comment" key={comment._id || index}>
                  <div className="commentBoxTop">
                    <div className="posterImage"></div>
                    <div className="commentBoxDetails">
                      <div className="commentBoxName">{comment.user?.fullName || "Unknown"}</div>
                      <div className="commentBoxTme">{getTimeAgo(comment.createdAt)}</div>
                    </div>
                  </div>
                  <div className="commentText">{comment.comment}</div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddComment} style={{ display: "flex", gap: 10, padding: "10px" }}>
            <input
              className="form-control"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment"
            />
            <button className="navBarBtn btn" type="submit">+</button>
          </form>
        </div>
      )}
    </div>
  );
}
