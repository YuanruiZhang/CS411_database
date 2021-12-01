import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios'

function App() {
  const [hasError, sethasError] = useState(false);


  // for insert

  // patient
  const [patID, setpatID] = useState('');
  const [patFname, setpatFname] = useState('');
  const [patLname, setpatLname] = useState('');
  const [patDOB, setpatDOB] = useState('');
  const [patGender, setpatGender] = useState('');
  const [patAddr, setpatAddr] = useState('');
  const [patState, setpatState] = useState('');
  const [patEmail, setPatEmail] = useState('');
  const [patDescription, setpatDescription] = useState('');
  const [sePatRow, setsePatRow]  = useState([]);


  const insertPatient = (patFname, patLname, patDoB, patGender, patAddr, patState, patEmail, patDescription) => { 
    Axios.post('http://localhost:3002/patient/insert', {
      patFname: patFname,
      patLname: patLname,
      patDoB: patDoB,
      Gender: patGender,
      Address: patAddr,
      State: patState,
      patEmail: patEmail,
      Description: patDescription
    }).then((response) => {
      setsePatRow(response.data)
    })
  };

  const selectPatient = (patFname,patLname) => {
    Axios.post('http://localhost:3002/patient/search', {
      patFname: patFname,
      patLname: patLname,
    })
    .then((response) => {
      if (response.data != []){
        setsePatRow(response.data[0])
      }
     
    })
  };

  const updatePatient = (patID, patFname, patLname, patDoB, Gender, Address, State, patEmail, Description) => {
    Axios.put(`http://localhost:3002/patient/update`, {
      patID: patID,
      patFname: patFname,
      patLname: patLname,
      patDoB: patDoB,
      Gender: Gender,
      Address: Address,
      State: State,
      patEmail, patEmail,
      Description, Description
    }).then((response) => {
      setsePatRow(response.data)
    })
  };

  const deletePatient = (patID) => {
    Axios.post(`http://localhost:3002/patient/delete`, {
      patID: patID
    });
  };

    // Doctor
    const [docID, setDocID] = useState('');
    const [docFname, setDocfname] = useState('');
    const [docLname, setDocLname] = useState('');
    const [docAffil, setDocAffil] = useState('');
    const [docEmail, setDocEmail] = useState('');
    const [seDocRow, setseDocRow]  = useState([]);
  
    const insertDoctor = (docFname, docLname, docAffil, docEmail) => { 
      Axios.post('http://localhost:3002/Doctors/insert', {
        docFname: docFname,
        docLname: docLname,
        docAffil: docAffil,
        docEmail: docEmail
      }).then((response) => {
        setseDocRow(response.data)
      })
    };
    
    const selectDoctor = (docFname,docLname) => {
      Axios.post('http://localhost:3002/Doctors/search', {
        docFname: docFname,
        docLname: docLname,
      })
      .then((response) => {
        if (response.data != []){
          setseDocRow(response.data[0])
        }
      })
    };

    const updateDoctor = (docID, docEmail,docAffil) => {
      Axios.put(`http://localhost:3002/Doctors/update`, {
        doctorID: docID,
        docNewEmail: docEmail,
        docNewAffli: docAffil
      }).then((response) => {
        setseDocRow(response.data)
      })
    };

    const deleteDoctor = (docID) => {
      Axios.post(`http://localhost:3002/Doctors/delete`, {
        docID: docID
      });
    };

    // trial
    const [trialID, settrialID] = useState('');
    const [trialTitle, settrialTitle] = useState('');
    const [trialMedCID, settrialMedCID] = useState('');
    const [trialDescription, settrialDescription] = useState('');
    const [trialRow, settrialRow]  = useState([]);

    const insertTrial = (trialTitle, trialMedCID, trialDescription) => { 
      Axios.post('http://localhost:3002/trial/insert', {
        title: trialTitle,
        MedCompID: trialMedCID,
        Description: trialDescription
      }).then((response) => {
        settrialRow(response.data)
      })
    };

    const selectTrial = (trialTitle) => {
      Axios.post('http://localhost:3002/trial/search', {
        title: trialTitle,
      })
      .then((response) => {
        if (response.data != []){
          settrialRow(response.data[0])
        }
      })
    };

    const updateTrial = (trialID, trialMedCID, trialDescription) => {
      Axios.put(`http://localhost:3002/trial/update/`, {
        trialID: trialID,
        MedCompID: trialMedCID,
        Description: trialDescription
      }).then((response) => {
        settrialRow(response.data)
      })
    };

    const deleteTrial = (trialMedCID) => {
      Axios.post(`http://localhost:3002/trial/delete`, {
        MedCID: trialMedCID
      });
    };

    // Report
    const [reportID, setreportID] = useState('');
    const [reportpatID, setreportpatID] = useState('');
    const [reportdocID, setreportdocID] = useState('');
    const [reporttrialID, setreporttrialID] = useState('');
    const [reportdate, setreportdate] = useState('');
    const [reportRow, setReportRow]  = useState([]);

    const insertReport = (reportpatID, reportdocID, reporttrialID,reportdate) => { 
      Axios.post('http://localhost:3002/report/insert', {
        patID: reportpatID,
        docID: reportdocID,
        trialID: reporttrialID,
        date: reportdate
      }).then((response) => {
        setReportRow(response.data)
      })
    };

    const selectReport = (reportpatID) => {
      Axios.post('http://localhost:3002/report/search', {
        patientID: reportpatID,
      })
      .then((response) => {
        if (response.data != []){
          setReportRow(response.data[0])
        }
      })
    };

    const updateReport = (reportID,reportpatID,reportdocID,reporttrialID, reportdate) => {
      Axios.put(`http://localhost:3002/report/update/`, {
        reportID: reportID,
        patID: reportpatID,
        docID: reportdocID,
        trialID: reporttrialID,
        date: reportdate,
      }).then((response) => {
        setReportRow(response.data)
      })
    };

    const deleteReport = (reportID) => {
      Axios.post(`http://localhost:3002/report/delete`, {
        reportID: reportID
      });
    };    




  // advance query 1
  const [patPerCompany, setpatPerCompany] = useState([]);
  const [PatPerCompanyBtn, setPatPerCompanyBtn] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/totalPatients').then((response) => {
      setpatPerCompany(response.data)
      console.log(response.data)
    })
  },[])

  // advance query 2
  const [pateintDate, setDate] = useState('');
  const [companyNameReport, setcompanyNameReport] = useState([]);
  // setcompanyNameReport([{"MedCompanyName": 'Zieme-Osinski', "total": 2}])

  const setReportDate = (pateintDate) => {
    Axios.post('http://localhost:3002/api/reportsPerCompany', {
      date: pateintDate
    }).then((response) => {
      console.log(response.data)
      setcompanyNameReport(response.data)
      // show in the front-end as a table or list or something.
    });
  }

  function printCompanyReports(props) {
    const isFilled = props.isFilled;
    if (isFilled) {
      return (<h1>Hello</h1>);
    };
  }
  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/totalPatients').then((response) => {
  //     console.log(response.data)
  //     setpatPerCompany(response.data)
  //   })
  // },[])
  

  return (
    <div className="App">
      {/* <p>{patPerCompany}</p> */}
      <h1>Tribrdige DB demo</h1>
      {/* <div className="form">
        <label>Patient Name: </label>
        <input type="text" name="movieName"/>

        <button>Submit</button>
      </div> */}
      <div className = "horizBox">

        <div className = "card">
          <h2>Reflecting Doctor</h2>
          <ol id="listView">
          <li>ID: {seDocRow.docID}</li>
          <li>First Name: {seDocRow.docFname}</li>
          <li>Last Name: {seDocRow.docLname}</li>
          <li>Email: {seDocRow.docEmail}</li>
          </ol>
        </div>

        <div className = "card">
        <h1> SELECT Doctor:  </h1>
        <p>First Name:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocfname(e.target.value)
        } }/>

        <p>Last Name:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocLname(e.target.value)
        } }/>
        
        <button onClick={() => {
                selectDoctor(docFname,docLname)
                // console.log("sePatID: ", sePatID)
        }}> SELECT</button>
      </div>

        <div className = "card">
          <h1> INSERT doctor:  </h1>
          <p>doctor first name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setDocfname(e.target.value)
          } }/>
          <p>doctor last name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setDocLname(e.target.value)
          } }/>
          <p>doctor Affiliation:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setDocAffil(e.target.value)
          } }/>
          <p>doctor Email:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setDocEmail(e.target.value)
          } }/>
          <button onClick={() => {
                  insertDoctor(docFname, docLname, docAffil, docEmail)
          }}> INSERT</button>
        </div>

        <div className = "card">
          <h1> Update Doctor:  </h1>
          <p>id:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setDocID(e.target.value)
          } }/>
          <p>new email:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setDocEmail(e.target.value)
          } }/>
          <p>new affliation:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setDocAffil(e.target.value)
          } }/>

          <button onClick={() => {
                  updateDoctor(docID,docEmail, docAffil)
          }}> Update</button>
        </div>

        <div className = "card">
        <h1> Delete Doctor:  </h1>
        <p>id:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocID(e.target.value)
        } }/>

        <button onClick={() => {
                deleteDoctor(patID)
        }}> delete</button>
      </div>

      </div>

      <div className = "horizBox">

        <div className = "cardPatient">
          <h2>Reflecting Patient</h2>
          <ol id="listView">
          <li>ID: {sePatRow.PatientID}</li>
          <li>First Name: {sePatRow.Fname}</li>
          <li>Last Name: {sePatRow.Lname}</li>
          <li>Email: {sePatRow.Email}</li>
          </ol>
        </div>

        <div className = "cardPatient">
        <h1> SELECT Patient:  </h1>
        <p>First Name:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setpatFname(e.target.value)
        } }/>

        <p>Last Name:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setpatLname(e.target.value)
        } }/>

        <p>Email: </p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setPatEmail(e.target.value)
        } }/>

        <button onClick={() => {
                selectPatient(patFname,patLname)
                // console.log("sePatID: ", sePatID)
        }}> SELECT</button>
      </div>

        <div className = "cardPatient">
          <h1> INSERT Patient:  </h1>
          <p>Patient first name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatFname(e.target.value)
          } }/>
          <p>Patient last name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatLname(e.target.value)
          } }/>
          <p>Patient DOB:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatDOB(e.target.value)
          } }/>
          <p>Patient Gender:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatGender(e.target.value)
          } }/>
          <p>Patient Addr:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatAddr(e.target.value)
          } }/>
          <p>Patient State:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatState(e.target.value)
          } }/>
          <p>Patient Email:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setPatEmail(e.target.value)
          } }/>
          <p>Patient Description:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatDescription(e.target.value)
          } }/>
          <button onClick={() => {
                  insertPatient(patFname, patLname, patDOB, patGender, patAddr, patState, patEmail, patDescription) 
          }}> INSERT</button>
        </div>

        <div className = "cardPatient">
          <h1> Update Patient:  </h1>
          <p>Patient ID:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatID(e.target.value)
          } }/>
          <p>Patient first name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatFname(e.target.value)
          } }/>
          <p>Patient last name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatLname(e.target.value)
          } }/>
          <p>Patient DOB:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatDOB(e.target.value)
          } }/>
          <p>Patient Gender:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatGender(e.target.value)
          } }/>
          <p>Patient Addr:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatAddr(e.target.value)
          } }/>
          <p>Patient State:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatState(e.target.value)
          } }/>
          <p>Patient Email:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setPatEmail(e.target.value)
          } }/>
          <p>Patient Description:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatDescription(e.target.value)
          } }/>

          <button onClick={() => {
                  updatePatient(docID,patFname, patLname, patDOB, patGender, patAddr, patState, patEmail, patDescription,)
          }}> Update</button>
        </div>

        <div className = "cardPatient">
        <h1> Delete Patient:  </h1>
        <p>id:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setpatID(e.target.value)
        } }/>

        <button onClick={() => {
                deletePatient(patID)
        }}> delete</button>
      </div>
    </div>


    
    <div className = "horizBox">
      <div className = "card">
        <h2>Reflecting Trial</h2>
        <ol id="listView">
        <li>trialID: {trialRow.trialID}</li>
        <li>trialTitle: {trialRow.trialTitle}</li>
        <li>trialMedCID: {trialRow.trialMedCID}</li>
        <li>trialDescription: {trialRow.trialDescription}</li>
        </ol>
      </div>

      <div className = "card">
      <h1> SELECT Trial:  </h1>
      <p>Trial Title:</p>
      <input type="text" id="patSelectInput" onChange={(e) => {
              settrialTitle(e.target.value)
      } }/>

      <button onClick={() => {
              selectTrial(trialTitle)
      }}> SELECT</button>
      </div>

      <div className = "card">
        <h1> INSERT Trial:  </h1>
        <p>Trial title:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                settrialTitle(e.target.value)
        } }/>
        <p>Trial MedCompID:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                settrialMedCID(e.target.value)
        } }/>
        <p>Trial Description:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                settrialDescription(e.target.value)
        } }/>
        <button onClick={() => {
                insertTrial(trialTitle, trialMedCID, trialDescription)
        }}> INSERT</button>
      </div>

      <div className = "card">
        <h1> Update Trial:  </h1>
        <p>id:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                settrialID(e.target.value)
        } }/>
        <p>new med company ID:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                settrialMedCID(e.target.value)
        } }/>
        <p>new trial Description:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                settrialDescription(e.target.value)
        } }/>

        <button onClick={() => {
                updateTrial(trialID, trialMedCID, trialDescription)
        }}> Update</button>
      </div>

      <div className = "card">
      <h1> Delete Trial:  </h1>
      <p>id:</p>
      <input type="text" id="patSelectInput" onChange={(e) => {
              settrialID(e.target.value)
      } }/>

      <button onClick={() => {
              deleteTrial(patID)
      }}> delete</button>
    </div>
    </div>

