// Simulating api
export const api = {
    createItem: (url, newItem) => {
      console.log("URL: ", url);
      return Promise.resolve(newItem);
    }
};
  