import React from 'react';
import "../css/discover.css";

export default function Discover() {
  return (
    <div className="discoverContainer">
      {/* Sent Requests Section */}
      <div className="requestsSection">
        <h2 className="sectionTitle">Requests You Sent</h2>
        
        <div className="requestsList">
          {/* Example of sent requests */}
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">Michael Chen</div>
                <div className="userMatric">MT2023456</div>
              </div>
            </div>
            <button className="cancelButton">Cancel Request</button>
          </div>
          
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">Jessica Williams</div>
                <div className="userMatric">MT2023789</div>
              </div>
            </div>
            <button className="cancelButton">Cancel Request</button>
          </div>
          
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">David Kim</div>
                <div className="userMatric">MT2023123</div>
              </div>
            </div>
            <button className="cancelButton">Cancel Request</button>
          </div>
          
          {/* Empty state (commented out) */}
          {/* 
          <div className="emptyState">
            <div className="emptyStateIcon">📤</div>
            <div className="emptyStateMessage">You haven't sent any follow requests yet.</div>
          </div>
          */}
        </div>
      </div>
      
      {/* Incoming Requests Section */}
      <div className="requestsSection">
        <h2 className="sectionTitle">Requests You Received</h2>
        
        <div className="requestsList">
          {/* Example of received requests */}
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">Emma Thompson</div>
                <div className="userMatric">MT2023321</div>
              </div>
            </div>
            <div className="actionButtons">
              <button className="acceptButton">Accept</button>
              <button className="rejectButton">Reject</button>
            </div>
          </div>
          
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">James Wilson</div>
                <div className="userMatric">MT2023654</div>
              </div>
            </div>
            <div className="actionButtons">
              <button className="acceptButton">Accept</button>
              <button className="rejectButton">Reject</button>
            </div>
          </div>
          
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">Sophia Garcia</div>
                <div className="userMatric">MT2023987</div>
              </div>
            </div>
            <div className="actionButtons">
              <button className="acceptButton">Accept</button>
              <button className="rejectButton">Reject</button>
            </div>
          </div>
          
          {/* Empty state (commented out) */}
          {/* 
          <div className="emptyState">
            <div className="emptyStateIcon">📥</div>
            <div className="emptyStateMessage">No new follow requests.</div>
          </div>
          */}
        </div>
      </div>
      
      {/* People You May Know Section */}
      <div className="requestsSection">
        <h2 className="sectionTitle">People You May Know</h2>
        
        <div className="requestsList">
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">Daniel Lee</div>
                <div className="userMatric">MT2023111</div>
              </div>
            </div>
            <button className="followButton">Follow</button>
          </div>
          
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">Olivia Martinez</div>
                <div className="userMatric">MT2023222</div>
              </div>
            </div>
            <button className="followButton">Follow</button>
          </div>
          
          <div className="requestItem">
            <div className="userInfo">
              <div className="userAvatar"></div>
              <div className="userDetails">
                <div className="userName">Ethan Brown</div>
                <div className="userMatric">MT2023333</div>
              </div>
            </div>
            <button className="followButton">Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
}