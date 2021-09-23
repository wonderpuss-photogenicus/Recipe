import React from 'react';
import GoogleLogin from "react-google-login"
const REACT_APP_GOOGLE_CLIENT_ID = '286216419697-fiuupsg66161d7aqejg16h3qv088mn5j.apps.googleusercontent.com';

const UserLogin = (props) => {

  const handleLogin = async googleData => {
    const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    // store returned user somehow
  }

  return (
    <div id='loginPanel'>
      <h1>RECIPE</h1>
      <h2>Find Recipe Inspiration</h2>
      Username
      <input type='text' id='username' name='username' />
      Password
      <input type='password' id='password' name='password' />
      <button onClick={(event) => props.loginUser(event)}>Login!</button>
      <button onClick={(event) => props.createUser(event)}>        Create New User
      </button>
      <GoogleLogin
    clientId={REACT_APP_GOOGLE_CLIENT_ID}
    buttonText="Log in with Google"
    onSuccess={handleLogin}
    onFailure={handleLogin}
    cookiePolicy={'single_host_origin'}
/>
    </div>
  );
};

export default UserLogin;
