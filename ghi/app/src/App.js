import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import MainPage from './MainPage';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturersList';
import Nav from './Nav';
import ServiceForm from './ServiceForm';
import ServiceHistoryList from './ServiceHistoryList';
import ServiceList from './ServiceList';
import TechnicianForm from './TechnicianForm';
import VehicleForm from './VehicleForm';
import VehicleList from './VehicleList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />





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
