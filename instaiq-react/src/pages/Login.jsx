import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { apiService } from "../config/api"; // Import centralized API service
import { isAdmin } from "../utils/auth"; // Import auth utilities

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // For general success messages
  const [errorMessage, setErrorMessage] = useState(null); // For login errors

  // Effect to clear success/error messages after a few seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Message disappears after 3 seconds
      return () => clearTimeout(timer);
    }
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Error message disappears after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]); // Re-run this effect whenever messages change

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setLoading(true);
    setSuccessMessage(null); // Clear any previous messages
    setErrorMessage(null);

    try {
      const response = await apiService.auth.login(formData);

      // Store the JWT token in localStorage
      localStorage.setItem('userInfo', JSON.stringify(response.data)); // Store full user info including token

      setSuccessMessage("Login successful! Redirecting to home page...");
      setFormData({ // Clear password field on success (keep email for convenience if desired)
        email: formData.email, // Keep email
        password: "", // Clear password
      });

      // Redirect based on user role
      if (response.data.role === 'admin') {
        setSuccessMessage("Admin login successful! Redirecting to admin panel...");
        navigate('/admin'); // Redirect admin to admin panel
      } else {
        setSuccessMessage("Login successful! Redirecting to home page...");
        navigate('/'); // Redirect regular users to home page
      }

    } catch (error) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data.message
          ? error.response.data.message
          : "Login failed. Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // Check if user is already logged in and redirect accordingly
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo.token) {
          if (parsedUserInfo.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error('Error parsing userInfo:', error);
        localStorage.removeItem('userInfo');
      }
    }
  }, [navigate]);

  return (
    <div className="page-wraper">
      <div className="account-form">
        <div
          className="account-head"
          style={{ backgroundImage: "url(assets/images/background/bg2.jpg)" }}
        >
          <a href="/">
            <img src="assets/images/logo-white-2.png" alt="InstaIQ Logo" />
          </a>
        </div>
        <div className="account-form-inner">
          <div className="account-container">
            <div className="heading-bx left">
              <h2 className="title-head">
                Login to your <span>InstaIQ Account</span> {/* Adjusted title */}
              </h2>
              <p>
                Don't have an account? <Link to="/register">Create one here</Link>
              </p>
            </div>
            <form className="contact-bx" onSubmit={handleSubmit}> {/* Added onSubmit handler */}
              {/* Message display area */}
              {loading && <div className="alert alert-info">Logging in...</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

              <div className="row placeani">
                {/* Input for Email */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="email" // Corrected name to 'email' to match backend
                        type="email" // Changed type to email
                        required
                        className="form-control"
                        placeholder="Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {/* Input for Password */}
                <div className="col-lg-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        name="password" // Corrected name to 'password' to match backend
                        type="password"
                        className="form-control"
                        required
                        placeholder="Your Password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group form-forget">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customControlAutosizing"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customControlAutosizing"
                      >
                        Remember me
                      </label>
                    </div>
                    <a href="/forget-password" className="ml-auto">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="col-lg-12 m-b30">
                  <button
                    name="submit"
                    type="submit"
                    value="Submit"
                    className="btn button-md"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </div>
                <div className="col-lg-12">
                  <div style={{ 
                    textAlign: 'center', 
                    marginTop: '15px',
                    padding: '10px',
                    background: '#f8f9fa',
                    borderRadius: '5px',
                    fontSize: '14px',
                    color: '#6c757d'
                  }}>
                    <p style={{ margin: '0 0 5px 0' }}>
                      <strong>Admin Access:</strong>
                    </p>
                    <p style={{ margin: '0', fontSize: '12px' }}>
                      Use admin credentials to access the admin panel
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
