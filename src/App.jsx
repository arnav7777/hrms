import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./styles.css";

const App = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

  const columns = [
    { name: "CustomerId", label: "Customer ID", options: { filterOptions: { fullWidth: false } } },
    { name: "CustomerName", label: "Customer Name" },
    { name: "BankName", label: "Bank Name" },
    { name: "AtmId", label: "ATM ID" },
    { name: "State", label: "State" },
    { name: "City", label: "City" },
    { name: "Address", label: "Address" },
    { 
      name: "SiteStatus", 
      label: "Site Status",
      options: {
        customBodyRender: (value) => {
          const statusStyle = {
            padding: '5px',
            borderRadius: '5px',
            color: '#fff',
            fontWeight: 'bold',
            marginRight: '5px',
          };

          const activeStyle = {
            ...statusStyle,
            backgroundColor: 'green',
          };

          const inactiveStyle = {
            ...statusStyle,
            backgroundColor: 'red',
          };

          return (
            <span style={value === 'Active' ? activeStyle : inactiveStyle}>
              {value}
            </span>
          );
        }
      }
    }
  ];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    responsive: "standard",
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    setTableProps: () => ({
      style: {
        width: '900px',
      }
    }),
    onRowClick: async (rowData, rowMeta) => {
      console.log("Clicked on row:", rowData, rowMeta);
      const atmId = rowData[columns.findIndex(col => col.name === "AtmId")];
      try {
        const [atmRegionResponse, servicesResponse, employeeResponse] = await Promise.all([
          axios.get(`http://localhost:5000/atmregion`),
          axios.get(`http://localhost:5000/services`),
          axios.get(`http://localhost:5000/employee`)
        ]);
        const atmRegionData = atmRegionResponse.data;
        const servicesData = servicesResponse.data;
        const employeeData = employeeResponse.data;
        setAdditionalDetails({
          atmRegion: atmRegionData,
          services: servicesData,
          employee: employeeData
        });
      } catch (error) {
        console.error('Error fetching additional details:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerResponse, bankResponse, atmResponse] = await Promise.all([
          axios.get('http://localhost:5000/customer'),
          axios.get('http://localhost:5000/bank'),
          axios.get('http://localhost:5000/atm')
        ]);

        const customers = customerResponse.data;
        const banks = bankResponse.data;
        const atms = atmResponse.data;

        // Merge customer data with bank and atm data
        const mergedData = customers.map(customer => {
          const bank = banks.find(bank => bank.CustomerId === customer.CustomerId);
          const atm = atms.find(atm => atm.BankId === bank.BankId);
          return {
            ...customer,
            BankName: bank ? bank.BankName : '', // Add bank name to data
            ...atm         // Add ATM ID to data
          };
        });

        setData(mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Navigate to DetailsPage when additionalDetails state is updated
    if (Object.keys(additionalDetails).length !== 0) {
      navigate("/DetailsPage", {
        state: additionalDetails
      });
    }
  }, [additionalDetails, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MUIDataTable
        title={"HRMS"}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default App;
