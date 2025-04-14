import React from "react";
import "../css/home.css";
import {
  CancelXIcon,
  CommentIcon,
  LikeIcon,
  SaveIcon,
  ShareIcon,
} from "../SvgComponents";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div
        className="postsContainer"
        style={{ overflowY: "scroll", height: "500px" }}
      >
        <div className="post" style={{ backgroundColor: "white" }}>
          <div className="postTopBar">
            <div className="postTopBarRightSide">
              <div className="posterImage"></div>
              <div className="posterDetails">
                <div className="posterName">Gabriel Israel</div>
                <div className="followBtn">Follow</div>
              </div>
            </div>
            <div className="postTopSideLeftSide">
              <div className="postTopSideTime">40 Min ago</div>
              <div className="postOption">...</div>
            </div>
          </div>
          <div className="postText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ex
            blanditiis deserunt! Voluptatem repellat mollitia doloremque omnis.
            Quidem nisi, aliquam consequuntur laborum ducimus inventore nemo
            assumenda amet sint harum tenetur!
          </div>
          <div className="postImage"></div>
          <div className="postActionBar">
            <div className="postActionBox">
              <LikeIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <ShareIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <CommentIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <SaveIcon />
              <div className="postActionTextDetails">18</div>
            </div>
          </div>
        </div>
        <div className="post" style={{ backgroundColor: "white" }}>
          <div className="postTopBar">
            <div className="postTopBarRightSide">
              <div className="posterImage"></div>
              <div className="posterDetails">
                <div className="posterName">Gabriel Israel</div>
                <div className="followBtn">Follow</div>
              </div>
            </div>
            <div className="postTopSideLeftSide">
              <div className="postTopSideTime">40 Min ago</div>
              <div className="postOption">...</div>
            </div>
          </div>
          <div className="postText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ex
            blanditiis deserunt! Voluptatem repellat mollitia doloremque omnis.
            Quidem nisi, aliquam consequuntur laborum ducimus inventore nemo
            assumenda amet sint harum tenetur!
          </div>
          <div className="postImage"></div>
          <div className="postActionBar">
            <div className="postActionBox">
              <LikeIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <ShareIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <CommentIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <SaveIcon />
              <div className="postActionTextDetails">18</div>
            </div>
          </div>
        </div>
        <div className="post" style={{ backgroundColor: "white" }}>
          <div className="postTopBar">
            <div className="postTopBarRightSide">
              <div className="posterImage"></div>
              <div className="posterDetails">
                <div className="posterName">Gabriel Israel</div>
                <div className="followBtn">Follow</div>
              </div>
            </div>
            <div className="postTopSideLeftSide">
              <div className="postTopSideTime">40 Min ago</div>
              <div className="postOption">...</div>
            </div>
          </div>
          <div className="postText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus ex
            blanditiis deserunt! Voluptatem repellat mollitia doloremque omnis.
            Quidem nisi, aliquam consequuntur laborum ducimus inventore nemo
            assumenda amet sint harum tenetur!
          </div>
          <div className="postImage"></div>
          <div className="postActionBar">
            <div className="postActionBox">
              <LikeIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <ShareIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <CommentIcon />
              <div className="postActionTextDetails">18</div>
            </div>
            <div className="postActionBox">
              <SaveIcon />
              <div className="postActionTextDetails">18</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="commentsContainer"
        style={{ width: "45%", height: "500px" }}
      >
        <div className="commentSectionTop">
          <div className="postCommentHead">Comment Section</div>
          <CancelXIcon />
        </div>
        <div className="commentsBox" style={{height:"78%"}}>
          <div className="comment">
            <div className="commentBoxTop">
              <div className="posterImage"></div>
              <div className="commentBoxDetails">
                <div className="commentBoxName">Gabriel Israel</div>
                <div className="commentBoxTme">40 Min ago</div>
              </div>
            </div>
            <div className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              aut, eius ab error repudiandae minus odio voluptatum modi, rerum
              in natus a molestiae sed consequuntur, numquam dolor culpa fugit
              excepturi.
            </div>
            <div style={{marginTop:0}} className="postActionBar">
              <div className="postActionBox">
                <LikeIcon size={16} />
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              <div className="postActionBox">
                <ShareIcon size={16}/>
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              
            </div>
          </div>
          <div className="comment">
            <div className="commentBoxTop">
              <div className="posterImage"></div>
              <div className="commentBoxDetails">
                <div className="commentBoxName">Gabriel Israel</div>
                <div className="commentBoxTme">40 Min ago</div>
              </div>
            </div>
            <div className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              aut, eius ab error repudiandae minus odio voluptatum modi, rerum
              in natus a molestiae sed consequuntur, numquam dolor culpa fugit
              excepturi.
            </div>
            <div style={{marginTop:0}} className="postActionBar">
              <div className="postActionBox">
                <LikeIcon size={16} />
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              <div className="postActionBox">
                <ShareIcon size={16}/>
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              
            </div>
          </div>
          <div className="comment">
            <div className="commentBoxTop">
              <div className="posterImage"></div>
              <div className="commentBoxDetails">
                <div className="commentBoxName">Gabriel Israel</div>
                <div className="commentBoxTme">40 Min ago</div>
              </div>
            </div>
            <div className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              aut, eius ab error repudiandae minus odio voluptatum modi, rerum
              in natus a molestiae sed consequuntur, numquam dolor culpa fugit
              excepturi.
            </div>
            <div style={{marginTop:0}} className="postActionBar">
              <div className="postActionBox">
                <LikeIcon size={16} />
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              <div className="postActionBox">
                <ShareIcon size={16}/>
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              
            </div>
          </div>
          <div className="comment">
            <div className="commentBoxTop">
              <div className="posterImage"></div>
              <div className="commentBoxDetails">
                <div className="commentBoxName">Gabriel Israel</div>
                <div className="commentBoxTme">40 Min ago</div>
              </div>
            </div>
            <div className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              aut, eius ab error repudiandae minus odio voluptatum modi, rerum
              in natus a molestiae sed consequuntur, numquam dolor culpa fugit
              excepturi.
            </div>
            <div style={{marginTop:0}} className="postActionBar">
              <div className="postActionBox">
                <LikeIcon size={16} />
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              <div className="postActionBox">
                <ShareIcon size={16}/>
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              
            </div>
          </div>
          <div className="comment">
            <div className="commentBoxTop">
              <div className="posterImage"></div>
              <div className="commentBoxDetails">
                <div className="commentBoxName">Gabriel Israel</div>
                <div className="commentBoxTme">40 Min ago</div>
              </div>
            </div>
            <div className="commentText">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              aut, eius ab error repudiandae minus odio voluptatum modi, rerum
              in natus a molestiae sed consequuntur, numquam dolor culpa fugit
              excepturi.
            </div>
            <div style={{marginTop:0}} className="postActionBar">
              <div className="postActionBox">
                <LikeIcon size={16} />
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              <div className="postActionBox">
                <ShareIcon size={16}/>
                <div className="postActionTextDetails" style={{fontSize:14}}>18</div>
              </div>
              
            </div>
          </div>

        </div>

        <form
            className="form-inline my-2 my-lg-0"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "row",
              gap: 10,
              top:10,
              position:"relative"
            }}
          >
            <input className="form-control mr-sm-2" type="search" placeholder="Add Comment" aria-label="Search" />
            <button  className="navBarBtn btn  my-2 my-sm-0" type="submit">
              +
            </button>
          </form>
       
      </div>
    </div>
  );
}
