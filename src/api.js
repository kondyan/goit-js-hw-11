// axios, async function which fetches and returns data according to params and query
import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api";

const params = {
  key: import.meta.env.VITE_API_KEY,
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
  per_page: 40,
};

export async function fetchQuery(query, page = 1) {
  try {
    params.page = page;
    const response = await axios.get(`?q=${query} `, { params });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
}
