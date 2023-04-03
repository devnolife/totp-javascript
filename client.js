'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { generateKey, generateTOTP } from './totp';
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    message: ''
  });
  const key = generateKey(30);
  const totp = generateTOTP('devnolife');
  useEffect(() => {
    axios
      .get('http://localhost:8000/all-mahasiswa', {
        headers: {
          'secret': 'devnolife',
          'totp': totp
        }
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError({
          status: true,
          message: err.response.data.message
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error.status) return <p>Error {error.message}</p>;

  return (
    <div>
      <h1>TOTP Javascript by Devnolife</h1>
      <ul>
        {data.map((item) => (
          <li key={item.nim}>
            {item.nim} - {item.nama}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App
