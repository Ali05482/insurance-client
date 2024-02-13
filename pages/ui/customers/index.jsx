import { useEffect, useState } from "react";
import FullLayout from "../../../src/layouts/FullLayout";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Customers = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("authToken")) {
  //     window.location.href = "/auth/login";
  //   }
  // }, []);
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    role: "patient",
    hospital: "",
    password: "",
  });
  const fetchPatient = async () => {
    try {
      const res = await fetch("https://insurance-server-ten.vercel.app/api/user/list");
      const data = await res.json();
      if (data?.status) {
        setPatients(data?.data);
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
      const res = await fetch("https://insurance-server-ten.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      const data = await res.json();
      if (data?.status) {
        alert("Patient added successfully");
        fetchPatient();
      } else {
        alert("Error adding patient1: Err" + JSON.stringify(data));
      }
    } catch (error) {
      console.log(error?.message);
      alert("Error adding patient2", JSON.stringify(error?.message));
    }
  };
  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };
  const [hospitals, setHospitals] = useState([]);
  const fetchHospital = async () => {
    try {
      const res = await fetch("https://insurance-server-ten.vercel.app/api/hospital/list");
      const data = await res.json();
      if (data?.status) {
        setHospitals(data?.data);
        setPatient({ ...patient, hospital: data?.data[0]?._id });
      } else {
        alert("Error fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPatient();
    fetchHospital();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEdit = (patient) => {
    setPatient(patient);
    setModal(!modal);
  };
  const handleEditSubmit = async (e) => {
    try {
      e?.preventDefault();
      const res = await fetch("https://insurance-server-ten.vercel.app/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patient),
      });
      const data = await res.json();
      if (data?.status) {
        alert("Patient updated successfully");
        fetchPatient();
        setModal(!modal);
      } else {
        console.log(data);
        alert("Error updating patient1", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error?.message);
      alert("Error updating patient2", JSON.stringify(error?.message));
    }
  };

  const [modal, setModal] = useState(false);
  return (
      <>
       <FullLayout>
      <Modal isOpen={modal}>
        <ModalHeader>Edit Patient</ModalHeader>
        <ModalHeader>
          <button onClick={() => setModal(false)} className="btn btn-danger">
            Close
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="card">
            <div className="card-header">
              <h3 className="title">Update Patients</h3>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Patient Name</b>
                      </label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        value={patient?.name}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Patient Contact</b>
                      </label>
                      <input
                        value={patient?.email}
                        name="email"
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Patient Password</b>
                      </label>
                      <input
                        value={patient?.password}
                        name="password"
                        type="text"
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
                                selected={patient?.hospital === hospital?._id}
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
            <h3 className="title">New Patients</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Patient Name</b>
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
                      <b>Patient Email</b>
                    </label>
                    <input
                      name="email"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Patient Password</b>
                    </label>
                    <input
                      type="text"
                      name="password"
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
            <h3 className="title">Patient List</h3>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  <th>Patient Email</th>
                  <th>Patient Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {patients?.map((patient, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{patient?.name}</td>
                    <td>{patient?.email}</td>
                    <td>{patient?.password}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(patient)}
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
      </>
  );
};

export default Customers;
