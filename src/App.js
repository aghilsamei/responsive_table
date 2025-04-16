import React from "react";
import ResponsiveTable from "./components/ResponsiveTable";

const testData = [
  {
    name: "Alice",
    age: 25,
    city: "New York",
    email: "alice@example.com",
    job: "Developer",
    status: "Active",
    phone: "123456789",
    address: "34 street",
    salary: "$5000",
  },
  {
    name: "Bob",
    age: 30,
    city: "London",
    email: "bob@example.combob@example.com",
    job: "Designer",
    status: "Inactive",
    phone: "987654321",
    address: "56 street",
    salary: "$4500",
  },
];

const tableHeaders = [
  "#",
  "Name",
  "Age",
  "City",
  "Email",
  "Job",
  "Status",
  "Phone",
  "Address",
  "Salary",
];

function App() {
  return (
    
    <>
    
    <ResponsiveTable data={testData} showActions={false} headers={tableHeaders}   stickyKeys={["Name" , "Age"]} exportAllData={true} />
    
    </>
  );
}

export default App;