<div className = "horizBox">

<div className = "card">
  <h2>Reflecting Report</h2>
  <ol id="listView">
  <li>reportID: {trialRow.reportID}</li>
  <li>reportpatID: {trialRow.reportpatID}</li>
  <li>reportdocID: {trialRow.reportdocID}</li>
  <li>reporttrialID: {trialRow.reporttrialID}</li>
  </ol>
</div>

<div className = "card">
<h1> SELECT Report:  </h1>
<p>Trial Title:</p>
<input type="text" id="patSelectInput" onChange={(e) => {
        setreportpatID(e.target.value)
} }/>

<button onClick={() => {
        selectReport(reportpatID)
}}> SELECT</button>
</div>

<div className = "card">
  <h1> INSERT Report:  </h1>
  <p>Report patID:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreportpatID(e.target.value)
  } }/>
  <p>Report docID:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreportdocID(e.target.value)
  } }/>
  <p>Report trialID:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreporttrialID(e.target.value)
  } }/>
  <p>Report Date:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreportdate(e.target.value)
  } }/>
  <button onClick={() => {
          insertTrial(trialTitle, trialMedCID, trialDescription)
  }}> INSERT</button>
</div>

<div className = "card">
  <h1> Update Report:  </h1>
  <p>Report ID:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreportID(e.target.value)
  } }/>
  <p>Report patID:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreportpatID(e.target.value)
  } }/>
  <p>Report docID:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreportdocID(e.target.value)
  } }/>
  <p>Report trialID:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreporttrialID(e.target.value)
  } }/>
  <p>Report Date:</p>
  <input type="text" id="patSelectInput" onChange={(e) => {
          setreportdate(e.target.value)
  } }/>

  <button onClick={() => {
          updateReport(reportID,reportpatID,reportdocID,reporttrialID, reportdate)
  }}> Update</button>
