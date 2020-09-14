import React, { useEffect, useState } from "react";
import "./App.css";

import Login from "./components/Login";
import { getTokenFromRedirectURLResponse } from "./spotify";

function App() {
  const [token, setToken] = useState(null);

  // Run code based on given conditions (dependencies)
  useEffect(() => {
    // keep an eye on window location & remove access token from URL
    const hash = getTokenFromRedirectURLResponse();
    window.location.hash = "";

    // Best practice for avoiding duplicate const names
    const _token = hash.access_token;
    if (_token) {
      // store in state
      setToken(_token);
    }
    console.log("Token 👉", hash);
  }, []);

  return (
    <div className="app">
      {/* JSX: Javascript inside return */}
      {token ? (
        // <Player />
        <h1>Logged In</h1>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
