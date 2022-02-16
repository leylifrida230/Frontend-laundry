import React from "react";
import axios from "axios";
import { baseUrl } from "../Config";

export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {

        }

        if (!localStorage.getItem("token")) {
            window.location.href = "/Login"
        }
    }

    render() {
        return (
            <div>
                this is dashboard
            </div>
        )
    }
}
