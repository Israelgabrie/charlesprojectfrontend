import React, { useEffect, useState } from 'react';
import "../css/adminDashBoard.css";
import { dashBoardStats } from '../backendOperation';
import { useUser } from '../userContext';
import { toast } from 'react-toastify';


export default function AdminDashboard() {
    const {user,setUser} = useUser();
    const [stats,setStats] = useState({ totalUsers:"Nan", totalPosts: "Nan",  pendingPosts: "Nan", totalReports: "Nan" });

    useEffect(()=>{
        try{
            const toastId = toast.loading("Loading Dashboard Stats...");
            const fetchStats = async () => {
                const response = await dashBoardStats({userId: user.id});
                console.log(response);
                if(response.success){
                    setStats(response.stats);
                    toast.dismiss(toastId);
                }else{
                    toast.dismiss(toastId);
                    throw new Error(response.error || "Failed to fetch dashboard stats");
                }
            }
            fetchStats();

        }catch(error){
            toast.dismiss();
            toast.error(error.message)
        }
    },[])


  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="date-display">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className="stats-overview">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
          <div className="stat-change positive">+12% ↑</div>
        </div>

        <div className="stat-card posts">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalPosts}</div>
            <div className="stat-label">Total Posts</div>
          </div>
          <div className="stat-change positive">+8% ↑</div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{stats.pendingPosts}</div>
            <div className="stat-label">Pending Posts</div>
          </div>
          <div className="stat-change negative">+5% ↑</div>
        </div>

        <div className="stat-card reports">
          <div className="stat-icon">🚩</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalReports}</div>
            <div className="stat-label">Reports</div>
          </div>
          <div className="stat-change negative">+3% ↑</div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Recent Activity</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon new-user">👤</div>
              <div className="activity-content">
                <div className="activity-title">New User Registration</div>
                <div className="activity-details">John Doe (CSC/2023/001) joined the platform</div>
                <div className="activity-time">10 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon new-post">📄</div>
              <div className="activity-content">
                <div className="activity-title">New Post Approved</div>
                <div className="activity-details">Campus event announcement by Sarah Williams</div>
                <div className="activity-time">25 minutes ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon report">⚠️</div>
              <div className="activity-content">
                <div className="activity-title">Content Reported</div>
                <div className="activity-details">Post ID #4582 reported for inappropriate content</div>
                <div className="activity-time">1 hour ago</div>
              </div>
            </div>

            <div className="activity-item">
              <div className="activity-icon delete">🗑️</div>
              <div className="activity-content">
                <div className="activity-title">Post Deleted</div>
                <div className="activity-details">Admin removed post by Michael Johnson</div>
                <div className="activity-time">2 hours ago</div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button className="action-btn manage-posts">
              <span className="action-icon">📝</span>
              <span className="action-text">Manage Posts</span>
            </button>
            <button className="action-btn manage-users">
              <span className="action-icon">👥</span>
              <span className="action-text">Manage Users</span>
            </button>
            <button className="action-btn review-reports">
              <span className="action-icon">🚩</span>
              <span className="action-text">Review Reports</span>
            </button>
            <button className="action-btn system-settings">
              <span className="action-icon">⚙️</span>
              <span className="action-text">System Settings</span>
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <div className="system-status">
          <div className="status-indicator online"></div>
          System Status: Online
        </div>
        <div className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}