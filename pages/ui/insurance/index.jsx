/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import FullLayout from "../../../src/layouts/FullLayout";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import SignaturePad from "./signaturePad";

const Insurance = () => {
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      window.location.href = "/auth/login";
    }
  }, []);
  const [insurances, setInsurances] = useState([]);
  const [signature, setSignature] = useState("");
  const [patients, setPatients] = useState([]);
  const fetchPatient = async () => {
    try {
      const res = await fetch("https://insurance-server-ten.vercel.app/api/user/list");
      const data = await res.json();
      if (data?.status) {
        setPatients(data?.data);
      } else {
        alert("Error fetching patient");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [insurance, setInsurance] = useState({
    patient: "",
    plan: "",
    status: "pending",
    signature: "",
  });
  const fetchInsurance = async () => {
    try {
      const res = await fetch("https://insurance-server-ten.vercel.app/api/insurance/list");
      const data = await res.json();
      if (data?.status) {
        console.log("data?.data??", data);
        setInsurances(data?.data);
      } else {
        alert("Error fetching insurance");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();
      const res = await fetch("https://insurance-server-ten.vercel.app/api/insurance/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insurance),
      });
      const data = await res.json();
      if (data?.status) {
        alert("Insurance added successfully");
        fetchInsurance();
      } else {
        console.log(data);
        alert("Error adding insurance1:Err" + JSON.stringify(data));
      }
    } catch (error) {
      console.log(error?.message);
      alert("Error adding insurance2", JSON.stringify(error?.message));
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "plan") {
      const findPlan = plans?.find((plan) => plan?._id === e.target.value);
      setPlan(findPlan);
    }
    setInsurance({ ...insurance, [e.target.name]: e.target.value });
  };
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState([]);
  const fetchPlan = async () => {
    try {
      const res = await fetch("https://insurance-server-ten.vercel.app/api/plans/list");
      const data = await res.json();
      if (data?.status) {
        console.log("data?.data[0]?._id", data?.data[0]?._id);
        setPlans(data?.data);
        setPlan(data?.data[0]);
      } else {
        alert("Error fetching plans");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInsurance();
    fetchPatient();
    fetchPlan();
  }, []);
  const handleEdit = (insurance) => {
    setInsurance(insurance);
    setModal(!modal);
  };
  const handleEditSubmit = async (e) => {
    try {
      e?.preventDefault();
      console.log("insurance", insurance);
      const res = await fetch("https://insurance-server-ten.vercel.app/api/insurance/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insurance),
      });
      const data = await res.json();
      if (data?.status) {
        alert("Insurance updated successfully");
        fetchInsurance();
        setModal(!modal);
      } else {
        console.log(data);
        alert("Error updating insurance1", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error?.message);
      alert("Error updating insurance2", JSON.stringify(error?.message));
    }
  };
  const [modal, setModal] = useState(false);
  useEffect(() => {
    setInsurance({ ...insurance, signature: signature });
  }, [signature]);
  return (
    <FullLayout>
      <Modal isOpen={modal}>
        <ModalHeader>Edit Insurance</ModalHeader>
        <ModalHeader>
          <button onClick={() => setModal(false)} className="btn btn-danger">
            Close
          </button>
        </ModalHeader>
        <ModalBody>
          <div className="card">
            <div className="card-header">
              <h3 className="title">Update Insurances</h3>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Select Patient</b>
                      </label>
                      <select
                        name="patient"
                        id="patient"
                        className="form-control"
                        onChange={handleChange}
                      >
                        {patients?.map((patient, index) => (
                          <option
                            key={index}
                            value={patient?._id}
                            selected={patient?._id === insurance?.patient?._id}
                            onChange={handleChange}
                          >
                            {patient?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Select Plan</b>
                      </label>
                      <select name="plan" id="plan" className="form-control">
                        {plans?.map((plan, index) => (
                          <option
                            key={index}
                            value={plan?._id}
                            selected={plan?._id === insurance?.plan?._id}
                            onChange={handleChange}
                          >
                            {plan?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label htmlFor="">
                        <b>Enter Signature</b>
                      </label>
                      <div className="form-control">
                        <SignaturePad
                          isEdit={true}
                          signature={insurance?.signature}
                          setSignature={setSignature}
                        />
                      </div>
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
            <h3 className="title">New Insurances</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Select Patient</b>
                    </label>
                    <select
                      name="patient"
                      id="patient"
                      className="form-control"
                      onChange={handleChange}
                    >
                      <option selected value="">
                        Choose Patient
                      </option>
                      {patients?.map((patient, index) => (
                        <option key={index} value={patient?._id}>
                          {patient?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Select Plan</b>
                    </label>
                    <select
                      name="plan"
                      id="plan"
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option selected value="">
                        Choose Plan
                      </option>
                      {plans?.map((plan, index) => (
                        <option key={index} value={plan?._id}>
                          {plan?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Ebter Digital Signature</b>
                    </label>
                    <div className="form-control">
                      <SignaturePad
                        isEdit={false}
                        signature={signature}
                        setSignature={setSignature}
                      />
                    </div>
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
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <b>Selected Plan Details</b>
              </h3>
            </div>
            <div className="card-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Plan Type</th>
                    <th>Plan Price</th>
                    <th>Plan Description</th>
                  </tr>
                </thead>
                <tbody>
                  {plan && (
                    <tr>
                      <td>{plan?.name}</td>
                      <td>{plan?.type}</td>
                      <td>{plan?.price}</td>
                      <td>{plan?.description}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="title">Insurance List</h3>
          </div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Plan</th>
                  <th>Status</th>
                  <th>Signature</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {insurances?.map((insurance, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{insurance?.patient?.name}</td>
                    <td>{insurance?.plan?.name}</td>
                    <td>{insurance?.status}</td>
                    <td>
                      <img
                        className="signature-image"
                        alt="saved-signature"
                        src={insurance?.signature}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleEdit(insurance)}
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

export default Insurance;
