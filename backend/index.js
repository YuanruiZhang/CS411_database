const express = require("express")
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var db = mysql.createConnection({ //need to confirm this part
    host:'35.192.126.71',
    port:'3306',
    user:'root',
    password:"C411projS",
    database:"tribridge" ,
    multipleStatements: true
})


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

db.connect(function(err) {
    if (err) throw err;
  });

////////stored procedure
// const sqlStoredProcedure = 
// `DROP PROCEDURE IF EXISTS generateReport;

// DELIMITER $$
// CREATE PROCEDURE generateReport()
//     BEGIN
// 	DECLARE done int default 0;
// 	DECLARE currmid int;
// 	DECLARE pnum int;
// 	DECLARE dnum int;
// 	DECLARE midcur CURSOR FOR SELECT MedCompanyID FROM Medical_companies;
// 	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

// 	DROP TABLE IF EXISTS medReport;

// 	CREATE TABLE medReport (
// 	    companyID int PRIMARY KEY,
// 	    name VARCHAR(255) NOT NULL,
// 	    report_num int,
// 	    patient_num int,
// 	    doctor_num int,
// 	    scale VARCHAR(10)
// 	    );
	    
// 	    OPEN midcur;
//         FETCH midcur INTO currmid; -- changed here
// 	    REPEAT
// 	    	-- FETCH midcur INTO currmid;
// 		INSERT INTO medReport(companyID, name) 
// 			SELECT m.MedCompanyID, m.MedCompanyName
// 			FROM Medical_companies m
// 			WHERE m.MedCompanyID = currmid;


		
// SET @patient_num =  (
// SELECT COUNT(DISTINCT r.PatientID) AS pnum
// FROM  Trials t JOIN 
// (SELECT *
// FROM Reports r0
// WHERE r0.FeedbackID IS NOT NULL AND r0.ObservationID IS NOT NULL) r
// ON t.TrialID = r.TrialID
// WHERE t.MedCompanyID = currmid);

// 		UPDATE medReport
// 		SET patient_num = @patient_num
// 		WHERE companyID = currmid;

		
		
// SET @doctor_num =  (
// SELECT COUNT(DISTINCT r.DoctorID) AS dnum
// FROM  Trials t JOIN 
// (SELECT *
// FROM Reports r0
// WHERE r0.FeedbackID IS NOT NULL AND r0.ObservationID IS NOT NULL) r
// ON t.TrialID = r.TrialID
// WHERE t.MedCompanyID = currmid);
		
// UPDATE medReport
// 		SET doctor_num = @doctor_num
// WHERE companyID = currmid;



// SET @report_num =  (
// SELECT COUNT(DISTINCT r.ReportID) AS rnum
// FROM  Trials t JOIN 
// (SELECT *
// FROM Reports r0
// WHERE r0.FeedbackID IS NOT NULL AND r0.ObservationID IS NOT NULL) r
// ON t.TrialID = r.TrialID
// WHERE t.MedCompanyID = currmid);

// 		UPDATE medReport
// 		SET report_num = @report_num
// 		WHERE companyID = currmid;

// 		IF @report_num >= 3 OR @patient_num >= 2 OR @doctor_num >= 2
// 		THEN
// 		UPDATE medReport
// 		SET scale = 'Large'
// 		WHERE companyID = currmid;
		
// 		ELSE
// 		UPDATE medReport
// 		SET scale = 'Small'
// 		WHERE companyID = currmid;
// 		END IF;
// FETCH midcur INTO currmid; -- changed here
// UNTIL done
// END REPEAT;

// close midcur;
// END$$
// DELIMITER ;

// CALL generateReport();

// SELECT * FROM medReport;
// `;
// db.query(sqlStoredProcedure, (err, result) => {
//     console.log("create procedure");
// });



app.get("/generateReport", (require, response) => {
    console.log("running stored procedure");
    const sqlCallProcedure = `CALL generateReport();
                           SELECT * FROM medReport;`
    db.query(sqlCallProcedure, (err, result) => {
        console.log("generate done");
        if (err) 
            console.log(err);
        response.send(result);
    });
});
////////end stored procedure









//The next 4 are doctors
app.post("/Doctors/insert", (require, response) => {
    // const tableName = require.body.tableName;
    const Fname = require.body.docfname;
    const Lname = require.body.docLname;
    const Affi = require.body.docAffil;
    const Email = require.body.docEmail;///tbd


    const sqlInsert = "INSERT INTO Doctors (Fname, Lname, Affiliation, Email) VALUES (?,?,?,?)";
    db.query(sqlInsert, [Fname, Lname, Affi, Email], (err, result) => {
        console.log(result)
        //response.send(result.affectedRows)
    })
});

