import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    setIsAuth(true);
    localStorage.setItem("authCourseProject", "true");
  }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Login" />
        <MyInput type="password" placeholder="Password" />
        <MyButton>Sign In</MyButton>
      </form>
    </div>
  );
};

export default Login;