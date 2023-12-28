import Cookies from "js-cookie";

export const checkAuthentication = async () => {
  try {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/profile`,
        {
          method: "POST",
          headers: {
            Authorization: authToken,
          },
        }
      );

      const data = await response.json();
      console.log(data.status, "res");

      if (data.status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};
