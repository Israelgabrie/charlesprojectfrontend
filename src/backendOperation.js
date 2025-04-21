import axios from 'axios';
const backendLocation = "http://localhost:4200"; 
import {io} from "socket.io-client";


export const socket = io(backendLocation, {
  autoConnect: true,
  withCredentials: true,
});


export async function getLoggedInUser(){
  try {
    const response = await axios.get(`${backendLocation}/user/getLoggedInUser`,{withCredentials:true});
    return response.data;
  } catch (error) {
    console.error("Error getting user:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function addUser(userObject) {
  try {
    const response = await axios.post(`${backendLocation}/addUser/user`, userObject);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
}

export async function checkUser(userObject) {
    try {
      const response = await axios.post(`${backendLocation}/user/login`, userObject,{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }

  export async function requestPost(userObject) {
    try {
      console.log("frontend someone came")
      const response = await axios.post(`${backendLocation}/post/requestPost`, userObject,{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error("Error requesting post:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }


  export async function getPendingPosts(userObject) {
    try {
      const response = await axios.post(`${backendLocation}/post/pending`, userObject,{withCredentials:true});
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }



  export async function approvePosts(userObject) {
    try {
      const response = await axios.post(`${backendLocation}/post/approvePost`, userObject,{withCredentials:true});
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
      console.error("Error deleting post:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }
  


  export async function getUserFeed(userObject) {
    try {
      const response = await axios.post(`${backendLocation}/post/userFeed`, userObject, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user feed:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }


  export async function addComment(userObject) {
    try {
      const response = await axios.post(`${backendLocation}/post/addComment`, userObject, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user feed:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }

  export async function getComments(requestObject) {
    try {
      const response = await axios.post(`${backendLocation}/post/getComments`, requestObject,{
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user feed:", error.response?.data || error.message);
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
      console.error("Error following user:", error.response?.data || error.message);
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
      console.error("Error unfollowing user:", error.response?.data || error.message);
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
      console.error("Error unfollowing user:", error.response?.data || error.message);
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
      console.error("Error fetching discover data:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }


  export async function approveFollow(requestObject) {
    try {
      const response = await axios.post(
        `${backendLocation}/user/discover`,
        requestObject,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error aproving follow data:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }  
  
  
  

  


  
  

