// setup axios api get request to facebook meta convertion api
// setup aget for this api: https://graph.facebook.com/{API_VERSION}/{DATASET_ID}/events?access_token={TOKEN}.
import axios from "axios";

const fbApi = axios.create({
  baseURL: `https://graph.facebook.com/v13.0/${import.meta.env.VITE_FB_DATASET_ID}`,
  withCredentials: false,
  method: "post",
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    access_token: import.meta.env.VITE_FB_API_TOKEN,
  },
});

export default fbApi;