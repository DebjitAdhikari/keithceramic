
import axios from "axios";

async function GetManagement(formData, id) {
  try {
    console.log('id',id)
    console.log(`PUT Request URL: ${import.meta.env.VITE_API_BASE_URL}/management/getAll`);

    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/management/getAll`);
    console.log("res", res);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export default GetManagement;