</div>

<div className = "card">
<h1> Delete Report:  </h1>
<p>id:</p>
<input type="text" id="patSelectInput" onChange={(e) => {
        settrialID(e.target.value)
} }/>

<button onClick={() => {
        deleteTrial(patID)
}}> delete</button>
</div>

</div>

      <div className = "card">
        <h1> Update Doctor:  </h1>
        <p>Doctor id:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocID(e.target.value)
        } }/>
        <p>Doctor new email:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocEmail(e.target.value)
        } }/>

        <p>Doctor new Affiliation:</p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDocAffil(e.target.value)
        } }/>

        <button onClick={() => {
                updateDoctor(docID, docEmail,docAffil)
        }}> Update</button>
      </div>

      <div className = "card">
        <h1> Update Patient:  </h1>
        <p>Patient id:</p>
        <p>Patient first name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatFname(e.target.value)
          } }/>
          <p>Patient last name:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatLname(e.target.value)
          } }/>
          <p>Patient DOB:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatDOB(e.target.value)
          } }/>
          <p>Patient Gender:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatGender(e.target.value)
          } }/>
          <p>Patient Addr:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatAddr(e.target.value)
          } }/>
          <p>Patient State:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatState(e.target.value)
          } }/>
          <p>Patient Email:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setPatEmail(e.target.value)
          } }/>
          <p>Patient Description:</p>
          <input type="text" id="patSelectInput" onChange={(e) => {
                  setpatDescription(e.target.value)
          } }/>

        <button onClick={() => {
                updatePatient(patID, patFname, patLname, patDOB, patGender, patAddr, patState, patEmail, patDescription)
        }}> Update</button>
      </div>

      <div className = "card">
        <h1> Patient per Company </h1>
        <button onClick={() => {setPatPerCompanyBtn(true)}
        }> Check </button>
      </div>

      <div className = "card">
        <h1> Num Report Per Company </h1>
        <p>Date: </p>
        <input type="text" id="patSelectInput" onChange={(e) => {
                setDate(e.target.value)
        } }/>

        <button onClick={() => {setReportDate(pateintDate)}
        }> Check </button>
      </div>
    

      {/* <printCompanyReports isFilled={companyNameReport == []}/> */}




    <ul>
      {
        patPerCompany.map((val) => {
          if(PatPerCompanyBtn){

                return (
                    <li id="list-to-left">{val.company_name} : {val.total_patient}</li>        
                );
          }
              }
          )
        }   
      </ul>

      <ul>
        {
        companyNameReport.map((val) => {
            return (
              <li id="list-to-left">{val.MedCompanyName} : {val.total}</li>        
          );
               
              }
          )
        }   
      
    </ul>


    </div>

    
  );
}

export default App;
