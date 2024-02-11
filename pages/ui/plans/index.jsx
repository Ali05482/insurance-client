import { useEffect, useState } from "react";
import FullLayout from "../../../src/layouts/FullLayout";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Customers = () => {
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      window.location.href = "/auth/login";
    }
  }, []);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({
    name: "",
    type: "basic",
    price: "",
    duration: "",
    description: "",
    hospital: "",
  });
  const [hospitals, setHospitals] = useState([]);
  const fetchHospital = async () => {
    try {
      const res = await fetch("http://localhost:6001/api/hospital/list");
      const data = await res.json();
      if (data?.status) {
        setHospitals(data?.data);
        setPlan({ ...plan, hospital: data?.data[0]?._id });
      } else {
        alert("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();
      const res = await fetch("http://localhost:6001/api/plans/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      });
      const data = await res.json();
      if (data?.status) {
        alert("Plan added successfully");
        fetchPlan();
      } else {
        alert("Error adding plan1: Err" + JSON.stringify(data));
      }
    } catch (error) {
      console.log(error?.message);
      alert("Error adding plan2", JSON.stringify(error?.message));
    }
  };
  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };
  const fetchPlan = async () => {
    try {
      const res = await fetch("http://localhost:6001/api/plans/list");
      const data = await res.json();
      if (data?.status) {
        setPlans(data?.data);
        setPlan({ ...plan, plan: data?.data[0]?._id });
      } else {
        alert("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPlan();
    fetchHospital();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEdit = (plan) => {
    setPlan(plan);
    setModal(!modal);
  };
  const handleEditSubmit = async (e) => {
    try {
      e?.preventDefault();
      const res = await fetch("http://localhost:6001/api/plans/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      });
      const data = await res.json();
      if (data?.status) {
        alert("Plan updated successfully");
        fetchPlan();
        setModal(!modal);
      } else {
        console.log(data);
        alert("Error updating plan1", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error?.message);
      alert("Error updating plan2", JSON.stringify(error?.message));
    }
  };

  const [modal, setModal] = useState(false);
  return (
    <FullLayout>
      <Modal isOpen={modal}>
        <ModalHeader>Edit Plan</ModalHeader>
        <ModalHeader>
          <button onClick={() => setModal(false)} className="btn btn-danger">
            Close
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="card">
            <div className="card-header">
              <h3 className="title">Update Plans</h3>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Plan Name</b>
                      </label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={plan?.name}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Plan Type</b>
                      </label>
                      <select
                        value={plan?.type}
                        name="type"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                      >
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                        <option value="gold">Gold</option>
                        <option value="platinum">Platinum</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Plan Price</b>
                      </label>
                      <input
                        value={plan?.price}
                        name="price"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Plan Duration</b>
                      </label>
                      <input
                        value={plan?.duration}
                        name="duration"
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Select Hospital</b>
                      </label>
                      <select name="hospital" className="form-control" id="">
                        {hospitals?.map((hospital, index) => {
                          return (
                            <>
                              <option
                                key={index}
                                value={hospital?._id}
                                selected={plan?.hospital === hospital?._id}
                              >
                                {hospital?.name}
                              </option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Plan Description</b>
                      </label>
                      <textarea
                        value={plan?.description}
                        className="form-control"
                        onChange={handleChange}
                        name="description"
                        cols="2"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <button type="submit" className="btn btn-primary my-3">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h3 className="title">New Plans</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Plan Name</b>
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Plan Type</b>
                    </label>
                    <select
                      name="type"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="gold">Gold</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Plan Price</b>
                    </label>
                    <input
                      name="price"
                      type="number"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Plan Duration</b>
                    </label>
                    <input
                      name="duration"
                      type="number"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Plan Description</b>
                    </label>
                    <textarea
                      className="form-control"
                      onChange={handleChange}
                      name="description"
                      cols="2"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Select Hospital</b>
                    </label>
                    <select name="hospital" className="form-control" id="">
                      {hospitals?.map((hospital, index) => (
                        <option key={index} value={hospital?._id}>
                          {hospital?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <button type="submit" className="btn btn-primary my-3">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="title">Plan List</h3>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Plan Name</th>
                  <th>Plan Type</th>
                  <th>Plan Price</th>
                  <th>Plan Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {plans?.map((plan, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{plan?.name}</td>
                    <td>{plan?.type}</td>
                    <td>{plan?.price}</td>
                    <td>{plan?.description}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(plan)}
                        className="btn btn-primary btn-sm mx-3 my-3"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </FullLayout>
  );
};

export default Customers;
