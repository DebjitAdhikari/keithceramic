import axios from "axios";

async function EditManagement(formData, id) {
  try {
    if (!id) throw new Error("Management ID is required");

    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/management/Edit/${id}`;
    
    console.log("PUT Request URL:", apiUrl);

    const res = await axios.put(apiUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error updating management:", error.response?.data || error.message);
    throw error;
  }
}

export default EditManagement;
