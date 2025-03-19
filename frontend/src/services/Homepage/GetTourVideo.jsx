
import axios from 'axios';

async function Gettourvideo() {
    try {
       
        // const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/hero/tourvideo`);
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/hero/tourvideo`);
        
        console.log('res',res)
        return res.data;
    } catch (error) {
        console.error("Error request:", error.request);  // Log request details for debugging
        throw error;
    }
}

export default Gettourvideo;