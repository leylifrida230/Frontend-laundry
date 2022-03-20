import axios from "axios";
import React from "react";
import { baseUrl } from "../Config"
import "../Login.css"
import Logo from "../image/nini.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faU } from "@fortawesome/free-solid-svg-icons"

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
        }
    }

    loginProcess(event) {
        event.preventDefault()
        let endpoint = `${baseUrl}/auth/`

        let request = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(endpoint, request)
            .then(result => {
                if (result.data.logged) {
                    // store token in local storage
                    localStorage.setItem('token', result.data.token)
                    localStorage.setItem("users", JSON.stringify(result.data.users))
                    window.alert("Congratulation!! You're logged in")
                    window.location.href = "/" //ke direct ke dashboard
                } else {
                    window.alert("sorry your username and password is not bener")
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                {/* <div className="col-lg-6"
                    style={{ margin: "0 auto" }}> */}
                <div className="body d-md-flex align-items-center justify-content-between">
                    <div className="box-1 mt-md-0 mt-5"><img src={Logo} className="" alt="side pict" /></div>
                    <div className=" box-2 d-flex flex-column h-100">
                        <div className="mt-5">
                            <p className="mb-3 h-1">Login</p>
                            <div className="card-body">
                                <form onSubmit={ev => this.loginProcess(ev)}>
                                    <FontAwesomeIcon icon={faUser} /> Username
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.username} required
                                        onChange={ev => this.setState({ username: ev.target.value })}
                                        placeholder="username" />

                                    <FontAwesomeIcon icon={faLock} /> Password
                                    <input type="password" className="form-control mb-2"
                                        value={this.state.password} required
                                        onChange={ev => this.setState({ password: ev.target.value })}
                                        placeholder="************" />

                                    <button className="btn btn-primary text-center" type="submit">
                                        Log In
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;