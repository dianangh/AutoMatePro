import { NavLink } from "react-router-dom";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          CarCar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="@"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Sales
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
                data-bs-auto-close="true"
              >
                <li>
                  <NavLink className="dropdown-item" to="/sales/">
                    Sales Records
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/sales/new">
                    New Sale Record
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/sales/employee/">
                    Salesperson Record
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/sales/employee/new">
                    New Salespeople Form
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to="/sales/employee/new-employee"
                  >
                    Salespeople List
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="@"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Customers
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
                data-bs-auto-close="true"
              >
                <li>
                  <NavLink className="dropdown-item" to="/customers/">
                    Customer's List
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/customers/new">
                    New Customer Form
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="@"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Inventory
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
                data-bs-auto-close="true"
              >
                <li>
                  <NavLink className="dropdown-item" to="/manufacturer/">
                    List of Manufacturers
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/manufacturer/new">
                    Create a manfacturer
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/vehicle">
                    List of vehicle models
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/vehicle/new/">
                    Create a vehicle model
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/automobile/">
                    List of automobiles
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/automobile/new">
                    Create an automobile
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="@"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                Service
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <NavLink className="dropdown-item" to="/technician/">
                    Enter a technician
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/service/new/">
                    Enter a service appointment
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/service/">
                    List of appointments
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/service/history/">
                    Service history
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
