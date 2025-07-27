// Authentication utility functions

/**
 * Check if user is logged in
 * @returns {boolean}
 */
export const isLoggedIn = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) return false;
  
  try {
    const parsedUserInfo = JSON.parse(userInfo);
    return !!(parsedUserInfo.token && parsedUserInfo.email);
  } catch (error) {
    console.error('Error parsing userInfo:', error);
    localStorage.removeItem('userInfo');
    return false;
  }
};

/**
 * Check if user is an admin
 * @returns {boolean}
 */
export const isAdmin = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) return false;
  
  try {
    const parsedUserInfo = JSON.parse(userInfo);
    return parsedUserInfo.role === 'admin';
  } catch (error) {
    console.error('Error parsing userInfo:', error);
    localStorage.removeItem('userInfo');
    return false;
  }
};

/**
 * Get current user info
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) return null;
  
  try {
    return JSON.parse(userInfo);
  } catch (error) {
    console.error('Error parsing userInfo:', error);
    localStorage.removeItem('userInfo');
    return null;
  }
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('isAdmin'); // Remove old admin flag
  window.location.href = '/login';
};

/**
 * Check if user has required role
 * @param {string} requiredRole - Required role ('admin', 'user')
 * @returns {boolean}
 */
export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
}; 