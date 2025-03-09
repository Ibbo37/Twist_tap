export const sliceName = (username) => {
    console.log("Username in sliceName:", username);  // Log to inspect the value of username
    
    if (typeof username !== "string") {
      return "";  // If the username is not a string, return an empty string
    }
    
    const word = username.split(" ");
    return word
      .slice(0, 2)  
      .map((words) => words.charAt(0))  
      .join("")  
      .toUpperCase();  
  };
  