app.post("/Doctors/search", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const docFname = require.body.docFname;
    const docLname = require.body.docLname;
    // const patEmail = require.body.patEmail;
    //response.send(require);


    const sqlSelect = "SELECT * FROM Doctors WHERE Fname = ? AND Lname = ?"; // AND Email = ?
    db.query(sqlSelect, [docFname, docLname], (err, result) => { //,patEmail
        response.send(result);
    });
});


app.put("/Doctors/update/", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const doctorID = require.body.docID;
    // const attrChange = require.body.attrChange;
    const docNewAffli = require.body.docNewAffli;
    const docNewEmail = require.body.docNewEmail;
    console.log(require.body)
    if(docNewEmail !== null){
        if (docNewAffli !== null){
            const sqlUpdate = "UPDATE Doctors SET Email = ?, Affliation = ? WHERE DoctorID= ?";
            let var_array = [docNewEmail, docNewAffli, doctorID]
            
        }
        else{
            const sqlUpdate = "UPDATE Doctors SET Email = ? WHERE DoctorID= ?";
            let var_array = [docNewEmail, doctorID]
        }
    }
    else{
        const sqlUpdate = "UPDATE Doctors SET Affliation = ? WHERE DoctorID= ?";
        let var_array = [docNewAffli, doctorID]
    }


    // const sqlUpdate = "UPDATE Doctors SET Email = ?, Affliation = ? WHERE DoctorID= ?";
    db.query(sqlUpdate, var_array, (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
});

app.post("/Doctors/delete", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.docID;
    console.log(value)
    const sqlDelete = "DELETE FROM doctors WHERE DoctorID = ?";
    db.query(sqlDelete, value, (err, result) => {
        if (err) 
        console.log(err);
        response.send('1');
    })
});

//the next 4 are patients
app.post("/patient/insert", (require, response) => {
    // const tableName = require.body.tableName;
    const Fname = require.body.patfname;
    const Lname = require.body.patLname;
    const DoB  = require.body.patDoB;
    const Gender = require.body.Gender;
    const Address = require.body.Address;
    const State = require.body.State;
    const Email = require.body.patEmail;///tbd
    const Description = require.body.Description; 


    const sqlInsert = "INSERT INTO Patients (Fname, Lname, DoB, Gender, Address, State, Email, Description) \
    VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [Fname, Lname, DoB, Gender, Address, State, Email, Description], (err, result) => {
        console.log(result)
        //response.send(result.affectedRows)
    })
});

app.post("/patient/search", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const patFname = require.body.patFname;
    const patLname = require.body.patLname;
    // const patEmail = require.body.patEmail;
    //response.send(require);

    const sqlSelect = "SELECT * FROM Patients WHERE Fname = ? AND Lname = ? ";//AND Email = ?
    db.query(sqlSelect, [patFname, patLname], (err, result) => {//,patEmail
        response.send(result);
    });
});

//to be continue
app.put("/patient/update/", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const patientID = require.body.patID;
    // const attrChange = require.body.attrChange;
    
    const Fname = require.body.patfname;
    const Lname = require.body.patLname;
    const DoB  = require.body.patDoB;
    const Address = require.body.Address;
    const State = require.body.State;
    const Email = require.body.patEmail;///tbd
    const Description = require.body.Description;
    console.log(require.body)


    const sqlUpdate = "UPDATE Patients SET Fname = ?, Lname = ?, DoB = ?, \
    Address = ?, State = ?, Email = ?, Description = ? WHERE PatientID= ?";
    db.query(sqlUpdate, [Fname, Lname, DoB, Address, State, Email, Description, patientID], (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
});

app.post("/patient/delete", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.patID;
    console.log(value)
    const sqlDelete = "DELETE FROM Patients WHERE PatientID = ?";
    db.query(sqlDelete, value, (err, result) => {
        if (err) 
        console.log(err);
        response.send('1');
    })
});

//the next 4 are trials
app.post("/trial/insert", (require, response) => {
    // const tableName = require.body.tableName;
    const title = require.body.title;
    const MedCID = require.body.MedCompID;

    const Description = require.body.Description; 


    const sqlInsert = "INSERT INTO Trials (Title, Description, MedCompanyID) \
    VALUES (?,?,?)";
    db.query(sqlInsert, [title, Description, MedCID], (err, result) => {
        console.log(result)
        //response.send(result.affectedRows)
    })
});

