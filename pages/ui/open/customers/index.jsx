import { useEffect, useState } from "react";
import Insurance from "../insurance";
import SignaturePad from "../insurance/signaturePad";
const Customers = () => {

  const [patients, setPatients] = useState([]);
  const [plan,setPlan] = useState("");
  const [hospital,setHospital] = useState("");  
  const [signature, setSignature] = useState("");
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    role: "patient",
    hospital: "",
    password: "",
  });
  const [plans, setPlans] = useState([]);
  const fetchPlan = async () => {
    try {
      const res = await fetch("https://insurance-server-ten.vercel.app/api/plans/list");
      const data = await res.json();
      if (data?.status) {
        console.log("data?.data[0]?._id", data?.data[0]?._id);
        setPlans(data?.data);
        setPlan(data?.data[0]?._id);
      } else {
        alert("Error fetching plans");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  const handleSubmitInsurance = async (insurance) => {
    try {
      const res = await fetch("http://localhost:4001/api/insurance/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insurance),
      });
      const data = await res.json();
      if (data?.status) {
        alert("Insurance added successfully, Please check your email for verification");
      } else {
        console.log(data);
        alert("Error adding insurance1:Err" + JSON.stringify(data));
      }
    } catch (error) {
      console.log(error?.message);
      alert("Error adding insurance2", JSON.stringify(error?.message));
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
      await handleSubmitInsurance({
        patient: data?.data?._id,
        plan: plan,
        status: "approved",
        signature: signature,
        hospital:hospital
      })
        alert("Patient added successfully");
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
    if(e.target.name == "hospital"){
      setHospital(e?.target?.value);
    }
    if
  };
  const [hospitals, setHospitals] = useState([]);
  const fetchHospital = async () => {
    try {
      const res = await fetch("https://insurance-server-ten.vercel.app/hospital/list");
      const data = await res.json();
      if (data?.status) {
        setHospitals(data?.data);
        setPatient({ ...patient, hospital: data?.data[0]?._id });
        setHospital(data?.data[0]?._id)
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
    fetchPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleEdit = (patient) => {
    setPatient(patient);
    setModal(!modal);
  };
  const [insurance, setInsurance] = useState({
    patient: "",
    plan: "",
    status: "approved",
    signature: "",
  });
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
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h3 className="title">Register Your Self</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">
                      <b>Your Name</b>
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
                      <b>Your Email</b>
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
                      <b>Your Temporary Password</b>
                    </label>
                    <input
                      type="password"
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
                    <select onChange={handleChange} name="hospital" className="form-control" id="">
                      {hospitals?.map((hospital, index) => (
                        <option key={index} value={hospital?._id}>
                          {hospital?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="container">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="title">Insurance</h3>
                    </div>
                    <div className="card-body">
                      <div className="row">
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
                              <b>Enter Digital Signature</b>
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
                      </div>
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
      </div>
    </>
  );
};

export default Customers;
