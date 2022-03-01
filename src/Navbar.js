import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/** Brand */}
          <a className="navbar-brand">
            Laundry
          </a>

          {/** Button toggler */}
          <button className="navbar-toggler"
            data-toggler="collapse"
            data-bs-target="#myNav"
            aria-controls="myNav"
            aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/** define menu */}
          <div className="collapse navbar-collapse"
            id="myNav">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0">

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
                  Transaksi Baru
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