import axios from "axios";
// export const backendLocation = "https://charlesprojectbackend-6.onrender.com";
export const backendLocation = "http://localhost:4200";
import { io } from "socket.io-client";

export const socket = io(backendLocation, {
  autoConnect: true,
  withCredentials: true,
});

export async function getLoggedInUser() {
  try {
    const response = await axios.get(
      `${backendLocation}/user/getLoggedInUser`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting user:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function addUser(userObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/addUser/user`,
      userObject
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function checkUser(userObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/login`,
      userObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function requestPost(userObject) {
  try {
    console.log("frontend someone came");
    const response = await axios.post(
      `${backendLocation}/post/requestPost`,
      userObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error requesting post:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}



export async function getPendingPosts(userObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/post/pending`,
      userObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function approvePosts(userObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/post/approvePost`,
      userObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function deletePost(userObject) {
  try {
    const response = await axios.delete(`${backendLocation}/post/deletePost`, {
      data: userObject,
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting post:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function getUserFeed(userObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/post/userFeed`,
      userObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user feed:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function addComment(userObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/post/addComment`,
      userObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user feed:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function getComments(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/post/getComments`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user feed:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function followUser(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/follow`,
      requestObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error following user:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function unFollowUser(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/unfollow`,
      requestObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error unfollowing user:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function getUserStats(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/stats`,
      requestObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error unfollowing user:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function discoverApi(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/discover`,
      requestObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching discover data:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function approveFollow(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/approveFollow`,
      requestObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error aproving follow data:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function getChats(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/chat/getChats`,
      requestObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching chats:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function getMessages(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/chat/getMessages`,
      requestObject,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching messages:",
      error.response?.data || error.message
    );
    return { error: error.response?.data || "Something went wrong" };
  }
}


export async function addLike(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/post/like`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error liking/unliking post:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}


export async function savePost(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/post/save`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error saving post:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}


export async function getUserPosts(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/posts`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user's posts:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}


export async function getSavedPosts(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/user/savedPosts`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching saved posts:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}


export async function changePassword(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/addUser/changePassword`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error changing password:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}


export async function addProfilePic(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/addProfilePic`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding profile picture:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}


export async function dashBoardStats(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/admin/stats`,
      requestObject,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching admin dashboard stats:",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}

export async function deleteUsers(requestObject) {
  try {
    const response = await axios.post(
      `${backendLocation}/deleteUser`,
      requestObject, // <- userId(s) sent here
      {
        withCredentials: true,
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user(s):",
      error.response?.data || error.message
    );
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }
}
