export const apiCall = async (endpoint, params = "") => {
  const queryString = Object.keys(params)
    .map((key) => {
      return `${key}=${params[key]}`;
    })
    .join("&");
  //   const corsProxy = "https://cors-anywhere.herokuapp.com/";
  const url = `${endpoint}?${queryString}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        //   'X-API-KEY': apiKey,
        Accept: "application/json",
        ContentType: "application/json",
      },
    });

    return await response.json();

    /*if (data.success !== undefined && data.success) {
              return data;
          }*/
  } catch (error) {
    return {};
  }
};
