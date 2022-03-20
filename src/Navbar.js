import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faJugDetergent } from "@fortawesome/free-solid-svg-icons"

function Logout() {
  // remove data token dan user dari local storage
  localStorage.removeItem("user")
  localStorage.removeItem("token")
}

export default function Navbar(props) {
  return (

    <div>
      <nav className="navbar navbar-expand-lg 
      navbar-light">
        <div className="container-fluid">
          {/** Brand */}
          <h4 className="navbar-brand">
            Nini Laundry <FontAwesomeIcon icon={faJugDetergent} />
          </h4>

          {/** Button toggler */}
          <button className="navbar-toggler "
            data-bs-toggle="collapse"
            data-bs-target="#myNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/** define menu */}
          <div className="collapse navbar-collapse"
            id="myNav">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item">
                <Link to='/' className="nav-link">
                   Dashhboard
                </Link>
              </li>

              <li className="nav-item">
                <Link to='/Member' className="nav-link">
                  Member
                </Link>
              </li>

              <li className="nav-item">
                <Link to='/Users' className="nav-link">
                  User
                </Link>
              </li>

              <li className="nav-item">
                <Link to='/Paket' className="nav-link">
                  Paket
                </Link>
              </li>

              <li className="nav-item">
                <Link to='/Transaksi' className="nav-link">
                  Transaksi
                </Link>
              </li>

              <li className="nav-item">
                <Link to='/FormTransaksi' className="nav-link">
                  Form Transaki
                </Link>
              </li>

              <li className="nav-item">
                <Link to='/Login' className="nav-link"
                  onClick={() => Logout()}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {props.children}
    </div>
  )
}