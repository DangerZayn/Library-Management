import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../pages/styles/header.css';
import IsLoginContext from '../components/IsLoginContext'; 
import { logoutUser } from '../services/auth';

const Header = () => {
  const { isLogin, setLogin } = useContext(IsLoginContext);
  const [showWindow, setShowWindow] = useState(false);

  const handleLogout = async () => {
    setShowWindow(true);
    setShowWindow(false);
    logoutUser();
    setLogin(false);
  };

  useEffect(() => {
    let timeout;
    if (showWindow) {
      timeout = setTimeout(() => {
        setShowWindow(false);
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [showWindow]);

  return (
    <>
      <header className="header bg-white text-dark p-3 shadow">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/user/home">
              Library
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/user/bookstore">
                    Books
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav" id="right-top">
                {isLogin === false && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/user/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/user/register">
                        Signup
                      </Link>
                    </li>
                  </>
                )}
                {isLogin === true && (
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout}>
                      Log out
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>
      </header>
      {showWindow && (
        <div className="loading-window">
          <div className="loading-icon"></div>
        </div>
      )}
    </>
  );
};

export default Header;
