import React, { useEffect, useState } from "react";
import "../css/discover.css";
import {
  approveFollow,
  backendLocation,
  discoverApi,
  followUser,
  socket,
  unFollowUser,
} from "../backendOperation";
import { toast } from "react-toastify";
import { useUser } from "../userContext";
import { useDebounce } from "use-debounce";

export default function Discover() {
  const { user } = useUser();
  const [discoverData, setDiscoverData] = useState(null);
  const [sentSearch, setSentSearch] = useState("");
  const [receivedSearch, setReceivedSearch] = useState("");
  const [nonMutualSearch, setNonMutualSearch] = useState("");
  const [randomUsersSearch, setRandomUsersSearch] = useState("");
  const [debouncedRandomUsersSearch] = useDebounce(randomUsersSearch, 500);
  const [tempRandomUsers, setTempRandomUsers] = useState([]);

  const fetchDiscover = async () => {
    const toastId = toast.loading("Loading discover data...");
    try {
      const data = await discoverApi({ userId: user.id });
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

  useEffect(() => {
    if (debouncedRandomUsersSearch) {
      socket.emit("searchUser", user.id, debouncedRandomUsersSearch, (data) => {
        if (data.success) {
          setTempRandomUsers(data.users);
        } else {
          toast.error(data.message || "Something went wrong");
        }
      });
    } else {
      setTempRandomUsers([]);
    }
  }, [debouncedRandomUsersSearch]);

  if (!discoverData) return <div>Loading...</div>;

  const {
    unapprovedFollowing: sentRequests = [],
    unapprovedFollowers: receivedRequests = [],
    nonMutualFollowing: nonMutualFollowing = [],
    randomUsers: suggestedUsers = [],
  } = discoverData.data || {};

  const filteredSent = sentRequests.filter((user) =>
    user.fullName.toLowerCase().includes(sentSearch.toLowerCase())
  );

  const filteredReceived = receivedRequests.filter((user) =>
    user.fullName.toLowerCase().includes(receivedSearch.toLowerCase())
  );

  const filteredNonMutual = nonMutualFollowing.filter((user) =>
    user.fullName.toLowerCase().includes(nonMutualSearch.toLowerCase())
  );

  async function unFollowAUser(targetId, targetName, isReject) {
    const toastId = toast.loading(
      `${isReject ? "Rejecting" : "Unfollowing"} ${
        targetName || "unknown user"
      }`
    );
    try {
      const requestBody = {
        followerId: isReject ? targetId : user.id,
        targetId: isReject ? user.id : targetId,
      };

      const response = await unFollowUser(requestBody);

      toast.update(toastId, {
        type: response.success ? "success" : "error",
        render: response.message || "Something went wrong",
        isLoading: false,
        autoClose: 2000,
      });

      if (response.success) {
        fetchDiscover();
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Error unfollowing user: ${error.message}`);
    }
  }

  async function approveFollowRequest(targetId) {
    try {
      const toastLoad = toast.loading("Accepting user request...");
      const requestBody = {
        userId: user.id,
        followerId: targetId,
      };

      const response = await approveFollow(requestBody);
      toast.update(toastLoad, {
        autoClose: 2000,
        render: response.message || "Something went wrong",
        type: response.success ? "success" : "error",
        isLoading: false,
      });
      if (response.success) {
        fetchDiscover();
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Error accepting user: ${error.message}`);
    }
  }

  async function followAUser(targetId, targetName) {
    try {
      const toastLoad = toast.loading(`Requesting to follow ${targetName}...`);
      const requestBody = {
        followerId: user.id,
        targetId: targetId,
      };

      const response = await followUser(requestBody);
      toast.update(toastLoad, {
        autoClose: 2000,
        render: response.message || "Something went wrong",
        type: response.success ? "success" : "error",
        isLoading: false,
      });
      if (response.success) {
        fetchDiscover();
      }
    } catch (error) {
      toast.dismiss();
      toast.error(`Error following user: ${error.message}`);
    }
  }

  return (
    <div className="discoverContainer">
      <div className="requestsSection">
        <h2 className="sectionTitle">Requests You Sent</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search sent requests"
          value={sentSearch}
          onChange={(e) => setSentSearch(e.target.value)}
        />
        <div className="requestsList">
          {filteredSent.length ? (
            filteredSent.map((user) => (
              <div className="requestItem" key={user._id}>
                <div className="userInfo">
                  <div
                    className="userAvatar"
                    style={{
                      backgroundImage: `url(${backendLocation}${user.profileImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div className="userDetails">
                    <div className="userName">{user.fullName}</div>
                    <div className="userMatric">{user.idNumber}</div>
                  </div>
                </div>
                <button
                  className="cancelButton"
                  onClick={() => unFollowAUser(user._id, user.fullName)}
                >
                  Cancel Request
                </button>
              </div>
            ))
          ) : (
            <div className="emptyState">📤 No matching sent requests.</div>
          )}
        </div>
      </div>

      {/* Received Requests */}
      <div className="requestsSection">
        <h2 className="sectionTitle">Requests You Received</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search received requests"
          value={receivedSearch}
          onChange={(e) => setReceivedSearch(e.target.value)}
        />
        <div className="requestsList">
          {filteredReceived.length ? (
            filteredReceived.map((user) => (
              <div className="requestItem" key={user._id}>
                <div className="userInfo">
                  <div
                    className="userAvatar"
                    style={{
                      backgroundImage: `url(${backendLocation}${user.profileImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>{" "}
                  <div className="userDetails">
                    <div className="userName">{user.fullName}</div>
                    <div className="userMatric">{user.idNumber}</div>
                  </div>
                </div>
                <div className="actionButtons">
                  <button
                    className="acceptButton"
                    onClick={() => approveFollowRequest(user._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="rejectButton"
                    onClick={() => unFollowAUser(user._id, user.fullName, true)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="emptyState">📥 No matching received requests.</div>
          )}
        </div>
      </div>

      {/* Non-mutual following */}
      <div className="requestsSection">
        <h2 className="sectionTitle">Following But Not Following Back</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search non-mutual following"
          value={nonMutualSearch}
          onChange={(e) => setNonMutualSearch(e.target.value)}
        />
        <div className="requestsList">
          {filteredNonMutual.length ? (
            filteredNonMutual.map((user) => (
              <div className="requestItem" key={user._id}>
                <div className="userInfo">
                  <div
                    className="userAvatar"
                    style={{
                      backgroundImage: `url(${backendLocation}${user.profileImage})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  ></div>{" "}
                  <div className="userDetails">
                    <div className="userName">{user.fullName}</div>
                    <div className="userMatric">{user.idNumber}</div>
                  </div>
                </div>
                <button
                  className="cancelButton"
                  onClick={() => unFollowAUser(user._id, user.fullName)}
                >
                  Unfollow
                </button>
              </div>
            ))
          ) : (
            <div className="emptyState">
              No matching non-mutual connections.
            </div>
          )}
        </div>
      </div>
      {/* Suggested Users */}
      <div className="requestsSection">
        <input
          className="form-control mb-3"
          type="search"
          placeholder="Search (WebSocket-powered)"
          aria-label="Search"
          onChange={(e) => setRandomUsersSearch(e.target.value)}
          value={randomUsersSearch}
        />
        <h2 className="sectionTitle">People You May Know</h2>
        <div className="requestsList">
          {(debouncedRandomUsersSearch ? tempRandomUsers : suggestedUsers)
            .length ? (
            (debouncedRandomUsersSearch ? tempRandomUsers : suggestedUsers).map(
              (user) => (
                <div className="requestItem" key={user._id}>
                  <div className="userInfo">
                    <div
                      className="userAvatar"
                      style={{
                        backgroundImage: `url(${backendLocation}${user.profileImage})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    ></div>{" "}
                    <div className="userDetails">
                      <div className="userName">{user.fullName}</div>
                      {user.idNumber && (
                        <div className="userMatric">{user.idNumber}</div>
                      )}
                    </div>
                  </div>
                  <button
                    className="followButton"
                    onClick={() => followAUser(user._id, user.fullName)}
                  >
                    Follow
                  </button>
                </div>
              )
            )
          ) : (
            <div className="emptyState">No suggestions at the moment.</div>
          )}
        </div>
      </div>
    </div>
  );
}
