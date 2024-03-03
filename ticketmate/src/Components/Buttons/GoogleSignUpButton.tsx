import React from 'react';
import GoogleButton from 'react-google-button';

const responseGoogle = (response: any) => {
  console.log(response);
  // Handle the response, e.g., send the user's ID token to your server
};

const GoogleSignInButton = () => {
  return (
    <GoogleButton onClick={responseGoogle} />
  );
};

export default GoogleSignInButton;
