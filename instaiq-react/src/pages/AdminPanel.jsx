import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link, useLocation } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import CourseManagement from "./admin/CourseManagement";
import EventManagement from "./admin/EventManagement";
import UserManagement from "./admin/UserManagement";
import OrderManagement from "./admin/OrderManagement";
import ContentManagement from "./admin/ContentManagement";
import Settings from "./admin/Settings";
import { isAdmin, getCurrentUser, logout } from "../utils/auth"; // Import auth utilities

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { path: "/admin", icon: "fa fa-dashboard", label: "Dashboard", component: AdminDashboard },
    { path: "/admin/courses", icon: "fa fa-book", label: "Course Management", component: CourseManagement },
    { path: "/admin/events", icon: "fa fa-calendar", label: "Event Management", component: EventManagement },
    { path: "/admin/users", icon: "fa fa-users", label: "User Management", component: UserManagement },
    { path: "/admin/orders", icon: "fa fa-shopping-cart", label: "Order Management", component: OrderManagement },
    { path: "/admin/content", icon: "fa fa-file-text", label: "Content Management", component: ContentManagement },
    { path: "/admin/settings", icon: "fa fa-cog", label: "Settings", component: Settings },
  ];

  return (
    <div className="ttr-wrapper" style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      {/* Sidebar */}
      <div className={`ttr-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`} style={{ 
        width: sidebarCollapsed ? '60px' : '250px', 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        height: '100vh', 
        background: '#fff', 
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        zIndex: 1000,
        transition: 'width 0.3s ease'
      }}>
        {/* Logo */}
        <div className="sidebar-header" style={{ 
          padding: '20px', 
          borderBottom: '1px solid #eee',
          textAlign: sidebarCollapsed ? 'center' : 'left'
        }}>
          {!sidebarCollapsed && (
            <h4 style={{ margin: 0, color: '#333' }}>Insta iQ Admin</h4>
          )}
          {sidebarCollapsed && (
            <i className="fa fa-graduation-cap" style={{ fontSize: '24px', color: '#007bff' }}></i>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav" style={{ padding: '20px 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map((item, index) => (
              <li key={index} style={{ marginBottom: '5px' }}>
                <Link
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 20px',
                    color: location.pathname === item.path ? '#007bff' : '#666',
                    textDecoration: 'none',
                    backgroundColor: location.pathname === item.path ? '#f8f9fa' : 'transparent',
                    borderLeft: location.pathname === item.path ? '3px solid #007bff' : '3px solid transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.backgroundColor = '#f8f9fa';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <i className={item.icon} style={{ 
                    marginRight: sidebarCollapsed ? '0' : '10px', 
                    fontSize: '16px',
                    width: sidebarCollapsed ? 'auto' : '20px',
                    textAlign: 'center'
                  }}></i>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '20px', 
          right: '20px' 
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
              fontSize: '14px'
            }}
          >
            <i className="fa fa-sign-out" style={{ 
              marginRight: sidebarCollapsed ? '0' : '10px',
              fontSize: '16px'
            }}></i>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ 
        marginLeft: sidebarCollapsed ? '60px' : '250px',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top Header */}
        <div style={{ 
          background: '#fff', 
          padding: '15px 30px', 
          borderBottom: '1px solid #eee',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                marginRight: '15px',
                color: '#666'
              }}
            >
              <i className="fa fa-bars"></i>
            </button>
            <h4 style={{ margin: 0, color: '#333' }}>
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h4>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '15px', color: '#666' }}>
              Welcome, {getCurrentUser()?.name || 'Admin'}
            </span>
            <i className="fa fa-user-circle" style={{ fontSize: '24px', color: '#007bff' }}></i>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '30px' }}>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/events" element={<EventManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/content" element={<ContentManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 