import React from 'react';
import "../css/messages.css";
import { CancelXIcon } from "../SvgComponents";

export default function Messages() {
  return (
    <div className="messagesContainer">
      {/* Left Panel: Friends List */}
      <div className="friendsListPanel">
        <div className="searchContainer">
          <input type="text" className="searchInput" placeholder="Search friends..." />
        </div>
        
        <div className="friendsList">
          <div className="friendItem active">
            <div className="friendAvatar"></div>
            <div className="friendInfo">
              <div className="friendName">Sarah Johnson</div>
              <div className="lastMessage">Hey, are you coming to the lecture today?</div>
            </div>
            <div className="messageTime">5 mins</div>
          </div>
          
          <div className="friendItem">
            <div className="friendAvatar"></div>
            <div className="friendInfo">
              <div className="friendName">Michael Chen</div>
              <div className="lastMessage">Thanks for the notes!</div>
            </div>
            <div className="messageTime">Yesterday</div>
          </div>
          
          <div className="friendItem">
            <div className="friendAvatar"></div>
            <div className="friendInfo">
              <div className="friendName">Jessica Williams</div>
              <div className="lastMessage">Did you finish the assignment?</div>
            </div>
            <div className="messageTime">2 days</div>
          </div>
          
          <div className="friendItem">
            <div className="friendAvatar"></div>
            <div className="friendInfo">
              <div className="friendName">David Kim</div>
              <div className="lastMessage">Let's meet at the library at 3pm</div>
            </div>
            <div className="messageTime">1 week</div>
          </div>
          
          <div className="friendItem">
            <div className="friendAvatar"></div>
            <div className="friendInfo">
              <div className="friendName">Emma Thompson</div>
              <div className="lastMessage">Have you started studying for the exam?</div>
            </div>
            <div className="messageTime">2 weeks</div>
          </div>
          
          <div className="friendItem">
            <div className="friendAvatar"></div>
            <div className="friendInfo">
              <div className="friendName">James Wilson</div>
              <div className="lastMessage">Can you share the presentation slides?</div>
            </div>
            <div className="messageTime">3 weeks</div>
          </div>
        </div>
      </div>
      
      {/* Right Panel: Chat Box */}
      <div className="chatPanel">
        <div className="chatHeader">
          <div className="chatHeaderLeft">
            <div className="friendAvatar"></div>
            <div className="friendInfo">
              <div className="friendName">Sarah Johnson</div>
              <div className="onlineStatus">Online</div>
            </div>
          </div>
          <div className="chatHeaderRight">
            <div className="headerIcon">
              <CancelXIcon />
            </div>
          </div>
        </div>
        
        <div className="messageThread">
          <div className="dateMarker">
            <span>Today</span>
          </div>
          
          <div className="messageItem friend">
            <div className="messageAvatar"></div>
            <div className="messageContent">
              <div className="messageBubble">Hey, are you coming to the lecture today?</div>
              <div className="messageTime">10:15 AM</div>
            </div>
          </div>
          
          <div className="messageItem user">
            <div className="messageContent">
              <div className="messageBubble">Yes, I'll be there. Do you want to meet before class?</div>
              <div className="messageTime">10:17 AM</div>
            </div>
          </div>
          
          <div className="messageItem friend">
            <div className="messageAvatar"></div>
            <div className="messageContent">
              <div className="messageBubble">Let's meet at the cafeteria around 11:30.</div>
              <div className="messageTime">10:20 AM</div>
            </div>
          </div>
          
          <div className="messageItem user">
            <div className="messageContent">
              <div className="messageBubble">Perfect. I'll see you there!</div>
              <div className="messageTime">10:21 AM</div>
            </div>
          </div>
          
          <div className="messageItem friend">
            <div className="messageAvatar"></div>
            <div className="messageContent">
              <div className="messageBubble">Don't forget to bring your notes from last week.</div>
              <div className="messageTime">10:25 AM</div>
            </div>
          </div>
          
          <div className="messageItem user">
            <div className="messageContent">
              <div className="messageBubble">Got it. I'll bring them.</div>
              <div className="messageTime">10:26 AM</div>
            </div>
          </div>
        </div>
        
        <div className="messageInputContainer">
          <div className="attachmentIcons">
            <div className="attachmentIcon">📎</div>
            <div className="attachmentIcon">😊</div>
          </div>
          <input type="text" className="messageInput" placeholder="Type a message..." />
          <button className="sendButton">Send</button>
        </div>
      </div>
    </div>
  );
}