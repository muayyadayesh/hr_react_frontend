import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../styles/style.css";
import axios from "axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const setData = async () => {
    const data = await fetch(`http://127.0.0.1:8000/hr/api/`, {
      method: "GET",
      headers: new Headers({
        "X-ADMIN": 1,
      }),
    });
    const result = await data.json();
    setEmployees(result);
    console.log(result);
  };

  const getLink = async (fileID) => {
    const headers = {
      "X-ADMIN": 1,
    };

    axios(`http://127.0.0.1:8000/hr/api/download/${fileID}/`, {
      method: "GET",
      headers: headers,
      responseType: "blob", //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setData();
  }, []);
  return (
    <div>
      <section className="intro">
        <div className="bg-image h-100">
          <div className="mask d-flex  h-100">
            <div className="container">
              <div className="row" style={{ padding: "50px" }}>
                <div className="col-12">
                  <div className="card bg-dark shadow-2-strong">
                    <div className="card-body">
                      <div className="table-responsive">
                        {employees?.length > 0 ? (
                          <table className="table table-dark table-borderless mb-0">
                            <thead>
                              <tr>
                                <th scope="col">EMPLOYEE</th>
                                <th scope="col">DOB</th>
                                <th scope="col">EXPERIENCE</th>
                                <th scope="col">DEPT</th>
                                <th scope="col">RESUME</th>
                              </tr>
                            </thead>
                            <tbody>
                              {employees.map((employee, idx) => (
                                <tr key={idx}>
                                  <th scope="row">{employee.full_name}</th>
                                  <td>{employee.date_of_birth}</td>
                                  <td>{employee.experience_years}</td>
                                  <td>{employee.department_id}</td>
                                  <td>
                                    <span
                                      onClick={() => getLink(employee.id)}
                                      download
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="white"
                                        className="bi bi-download"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                      </svg>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          "No employees found!"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
