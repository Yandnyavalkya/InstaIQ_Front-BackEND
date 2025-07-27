import React, { useState, useEffect } from "react";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    instructor: "",
    image: "",
    status: "active"
  });

  // Sample course data
  const sampleCourses = [
    {
      id: 1,
      title: "ALL INDIA PLACEMENT APTITUDE TEST",
      description: "Comprehensive aptitude test preparation for campus placements",
      price: "Free",
      duration: "3 months",
      category: "Aptitude",
      instructor: "Insta iQ",
      image: "assets/images/courses/course1.jpg",
      status: "active",
      enrollments: 1250,
      rating: 4.8,
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      title: "PLACEMENT APTITUDE COURSE",
      description: "Complete course covering all aspects of placement aptitude",
      price: "₹6,999",
      duration: "6 months",
      category: "Aptitude",
      instructor: "Insta Education",
      image: "assets/images/courses/course2.jpg",
      status: "active",
      enrollments: 890,
      rating: 4.7,
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      title: "ADVANCE EXCEL & DATA ANALYSIS",
      description: "Master Excel and data analysis for business intelligence",
      price: "₹4,500",
      duration: "4 months",
      category: "Technical",
      instructor: "Data Pro",
      image: "assets/images/courses/course3.jpg",
      status: "active",
      enrollments: 650,
      rating: 4.9,
      createdAt: "2024-01-10"
    },
    {
      id: 4,
      title: "AI CAREER GUIDANCE WORKSHOP",
      description: "AI-driven career guidance and counseling sessions",
      price: "₹2,500",
      duration: "2 months",
      category: "Career Guidance",
      instructor: "AI Mentor",
      image: "assets/images/courses/course4.jpg",
      status: "inactive",
      enrollments: 320,
      rating: 4.6,
      createdAt: "2024-01-15"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(sampleCourses);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCourse) {
      // Update existing course
      setCourses(prev => prev.map(course => 
        course.id === editingCourse.id ? { ...course, ...formData } : course
      ));
      setEditingCourse(null);
    } else {
      // Add new course
      const newCourse = {
        id: Date.now(),
        ...formData,
        enrollments: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCourses(prev => [...prev, newCourse]);
    }
    setShowAddModal(false);
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      category: "",
      instructor: "",
      image: "",
      status: "active"
    });
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setShowAddModal(true);
  };

  const handleDelete = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(prev => prev.filter(course => course.id !== courseId));
    }
  };

  const handleStatusToggle = (courseId) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId 
        ? { ...course, status: course.status === 'active' ? 'inactive' : 'active' }
        : course
    ));
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading courses...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Course Management</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage all courses on the platform</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <i className="fa fa-plus" style={{ marginRight: '8px' }}></i>
            Add New Course
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Search Courses
            </label>
            <input
              type="text"
              placeholder="Search by title, description, or instructor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Courses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Total Courses
            </label>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {filteredCourses.length}
            </div>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <div style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        border: '1px solid #eee'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Course</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Instructor</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Price</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Enrollments</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Rating</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Status</th>
                <th style={{ textAlign: 'left', padding: '15px 0', color: '#333', fontWeight: 'bold' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                  <td style={{ padding: '15px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={course.image}
                        alt={course.title}
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '8px',
                          marginRight: '15px',
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '5px' }}>
                          {course.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {course.description.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '15px 0', color: '#333' }}>{course.instructor}</td>
                  <td style={{ padding: '15px 0', color: '#333', fontWeight: 'bold' }}>{course.price}</td>
                  <td style={{ padding: '15px 0', color: '#333' }}>{course.enrollments}</td>
                  <td style={{ padding: '15px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: '#ffc107', marginRight: '5px' }}>
                        <i className="fa fa-star"></i>
                      </span>
                      <span style={{ color: '#333' }}>{course.rating}</span>
                    </div>
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      background: course.status === 'active' ? '#d4edda' : '#f8d7da',
                      color: course.status === 'active' ? '#155724' : '#721c24'
                    }}>
                      {course.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px 0' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(course)}
                        style={{
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handleStatusToggle(course.id)}
                        style={{
                          background: course.status === 'active' ? '#ffc107' : '#28a745',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <i className={`fa fa-${course.status === 'active' ? 'pause' : 'play'}`}></i>
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
                        style={{
                          background: '#dc3545',
                          color: 'white',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Course Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '30px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#333' }}>
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCourse(null);
                  setFormData({
                    title: "",
                    description: "",
                    price: "",
                    duration: "",
                    category: "",
                    instructor: "",
                    image: "",
                    status: "active"
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Instructor *
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., ₹6,999 or Free"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 6 months"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Select Category</option>
                    <option value="Aptitude">Aptitude</option>
                    <option value="Technical">Technical</option>
                    <option value="Career Guidance">Career Guidance</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Enter course description..."
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button
                  type="submit"
                  style={{
                    background: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingCourse(null);
                    setFormData({
                      title: "",
                      description: "",
                      price: "",
                      duration: "",
                      category: "",
                      instructor: "",
                      image: "",
                      status: "active"
                    });
                  }}
                  style={{
                    background: '#6c757d',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement; 