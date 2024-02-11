import { useEffect, useState } from "react";
import FullLayout from "../../../src/layouts/FullLayout";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Hospital = () => {
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      window.location.href = '/auth/login';
    }
  }, []);
  const [hospitals, setHospitals] = useState([]);
  const [hospital, setHospital] = useState({
    name: "",
    contact: "",
    address: "",
  });
  const fetchHospital = async () => {
    try {
      const res = await fetch("http://localhost:6001/api/hospital/list");
      const data = await res.json();
      if(data?.status){
        setHospitals(data?.data)
      } else {
        alert("Error fetching data")
      }
    } catch (error) {
     console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();
      const res = await fetch("http://localhost:6001/api/hospital/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
      });
      const data = await res.json();
      if(data?.status){
        alert("Hospital added successfully")
        fetchHospital();
      } else {
        console.log(data)
        alert("Error adding hospital1", JSON.stringify(data))
      }
    } catch (error) {
      console.log(error?.message)
      alert("Error adding hospital2", JSON.stringify(error?.message))
    }
  };
  const handleChange = (e) => {
    setHospital({ ...hospital, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchHospital();
  }, []);
  const handleEdit = (hospital) => {
    setHospital(hospital);
    setModal(!modal);
  }
  const handleEditSubmit = async (e) => { 
    try {
      e?.preventDefault();
      const res = await fetch("http://localhost:6001/api/hospital/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hospital),
      });
      const data = await res.json();
      if(data?.status){
        alert("Hospital updated successfully")
        fetchHospital();
        setModal(!modal);
      } else {
        console.log(data)
        alert("Error updating hospital1", JSON.stringify(data))
      }
    } catch (error) {
      console.log(error?.message)
      alert("Error updating hospital2", JSON.stringify(error?.message))
    }
  }
  const [modal, setModal] = useState(false);
  return (
    <FullLayout>
      <Modal isOpen={modal}  >
        <ModalHeader >Edit Hospital</ModalHeader>
        <ModalHeader ><button onClick={()=>setModal(false)} className="btn btn-danger">Close</button></ModalHeader>
        <ModalBody>
        <div className="card">
          <div className="card-header">
            <h3 className="title">Update Hospitals</h3>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Hospital Name</b>
                    </label>
                    <input name="name" type="text" className="form-control"
                    onChange={handleChange}
                    value={hospital?.name}
                     />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Hospital Contact</b>
                    </label>
                    <input
                    value={hospital?.contact}
                      name="contact"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Hospital Address</b>
                    </label>
                    <textarea
                      name="address"
                      id=""
                      cols="5"
                      rows="5"
                      className="form-control"
                      onChange={handleChange}
                      value={hospital?.address}
                    >
                      {hospital?.address} 
                    </textarea>
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
            <h3 className="title">New Hospitals</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Hospital Name</b>
                    </label>
                    <input name="name" type="text" className="form-control"
                    onChange={handleChange} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Hospital Contact</b>
                    </label>
                    <input
                      name="contact"
                      type="text"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Hospital Address</b>
                    </label>
                    <textarea
                      name="address"
                      id=""
                      cols="5"
                      rows="5"
                      className="form-control"
                      onChange={handleChange}
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
        <div className="card">
          <div className="card-header">
            <h3 className="title">Hospital List</h3>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hospital Name</th>
                  <th>Hospital Address</th>
                  <th>Hospital Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hospitals?.map((hospital, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{hospital?.name}</td>
                    <td>{hospital?.address}</td>
                    <td>{hospital?.contact}</td>
                    <td>
                      <button onClick={()=>handleEdit(hospital)} className="btn btn-primary btn-sm mx-3 my-3">
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

export default Hospital;
