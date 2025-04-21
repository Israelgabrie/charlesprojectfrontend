import React, { useEffect, useState } from 'react';
import "../css/discover.css";
import {
  discoverApi,
  unFollowUser,
  followUser,
  approveFollow
} from "../backendOperation";
import { toast } from 'react-toastify';
import { useUser } from '../userContext';

export default function Discover() {
  const { user } = useUser();
  const [discoverData, setDiscoverData] = useState(null);

  const fetchDiscover = async () => {
    const toastId = toast.loading("Loading discover data...");
    try {
      const data = await discoverApi({ userId: user.id });
      console.log(data);
      setDiscoverData(data);
      toast.update(toastId, {
        render: "Discover data loaded",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(toastId, {
        render: "Failed to load discover data.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchDiscover();
  }, []);

  const handleCancelRequest = async (targetId) => {
    const toastId = toast.loading("Cancelling request...");
    const res = await unFollowUser({ targetId });
    toast.update(toastId, {
      render: res.error || "Request cancelled.",
      type: res.error ? "error" : "success",
      isLoading: false,
      autoClose: 2000,
    });
    if (!res.error) fetchDiscover();
  };

  const handleAccept = async (targetId) => {
    const toastId = toast.loading("Accepting request...");
    const res = await approveFollow({ targetId });
    toast.update(toastId, {
      render: res.error || "Request accepted!",
      type: res.error ? "error" : "success",
      isLoading: false,
      autoClose: 2000,
    });
    if (!res.error) fetchDiscover();
  };

  const handleReject = async (targetId) => {
    const toastId = toast.loading("Rejecting request...");
    const res = await unFollowUser({ targetId });
    toast.update(toastId, {
      render: res.error || "Request rejected.",
      type: res.error ? "error" : "success",
      isLoading: false,
      autoClose: 2000,
    });
    if (!res.error) fetchDiscover();
  };

  const handleFollow = async (targetId) => {
    const toastId = toast.loading("Sending follow request...");
    const res = await followUser({ targetId });
    toast.update(toastId, {
      render: res.error || "Request sent!",
      type: res.error ? "error" : "success",
      isLoading: false,
      autoClose: 2000,
    });
    if (!res.error) fetchDiscover();
  };

  if (!discoverData) return <div>Loading...</div>;

  const {
    unapprovedFollowing: receivedRequests = [],
    nonMutualFollowing: sentRequests = [],
    randomUsers: suggestedUsers = [],
  } = discoverData.data || {};

  return (
    <div className="discoverContainer">
      {/* Sent Requests */}
      <div className="requestsSection">
        <h2 className="sectionTitle">Requests You Sent</h2>
        <div className="requestsList">
          {sentRequests.length ? sentRequests.map((user) => (
            <div className="requestItem" key={user._id}>
              <div className="userInfo">
                <div className="userAvatar"></div>
                <div className="userDetails">
                  <div className="userName">{user.fullName}</div>
                  <div className="userMatric">{user.idNumber}</div>
                </div>
              </div>
              <button className="cancelButton" onClick={() => handleCancelRequest(user._id)}>
                Cancel Request
              </button>
            </div>
          )) : (
            <div className="emptyState">📤 You haven't sent any follow requests yet.</div>
          )}
        </div>
      </div>

      {/* Received Requests */}
      <div className="requestsSection">
        <h2 className="sectionTitle">Requests You Received</h2>
        <div className="requestsList">
          {receivedRequests.length ? receivedRequests.map((user) => (
            <div className="requestItem" key={user._id}>
              <div className="userInfo">
                <div className="userAvatar"></div>
                <div className="userDetails">
                  <div className="userName">{user.fullName}</div>
                  <div className="userMatric">{user.idNumber}</div>
                </div>
              </div>
              <div className="actionButtons">
                <button className="acceptButton" onClick={() => handleAccept(user._id)}>Accept</button>
                <button className="rejectButton" onClick={() => handleReject(user._id)}>Reject</button>
              </div>
            </div>
          )) : (
            <div className="emptyState">📥 No new follow requests.</div>
          )}
        </div>
      </div>

      {/* Suggested Users */}
      <div className="requestsSection">
        <h2 className="sectionTitle">People You May Know</h2>
        <div className="requestsList">
          {suggestedUsers.length ? suggestedUsers.map((user) => (
            <div className="requestItem" key={user._id}>
              <div className="userInfo">
                <div className="userAvatar"></div>
                <div className="userDetails">
                  <div className="userName">{user.fullName}</div>
                  {user.idNumber && <div className="userMatric">{user.idNumber}</div>}
                </div>
              </div>
              <button className="followButton" onClick={() => handleFollow(user._id)}>
                Follow
              </button>
            </div>
          )) : (
            <div className="emptyState">No suggestions at the moment.</div>
          )}
        </div>
      </div>
    </div>
  );
}
