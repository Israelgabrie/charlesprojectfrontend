import React, { useState, useEffect } from "react";
import "../css/profile.css";
import { useUser } from "../userContext";
import { formatDate, getTimeAgo } from "../helperFuntions";
import {
  getUserStats,
  getUserPosts,
  getSavedPosts,
  backendLocation,
} from "../backendOperation";

export default function Profile() {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);
  const [userSavedPosts, setSavedUserPosts] = useState([]);
  const [profileState, setProfileState] = useState("posts");
  const [userStats, setUserStats] = useState({
    followerCount: "NaN",
    followingCount: "NaN",
    postCount: "NaN",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserStats({ userId: user.id });
      if (response.success) {
        setUserStats(response.stats);
      } else {
        console.error("Failed to fetch user data:", response.error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    async function getUserPostsFunc() {
      const response = await getSavedPosts({ userId: user.id });
      const userPostsResponse = await getUserPosts({ userId: user.id });
      setSavedUserPosts(response.savedPosts);
      setUserPosts(userPostsResponse.posts);
    }
    getUserPostsFunc();
  }, []);

  const renderPosts = (posts) => {
    console.log(posts);
    return posts?.length > 0 ? (
      posts?.map((post) => (
        <div
          key={post._id}
          className="post"
          style={{ backgroundColor: "white", width: "75%",marginLeft:"auto",marginRight:"auto" }}
        >
          {/* Post Header */}
          <div className="postTopBar">
            <div className="postTopBarRightSide">
              <div className="posterImage">
                {post.author?.profileImage && (
                  <div
                    style={{
                      backgroundImage: `url(${backendLocation}${post.author?.profileImage})`,
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      backgroundSize:"cover",
                      backgroundPosition:"center"
                    }}
                  ></div>
                )}
              </div>
              <div className="posterDetails">
                <div className="posterName">
                  {post.author?.fullName || "Unknown"}
                </div>
              </div>
            </div>
            <div className="postTopSideLeftSide">
              <div className="postTopSideTime">
                {getTimeAgo(post.createdAt)}
              </div>
            </div>
          </div>

          <div className="postText">{post?.content}</div>

          {post?.image && (
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

          {post?.video &&
            typeof post.video === "string" &&
            post?.video.trim() !== "" && (
              <div className="postVideo">
                <video controls width="100%">
                  <source
                    src={`${backendLocation}${post.video}`}
                    type="video/mp4"
                  />
                </video>
              </div>
            )}
        </div>
      ))
    ) : (
      <div className="emptyState">
        <div className="emptyStateIcon">📷</div>
        <h3 className="emptyStateTitle">No Posts Yet</h3>
        <p className="emptyStateText">
          When you create posts, they will appear here.
        </p>
      </div>
    );
  };

  return (
    <div className="profileContainer" >
      <div className="profileHeader">
        <div
          className="coverPhoto"
          style={{
            backgroundImage: `url(${backendLocation}${user.profileImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: 3,
          }}
        ></div>
        <div className="profilePhotoContainer">
          <div
            style={{
              backgroundImage: `url(${backendLocation}${user.profileImage})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: 3,
            }}
            className="profilePhoto"
          ></div>
        </div>
      </div>

      <div className="profileContent">
        <div className="profileInfo">
          <h1 className="fullName">{user?.fullName}</h1>
          <div className="userDetails">
            <div className="detailItem">
              <span className="detailLabel">Matric Number:</span>
              <span className="detailValue">{user?.idNumber}</span>
            </div>
            <div className="detailItem">
              <span className="detailLabel">Email:</span>
              <span className="detailValue">{user?.email}</span>
            </div>
            <div className="detailItem">
              <span className="detailLabel">Date Joined:</span>
              <span className="detailValue">{formatDate(user?.createdAt)}</span>
            </div>
          </div>

          <div className="bioSection">
            <h3 className="bioHeading">Bio</h3>
            <p className="bioText">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
          </div>
        </div>

        <div className="statsContainer">
          <div className="statBox">
            <span className="statNumber">{userStats.postCount}</span>
            <span className="statLabel">Posts</span>
          </div>
          <div className="statBox">
            <span className="statNumber">{userStats.followerCount}</span>
            <span className="statLabel">Followers</span>
          </div>
          <div className="statBox">
            <span className="statNumber">{userStats.followingCount}</span>
            <span className="statLabel">Following</span>
          </div>
        </div>
      </div>

      <div className="profileTabs">
        <div
          className={`tabItem ${profileState === "posts" ? "active" : ""}`}
          onClick={() => setProfileState("posts")}
        >
          Posts
        </div>
        <div
          className={`tabItem ${profileState === "saved" ? "active" : ""}`}
          onClick={() => setProfileState("saved")}
        >
          Saved
        </div>
      </div>

      <div className="profileContent">
        {profileState === "posts"
          ? renderPosts(userPosts)
          : renderPosts(userSavedPosts)}
      </div>
    </div>
  );
}
