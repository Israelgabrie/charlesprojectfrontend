import React , {useState,useEffect} from 'react';
import "../css/profile.css";
import { useUser } from '../userContext';
import { formatDate } from '../helperFuntions';
import { getUserStats } from '../backendOperation';

export default function Profile() {
  const {user,setUser} = useUser();
  const [userStats,setUserStats] = useState({followerCount:"NaN",followingCount:"NaN",postCount:"NaN"})
  console.log(user)
  

  useEffect(()=>{
    const fetchUser = async () => {
      const response = await getUserStats({ userId: user.id });
      if (response.success) {
       setUserStats(response.stats)
      } else {
        console.error("Failed to fetch user data:", response.error);
      }
    };
    fetchUser();
  },[])
  

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <div className="coverPhoto"></div>
        <div className="profilePhotoContainer">
          <div className="profilePhoto"></div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
              Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
              rhoncus ut eleifend nibh porttitor.
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
        
        <div className="actionButtons">
          <button className="editProfileBtn">Edit Profile</button>
          <button className="shareProfileBtn">Share Profile</button>
        </div>
      </div>
      
      <div className="profileTabs">
        <div className="tabItem active">Posts</div>
        <div className="tabItem">Photos</div>
        <div className="tabItem">Saved</div>
        <div className="tabItem">Tagged</div>
      </div>
      
      <div className="profileContent">
        <div className="emptyState">
          <div className="emptyStateIcon">📷</div>
          <h3 className="emptyStateTitle">No Posts Yet</h3>
          <p className="emptyStateText">When you create posts, they will appear here.</p>
        </div>
      </div>
    </div>
  );
}