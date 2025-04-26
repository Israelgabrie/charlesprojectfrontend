import React, { useEffect, useState } from "react";
import "../css/adminDashBoard.css";
import { dashBoardStats } from "../backendOperation";
import { useUser } from "../userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [stats, setStats] = useState({
    totalUsers: "Nan",
    totalPosts: "Nan",
    pendingPosts: "Nan",
    totalReports: "Nan",
    recentActivities: [],
  });

  useEffect(() => {
    try {
      const toastId = toast.loading("Loading Dashboard Stats...");
      const fetchStats = async () => {
        const response = await dashBoardStats({ userId: user.id });
        console.log(response);
        if (response.success) {
          setStats(response.stats);
          toast.dismiss(toastId);
        } else {
          toast.dismiss(toastId);
          throw new Error(response.error || "Failed to fetch dashboard stats");
        }
      };
      fetchStats();
    } catch (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  }, []);

  const getActivityEmoji = (type) => {
    switch (type) {
      case "post":
        return "📝";
      case "comment":
        return "💬";
      case "like":
        return "❤️";
      case "follow":
        return "👥";
      case "report":
        return "🚨";
      case "login":
        return "🔑";
      case "changePassword":
        return "🔒";
      case "newPic":
        return "📸";
      case "delete":
        return "🗑️";   // Added delete
      case "signUp":
        return "🆕";    // Added signUp
      default:
        return "❓";
    }
  };
  

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div className="date-display">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
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
          <div className="stat-icon">🔔</div>
          <div className="stat-content">
            <div className="stat-value">{stats.recentActivities?.length}</div>
            <div className="stat-label">Recents</div>
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
            {stats.recentActivities?.length > 0 ? (
              stats.recentActivities.map((activity, index) => (
                <div
                  className="activity-item"
                  key={index}
                  onClick={() => {
                    if (activity.actionType == "post") {
                      navigate("/admin/manageRequests");
                    }
                  }}
                >
                  <div className="activity-icon new-user">
                    {getActivityEmoji(activity.actionType)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.actionType}</div>
                    <div className="activity-details">
                      {activity.description}
                    </div>
                    <div className="activity-time">
                      {/* Optional formatting: */}
                      {new Date(activity.createdAt).toLocaleString()}
                      {/* {activity.createdAt} */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No activity Found</div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="quick-actions">
            <button
              className="action-btn manage-posts"
              onClick={() => {
                navigate("/admin/manageRequests");
              }}
            >
              <span className="action-icon">📝</span>
              <span className="action-text">Manage Posts</span>
            </button>
            <button
              className="action-btn manage-users"
              onClick={() => {
                navigate("/admin/manageUsers");
              }}
            >
              <span className="action-icon">👥</span>
              <span className="action-text">Manage Users</span>
            </button>
            <button
              className="action-btn review-reports"
              onClick={() => {
                navigate("/admin/manageRequests");
              }}
            >
              <span className="action-icon">🔔</span>
              <span className="action-text">Review Requests</span>
            </button>
            <button
              className="action-btn system-settings"
              onClick={() => {
                navigate("/admin/settings");
              }}
            >
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
