import React from 'react';

const UserLogin = (props) => {
  return (
    <div id='loginPanel'>
      <h1>RECIPE</h1>
      <h2>Find Recipe Inspiration</h2>
      Username
      <input type='text' id='username' name='username' />
      Password
      <input type='password' id='password' name='password' />
      <button onClick={(event) => props.loginUser(event)}>Login!</button>
      <button onClick={(event) => props.createUser(event)}>
        Create New User
      </button>
    </div>
  );
};

export default UserLogin;
