import React, { Component } from "react";
import Table from "react-bootstrap/Table";

let employeeData = [
    {
        id: 1,
        name: "John Paul",
        jobTitle: "Developer",
        dob: "1995-03-21",
        phoneNo: 9999999991,
        email: "john@gmail.com",
        eligibleForInsurance: true,
    },
    {
        id: 2,
        name: "Romin Irani",
        jobTitle: "Tester",
        dob: "1994-12-13",
        phoneNo: 9999999992,
        email: "romin@gmail.com",
        eligibleForInsurance: false,
    },
    {
        id: 3,
        name: "Mosh Hamedani",
        jobTitle: "Instructor",
        dob: "1990-08-05",
        phoneNo: 9999999993,
        email: "mosh@gmail.com",
        eligibleForInsurance: false,
    },
    {
        id: 4,
        name: "Neil Hanks",
        jobTitle: "Technical Support",
        dob: "1997-10-01",
        phoneNo: 9999999994,
        email: "neil@gmail.com",
        eligibleForInsurance: true,
    },
    {
        id: 5,
        name: "Maria Julie",
        jobTitle: "Architect",
        dob: "1984-08-17",
        phoneNo: 9999999995,
        email: "maria@gmail.com",
        eligibleForInsurance: true,
    },
];

class Employee extends Component {
    state = {
        employees: employeeData,
    };

    deleteBtn = (employee) => {
        const employees = this.state.employees.filter(
            (emp) => emp.id !== employee.id
        );
        this.setState({ employees });
    };

    editBtn = (employee) => {
        for (let key in employee) {
            if (key === "eligibleForInsurance")
                document.getElementById(key).checked = employee[key];
            else if (key === "dob")
                document.getElementById(key).value = employee[key];
            else document.getElementById(key).value = employee[key];
        }
        document.getElementById("update").style.display = "block";
        document.getElementById("submit").style.display = "none";
    };

    updateEmployee = (event) => {
        event.preventDefault();
        const id = document.getElementById("id").value;
        const updatedEmployee = this.createEmployee();
        const employees = this.state.employees.filter((emp) => emp.id != id);
        employees.push(updatedEmployee);
        this.setState({ employees });
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
        document.getElementById("myForm").reset();
    };

    createEmployee = () => {
        const employee = {
            id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            jobTitle: document.getElementById("jobTitle").value,
            dob: document.getElementById("dob").value,
            phoneNo: document.getElementById("phoneNo").value,
            email: document.getElementById("email").value,
            eligibleForInsurance: document.getElementById(
                "eligibleForInsurance"
            ).checked,
        };
        return employee;
    };

    addEmployee = (event) => {
        event.preventDefault();
        const id = document.getElementById("id").value;
        if (this.state.employees.map((emp) => emp.id == id).includes(true)) {
            window.alert("Employee ID already Exist");
            return;
        }

        const newEmployee = this.createEmployee();
        let employees = this.state.employees;
        employees.push(newEmployee);
        this.setState({ employees });
        document.getElementById("update").style.display = "none";
    };

    render() {
        const { length: employeeCount } = this.state.employees;
        if (employeeCount === 0) return <p>No employees in the database</p>;

        return (
            <React.Fragment>
                <p>Total employees = {employeeCount}</p>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>Date of Birth</th>
                            <th>Phone No</th>
                            <th>Email</th>
                            <th>Eligible For Insurance</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.jobTitle}</td>
                                <td>{employee.dob}</td>
                                <td>{employee.phoneNo}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <input
                                        style={{ pointerEvents: "none" }}
                                        type="checkbox"
                                        defaultChecked={
                                            employee.eligibleForInsurance
                                                ? "checked"
                                                : ""
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.deleteBtn(employee)}
                                        className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-secondary btn-sm mx-2"
                                        onClick={() => this.editBtn(employee)}>
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <form
                    id="myForm"
                    action=""
                    onSubmit={this.addEmployee}
                    style={{ marginTop: "3rem" }}>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Job Title</th>
                                <th>Date of Birth</th>
                                <th>Phone No</th>
                                <th>Email</th>
                                <th>Eligible For Insurance</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={this.state.employees.length + 1}>
                                <td>
                                    <input
                                        style={{ width: "2rem" }}
                                        type="number"
                                        id="id"
                                        defaultValue={
                                            this.state.employees.length + 1
                                        }
                                        required
                                    />
                                </td>
                                <td>
                                    <input type="text" id="name" required />
                                </td>
                                <td>
                                    <select
                                        name="jobTitle"
                                        id="jobTitle"
                                        required>
                                        <option value="Developer">
                                            Developer
                                        </option>
                                        <option value="Tester">Tester</option>
                                        <option value="Instructor">
                                            Instructor
                                        </option>
                                        <option value="Technical Support">
                                            Technical Support
                                        </option>
                                        <option value="Architect">
                                            Architect
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <input type="date" id="dob" required />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        id="phoneNo"
                                        min="1000000000"
                                        max="9999999999"
                                        required
                                    />
                                </td>
                                <td>
                                    <input type="email" id="email" required />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        id="eligibleForInsurance"
                                    />
                                </td>
                                <td>
                                    <button
                                        id="submit"
                                        type="submit"
                                        className="btn btn-primary btn-sm">
                                        Add
                                    </button>

                                    <button
                                        style={{ display: "none" }}
                                        id="update"
                                        className="btn btn-primary btn-sm mx-2"
                                        onClick={this.updateEmployee}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </form>
            </React.Fragment>
        );
    }
}

export default Employee;
