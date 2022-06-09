import axios from "axios";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { axiosInstance } from "../../utils/url";
const Login = () => {
  const saveUser = async (userData: {
    lastName: string;
    firstName: string;
    email: string;
  }) => {
    const res = await axiosInstance.post<string>(
      "http://localhost:9000/users",
      {
        ...userData,
      }
    );
    localStorage.setItem("accessToken", res.data);
  };
  return (
    <>
      <GoogleLogin
        clientId="441283631273-taavhqp5p1lf2p17s7nn60354sjarc0j.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(res) => {
          const userData = (res as GoogleLoginResponse).profileObj;
          saveUser({
            lastName: userData.familyName,
            firstName: userData.givenName,
            email: userData.email,
          });
        }}
        onFailure={() => console.log("login faiuler")}
      />
    </>
  );
};

export default Login;
