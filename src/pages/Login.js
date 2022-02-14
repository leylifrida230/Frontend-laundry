import axios from "axios";
import React from "react";
import {baseUrl} from "../Config"

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
        }
    }

    loginProcess(event){
        event.preventDefault()
        let endpoint = `${baseUrl}/auth/`

        let request = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(endpoint, request)
        .then(result => {
            if(result.data.logged){
                // store token in local storage
                localStorage.setItem('token', result.data.token)
                localStorage.setItem("users", JSON.stringify(result.data.users))
                window.alert("Congratulation!! You're logged in")
                window.location.href = "/Member"
            }else{
                window.alert("sorry your username and password is not bener")
            }
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                <div className="col-lg-6" 
                style={{margin: "0 auto"}}>
                    <div className="card">
                        <div className="card-header bg-primary" >
                            <h4 className="text-white text-center">Login</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ev => this.loginProcess(ev)}> 
                                Username
                                <input type="text" className="form-control mb-2"
                                    value={this.state.username} required
                                    onChange={ev => this.setState({ username: ev.target.value })} />

                                Password
                                <input type="password" className="form-control mb-2"
                                    value={this.state.password} required
                                    onChange={ev => this.setState({ password: ev.target.value })} />

                                <button className="btn btn-primary" type="submit">
                                    Log In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;