import axios from 'axios';

const backendLocation = "http://localhost:4200"; // or your deployed backend URL

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
      const response = await axios.post(`${backendLocation}/user/login`, userObject);
      return response.data;
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      return { error: error.response?.data || "Something went wrong" };
    }
  }

