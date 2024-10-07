import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import AdminAuth from '../Utils/AdminAuth';


function PrivateRoute({ children }) {

  const [isAuthenticate, setIsAuthenticate] = useState({
    isAuthenticated: false,
    isAdmin: false
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await AdminAuth();
      setIsAuthenticate(
        {
          isAuthenticated: authInfo.isAuthenticated,
          isAdmin: authInfo.isAdmin,
        }
      );
      setTimeout(() => {

        setLoading(false)

      }, 2000);

    };

    fetchData();

  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', }}>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div style={{paddingLeft:'10px' }}>
            <p style={{ fontFamily: 'monospace', fontSize: '30px', marginTop: '2px', paddingLeft:'2px' }}>Loading....</p>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticate.isAdmin === false) {
    return <Navigate to="/admin" />;
  }

  return children;
}

export default PrivateRoute;