app.post("/trial/search", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const title = require.body.title;
    // const patEmail = require.body.patEmail;
    //response.send(require);

    const sqlSelect = "SELECT * FROM Trials WHERE Title = ?";//AND Email = ?
    db.query(sqlSelect, [title], (err, result) => {//,patEmail
        response.send(result);
    });
});

//to be continue
app.put("/trial/update/", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const trialID = require.body.trialID;
    // const attrChange = require.body.attrChange;
    
    const Description = require.body.Description;
    const MedCID = require.body.MedCompID;
    console.log(require.body)


    const sqlUpdate = "UPDATE Trials SET Description = ?, MedCompanyID = ? WHERE TrialID= ?";
    db.query(sqlUpdate, [Description, MedCID, trialID], (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
});

app.post("/trial/delete", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.MedCID;
    console.log(value)
    const sqlDelete = "DELETE FROM Trials WHERE MedCompanyID = ?";
    db.query(sqlDelete, value, (err, result) => {
        if (err) 
        console.log(err);
        response.send('1');
    })
});

//the next 4 are reports
app.post("/report/insert", (require, response) => {
    // const tableName = require.body.tableName;
    const patientID = require.body.patID;
    const doctorID = require.body.docID;
    const trialID = require.body.trialID;
    const Date_ = require.body.date; 


    const sqlInsert = "INSERT INTO Reports (PatientID, DoctorID, TrialID, Date) \
    VALUES (?,?,?)";
    db.query(sqlInsert, [patientID, doctorID, trialID, Date_], (err, result) => {
        console.log(result)
        //response.send(result.affectedRows)
    })
});

app.post("/report/search", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const title = require.body.patientID;
    // const patEmail = require.body.patEmail;
    //response.send(require);

    const sqlSelect = "SELECT * FROM Reports WHERE PatientID = ?";//AND Email = ?
    db.query(sqlSelect, [title], (err, result) => {//,patEmail
        response.send(result);
    });
});

//to be continue
app.put("/report/update/", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const patientID = require.body.patID;
    const doctorID = require.body.docID;
    const trialID = require.body.trialID;
    const Date_ = require.body.date; 
    const ReportID = require.body.reportID;

    console.log(require.body)


    const sqlUpdate = "UPDATE Trials SET PatientID = ?, DoctorID = ?, Date = ?, TrialID= ? WHERE ReportID= ?";
    db.query(sqlUpdate, [patientID, doctorID, Date_, trialID, ReportID], (err, result) => {
        if (err) 
        console.log(err);
        response.send(result);
    })
});

app.post("/report/delete", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    const value = require.body.reportID;
    console.log(value)
    const sqlDelete = "DELETE FROM Reports WHERE ReportID = ?";
    db.query(sqlDelete, value, (err, result) => {
        if (err) 
        console.log(err);
        response.send('1');
    })
});

// Check how many patients total each medical company have 
app.get("/api/totalPatients", (require, response) => {
    // const tableName = require.body.tableName;
    // const attr = require.body.attr;
    // const value = require.body.value;
    console.log("running query")
    const sqlSelect = "SELECT m.MedCompanyName AS company_name, temp.mid, temp.pnum as total_patient \
    FROM Medical_companies m \
        JOIN(SELECT t.MedCompanyID AS mid, COUNT(DISTINCT r.PatientID) AS pnum \
                FROM  Trials t JOIN Reports r ON t.TrialID = r.TrialID \
                GROUP BY t.MedCompanyID) temp ON m.MedCompanyID = temp.mid \
    ORDER BY company_name, temp.mid";
    db.query(sqlSelect, (err, result) => {
        response.send(result);
    });
});

// Count number of reports in each company generated before 'some time'like '2021-03-11 02:06:23'
app.post("/api/reportsPerCompany", (require, response) => {
    const date = require.body.date;
    //console.log(date)
    const sqlSelect = "SELECT mc.MedCompanyName, count(r.ReportID) as total  \
    FROM Medical_companies mc \
    JOIN Trials t ON mc.MedCompanyID = t.MedCompanyID \
    JOIN Reports r ON t.TrialID = r.TrialID\
    WHERE r.Date < ?\
    GROUP BY mc.MedCompanyName";
    db.query(sqlSelect, date, (err, result) => {
        response.send(result);
    });
});




app.listen(3002, () => {
    console.log("running on port 3002");
})