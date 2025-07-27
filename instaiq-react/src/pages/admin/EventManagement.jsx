import React, { useState, useEffect } from "react";

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    price: "",
    category: "",
    image: "",
    status: "upcoming"
  });

  // Sample event data
  const sampleEvents = [
    {
      id: 1,
      title: "AI in Career Guidance Workshop",
      description: "An AI-driven system that recommends tailored study plans, practice tests, and resources based on user performance, role preferences, and career goals.",
      date: "2024-02-15",
      time: "09:00",
      location: "Nagpur, India",
      capacity: 100,
      price: "₹1,500",
      category: "Workshop",
      image: "assets/images/event/1.png",
      status: "upcoming",
      registrations: 75,
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      title: "Resume Building Bootcamp",
      description: "An online tool to create professional resumes and is a hands-on workshop where participants learn how to create job-winning resumes tailored for campus placements.",
      date: "2024-02-21",
      time: "11:00",
      location: "Nagpur, India",
      capacity: 50,
      price: "₹800",
      category: "Bootcamp",
      image: "assets/images/event/2.png",
      status: "upcoming",
      registrations: 42,
      createdAt: "2024-01-05"
    },
    {
      id: 3,
      title: "Aptitude Mastery Workshop",
      description: "Specialized training modules focused on quantitative aptitude, logical reasoning, critical thinking and verbal ability to excel in campus placement tests.",
      date: "2024-01-29",
      time: "09:00",
      location: "Nagpur, India",
      capacity: 80,
      price: "₹1,200",
      category: "Training",
      image: "assets/images/event/3.png",
      status: "completed",
      registrations: 80,
      createdAt: "2024-01-10"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents(sampleEvents);
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
    if (editingEvent) {
      // Update existing event
      setEvents(prev => prev.map(event => 
        event.id === editingEvent.id ? { ...event, ...formData } : event
      ));
      setEditingEvent(null);
    } else {
      // Add new event
      const newEvent = {
        id: Date.now(),
        ...formData,
        registrations: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setShowAddModal(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      price: "",
      category: "",
      image: "",
      status: "upcoming"
    });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowAddModal(true);
  };

  const handleDelete = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const handleStatusChange = (eventId, newStatus) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || event.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return { background: '#d1ecf1', color: '#0c5460' };
      case 'ongoing': return { background: '#d4edda', color: '#155724' };
      case 'completed': return { background: '#f8d7da', color: '#721c24' };
      case 'cancelled': return { background: '#f8f9fa', color: '#6c757d' };
      default: return { background: '#f8f9fa', color: '#6c757d' };
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px', color: '#007bff' }}></i>
        <p>Loading events...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, color: '#333' }}>Event Management</h2>
            <p style={{ margin: '5px 0 0 0', color: '#666' }}>Manage all events and workshops</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: '#ffc107',
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
            Create New Event
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
              Search Events
            </label>
            <input
              type="text"
              placeholder="Search by title, description, or location..."
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
              <option value="all">All Events</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
              Total Events
            </label>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>
              {filteredEvents.length}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {filteredEvents.map((event) => (
          <div key={event.id} style={{
            background: '#fff',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '18px' }}>
                  {event.title}
                </h3>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  ...getStatusColor(event.status)
                }}>
                  {event.status}
                </span>
              </div>
              <img
                src={event.image}
                alt={event.title}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                  marginLeft: '15px'
                }}
              />
            </div>

            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px', lineHeight: '1.5' }}>
              {event.description.substring(0, 100)}...
            </p>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-calendar" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>
                  {new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-clock-o" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>{event.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-map-marker" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>{event.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <i className="fa fa-users" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333' }}>
                  {event.registrations}/{event.capacity} registered
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <i className="fa fa-money" style={{ color: '#007bff', marginRight: '8px', width: '16px' }}></i>
                <span style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>{event.price}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleEdit(event)}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  flex: 1
                }}
              >
                <i className="fa fa-edit" style={{ marginRight: '5px' }}></i>
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  flex: 1
                }}
              >
                <i className="fa fa-trash" style={{ marginRight: '5px' }}></i>
                Delete
              </button>
            </div>

            {/* Status Change Dropdown */}
            <div style={{ marginTop: '10px' }}>
              <select
                value={event.status}
                onChange={(e) => handleStatusChange(event.id, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '12px',
                  background: '#fff'
                }}
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Event Modal */}
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
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingEvent(null);
                  setFormData({
                    title: "",
                    description: "",
                    date: "",
                    time: "",
                    location: "",
                    capacity: "",
                    price: "",
                    category: "",
                    image: "",
                    status: "upcoming"
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
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#666', fontSize: '14px' }}>
                    Event Title *
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
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
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
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
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
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
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
                    Capacity *
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    required
                    min="1"
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
                    placeholder="e.g., ₹1,500 or Free"
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
                    <option value="Workshop">Workshop</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Training">Training</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Conference">Conference</option>
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
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
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
                    placeholder="Enter event description..."
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
                    background: '#ffc107',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {editingEvent ? 'Update Event' : 'Create Event'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingEvent(null);
                    setFormData({
                      title: "",
                      description: "",
                      date: "",
                      time: "",
                      location: "",
                      capacity: "",
                      price: "",
                      category: "",
                      image: "",
                      status: "upcoming"
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

export default EventManagement; 