import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesList from './Sales/SalesList';
import SalesForm from './Sales/SalesRecords';
import CustomerList from './Customer/CustomerList';
import CustomerForm from './Customer/CustomerForm';
import SalesPersonHistory from './Sales/SalesPersonHistory';
import SalesPersonForm from './Sales/SalesPersonForm';

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
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
