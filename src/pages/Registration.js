import React from "react";
import axios from "axios";

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      full_name: "",
      date_of_birth: "",
      experience_years: 1,
      department_id: "IT",
      resume_file: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFileInput = this.handleFileInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value,
    });
  }
  handleFileInput(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.files[0],
    });
  }

  handleSubmit(event) {
    const formData = new FormData();
    formData.append("full_name", this.state.full_name);
    formData.append("date_of_birth", this.state.date_of_birth);
    formData.append("experience_years", this.state.experience_years);
    formData.append("department_id", this.state.department_id);
    formData.append("resume_file", this.state.resume_file);

    for (var [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios
      .post("http://127.0.0.1:8000/hr/api/", formData)
      .then((res) => {
        alert("Application sent succesfully!");
        window.location.href = "/employees";
      })
      .catch((err) =>
        alert("error sending your application, please try again!")
      );

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <section className="vh-100" style={{ backgroundColor: "#2779e2" }}>
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-xl-9" style={{ margin: "100px" }}>
                <h1 className="text-white mb-4">Apply for a job</h1>

                <div className="card" style={{ borderRadius: "15px;" }}>
                  <form onSubmit={this.handleSubmit}>
                    <div className="card-body">
                      <div className="row align-items-center pt-4 pb-3">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">Full name</h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <input
                            name="full_name"
                            type="text"
                            className="form-control form-control-lg"
                            value={this.state.full_name}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>

                      <hr className="mx-n3" />

                      <div className="row align-items-center py-3">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">Date of birth</h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <input
                            type="date"
                            name="date_of_birth"
                            className="form-control form-control-lg"
                            value={this.state.date_of_birth}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>

                      <hr className="mx-n3" />

                      <div className="row align-items-center py-3">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">Years of experience</h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <input
                            type="number"
                            name="experience_years"
                            className="form-control form-control-lg"
                            value={this.state.experience_years}
                            onChange={this.handleChange}
                            min={0}
                            max={50}
                            required
                          />
                        </div>
                      </div>
                      <hr className="mx-n3" />

                      <div className="row align-items-center py-3">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">Department</h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <select
                            name="department_id"
                            className="form-control form-control-lg"
                            value={this.state.department_id}
                            onChange={this.handleChange}
                          >
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                          </select>
                        </div>
                      </div>

                      <hr className="mx-n3" />

                      <div className="row align-items-center py-3">
                        <div className="col-md-3 ps-5">
                          <h6 className="mb-0">Upload CV</h6>
                        </div>
                        <div className="col-md-9 pe-5">
                          <input
                            name="resume_file"
                            className="form-control form-control-lg"
                            type="file"
                            accept=".docx,.pdf"
                            onChange={this.handleFileInput}
                            required
                          />
                          <div className="small text-muted mt-2">
                            Upload your CV/Resume or any other relevant file.
                            Max file size 50 MB <b>(pdf/docx)</b>
                          </div>
                        </div>
                      </div>

                      <hr className="mx-n3" />

                      <div className="px-5 py-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                        >
                          Send application
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Registration;
