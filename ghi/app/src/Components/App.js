import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AutomobileForm from './Inventory/AutomobileForm';
import AutomobileList from './Inventory/AutomobileList';
import MainPage from './MainPage';
import ManufacturerForm from './Inventory/ManufacturerForm';
import ManufacturerList from './Inventory/ManufacturersList';
import Nav from './Nav';
import SalesList from './Sales/SalesList';
import SalesForm from './Sales/SalesRecords';
import CustomerList from './Customer/CustomerList';
import CustomerForm from './Customer/CustomerForm';
import SalesPersonHistory from './Sales/SalesPersonHistory';
import SalesPersonForm from './Employee/SalesPersonForm';
import ServiceForm from './ServiceDpt/ServiceForm';
import ServiceHistoryList from './ServiceDpt/ServiceHistoryList';
import ServiceList from './ServiceDpt/ServiceList';
import TechnicianForm from './ServiceDpt/TechnicianForm';
import VehicleForm from './Inventory/VehicleForm';
import VehicleList from './Inventory/VehicleList';
import SalesPeopleList from './Employee/SalesPersonList';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesForm />} />
          </Route>
          <Route path="sales/employee">
            <Route index element={<SalesPersonHistory />} />
            <Route path="new" element={<SalesPersonForm />} />
            <Route path="new-employee" element={<SalesPeopleList />}/>
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="service">
            <Route path="new" element={<ServiceForm/>}/>
            <Route path="history" element={<ServiceHistoryList/>}/>
            <Route index element={<ServiceList/>}/>
          </Route>
          <Route path="technician">
            <Route index element={<TechnicianForm/>}/>
          </Route>
          <Route path="manufacturer">
            <Route path='new' element={<ManufacturerForm/>}/>
            <Route index element={<ManufacturerList/>}/>
          </Route>
          <Route path="vehicle">
            <Route path='new' element={<VehicleForm/>}/>
            <Route index element={<VehicleList/>}/>
          </Route>
          <Route path="automobile">
            <Route path='new' element={<AutomobileForm/>}/>
            <Route index element={<AutomobileList/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
