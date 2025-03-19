import axios from "axios";

async function login(formData) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/login/`,
      formData
    );
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default login;