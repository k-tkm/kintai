import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { useAPIsaveUser } from "../../hooks/users/useAPISaveUser";
import { axiosInstance } from "../../utils/url";
const Login = () => {
  const { mutate: saveUser } = useAPIsaveUser({
    onSuccess: (token) => {
      localStorage.setItem("accessToken", token);
    },
  });

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
