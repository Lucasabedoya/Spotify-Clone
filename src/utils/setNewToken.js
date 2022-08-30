
export const setNewToken = () => {

    const urlActual =  window.location;

    const createNewToken = () => {
      const newToken = urlActual.hash.split("&")[0].split("=")[1];
      return newToken;
    };

    const newToken = createNewToken();
    
    return newToken;

};