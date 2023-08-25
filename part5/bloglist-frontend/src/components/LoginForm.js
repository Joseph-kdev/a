import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = (event) => {
    event.preventDefault();
    handleLogin(username,password);
    setUsername("");
    setPassword("");
  };


  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={loginFunc}>
        <div>
        Username
          <input id="username" type="text" value={username} name='username'
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
        Password
          <input id="password" type="password" value={password} name='password'
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login-button" type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;