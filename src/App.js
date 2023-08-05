// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchUserData = async () => {
   await axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error('Error fetching user data:', error));
      

    };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username.trim() !== '') {
      fetchUserData();
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Card</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Show Card</button>
      </form>

      {userData && (
        <div className="github-card">
          <img src={userData.avatar_url} alt="GitHub Avatar" />
          <h2>{userData.login}</h2>
          <p>Name: {userData.name}</p>
          <p>Public Repos: {userData.public_repos}</p>
          <p>Public Gists: {userData.public_gists}</p>
          <p>Profile Created: {userData.created_at}</p>
        </div>
      )}
    </div>
  );
};

export default App;
