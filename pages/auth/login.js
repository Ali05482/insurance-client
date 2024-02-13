import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
     const response = await fetch('https://insurance-server-ten.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status) {
        localStorage.setItem('authToken', data.data);
        window.location.href = '/';
      } else {
        alert(data.message);
      }        
    } catch (error) {
        alert(error.message);
    }
  };

  return (
    <div className="container">
      <div id="loginbox" style={{ marginTop: '50px' }} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div className="panel panel-info">
          <div className="panel-heading">
            <div className="panel-title">Sign In</div>
          </div>
          <div style={{ paddingTop: '30px' }} className="panel-body">
            <div style={{ display: 'none' }} id="login-alert" className="alert alert-danger col-sm-12"></div>
            <form onSubmit={handleSubmit} id="loginform" className="form-horizontal" role="form">
              <div style={{ marginBottom: '25px' }} className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-user"></i>
                </span>
                <input
                  required
                  onChange={handleChange}
                  id="login-username"
                  type="text"
                  className="form-control"
                  name="email"
                  value={formData.username}
                  placeholder="username or email"
                />
              </div>
              <div style={{ marginBottom: '25px' }} className="input-group">
                <span className="input-group-addon">
                  <i className="glyphicon glyphicon-lock"></i>
                </span>
                <input
                  required
                  id="login-password"
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="password"
                />
              </div>
              <div style={{ marginTop: '10px' }} className="form-group">
                <div className="col-sm-12 controls">
                  <button type='submit' id="btn-login" className="btn btn-success">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
