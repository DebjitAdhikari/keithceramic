
import axios from 'axios';

async function PostTourVideo(formdata) {
    try {
        console.log('form',formdata)
        console.log(import.meta.env.VITE_API_BASE_URL)
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/hero/uploadvideooftour`, formdata);
        // const res = await axios.post(`http://localhost:3000/api/hero/uploadvideooftour`, formdata);
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default PostTourVideo;