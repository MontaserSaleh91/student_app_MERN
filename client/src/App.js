import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState(0);

  const [newGrade, setNewGrade] = useState(0);

  const [studentList, setStudentList] = useState([]);

  const addStudent = () => {
    Axios.post("http://localhost:3080/create", {
      name: name,
      age: age,
      country: country,
      city: city,
      grade: grade,
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          name: name,
          age: age,
          country: country,
          city: city,
          grade: grade,
        },
      ]);
    });
  };

  const getStudents = () => {
    Axios.get("http://localhost:3080/students").then((response) => {
      setStudentList(response.data);
    });
  };

  const updateStudentGrade = (id) => {
    Axios.put("http://localhost:3080/update", { grade: newGrade, id: id }).then(
      (response) => {
        setStudentList(
          studentList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  city: val.city,
                  grade: newGrade,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteStudent = (id) => {
    Axios.delete(`http://localhost:3080/delete/${id}`).then((response) => {
      setStudentList(
        studentList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <h1>Add Student:</h1>
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>City:</label>
        <input
          type="text"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <label>Grade:</label>
        <input
          type="number"
          onChange={(event) => {
            setGrade(event.target.value);
          }}
        />
        <button className="add-btn" onClick={addStudent}>Add Student</button>
      </div>
      <div className="students">
        <button className="btn-student" onClick={getStudents}>Show All Students</button>

        {studentList.map((val, key) => {
          return (
            <div className="student">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>City: {val.city}</h3>
                <h3>Grade: {val.grade}</h3>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="input a new grade ..."
                  required
                  onChange={(event) => {
                    setNewGrade(event.target.value);
                  }}
                />
                <button
                className="btn-update"
                  onClick={() => {
                    updateStudentGrade(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                className="btn-delete"
                  onClick={() => {
                    deleteStudent(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;