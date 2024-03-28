import React from "react";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const location = useLocation();
  const additionalDetails = location.state.additionalDetails;
  console.log("Location State:", location.state); 
  console.log("Additional Details:", additionalDetails);

  if (!additionalDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Details</h1>
      {additionalDetails.atmRegion && (
        <div>
          <h2>ATM Region:</h2>
          <ul>
            {additionalDetails.atmRegion.map((item, index) => (
              <li key={index}>{item.RegionName}</li>
            ))}
          </ul>
        </div>
      )}

      {additionalDetails.services && (
        <div>
          <h2>Services:</h2>
          <ul>
            {additionalDetails.services.map((item, index) => (
              <li key={index}>
                Service ID: {item.ServiceId}, Service Type: {item.ServiceType}, 
                Takeover Date: {item.TakeoverDate}, Handover Date: {item.HandoverDate}, 
                PayOut: {item.PayOut}, Cost to Client: {item.CostToClient}
              </li>
            ))}
          </ul>
        </div>
      )}

      {additionalDetails.employee && (
        <div>
          <h2>Employee:</h2>
          <ul>
            {additionalDetails.employee.map((item, index) => (
              <li key={index}>
                Employee Name: {item.EmployeeName}, Employee Role: {item.EmployeeRole}, 
                Type of Work: {item.TypeOfWork}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
