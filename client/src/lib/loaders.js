import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ params }) => {
  if (!params || !params.id) {
    throw new Error("ID parameter is missing");
  }

  try {
    const res = await apiRequest("/posts/" + params.id);
    if (!res || !res.data) {
      throw new Error("No data received from API");
    }
    return res.data;
  } catch (error) {
    console.error("Failed to load page data:", error);
    throw error;
  }
};


export const listPageLoader =  async ({request , params}) => {

const query =  request.url.split("?")[1];
const res =  await apiRequest("/post?" +  query)
return res.data;
  










}
