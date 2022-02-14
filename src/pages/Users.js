import { Modal } from "bootstrap";
import React from "react";

class Users extends React.Component{
    constructor(){
        super()
        this.state = {
            User: [
                {
                    id_user: "01", nama: "heesung", username: "hee-en", 
                    password: "1234", role: "admin"
                },

                {
                    id_user: "02", nama: "leyli", username: "leyy", 
                    password: "4321", role: "admin"
                },

                {
                    id_user: "03", nama: "fell", username: "feel", 
                    password: "7894", role: "admin"
                },

            ],

            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            action: ""
        }
    }
    
    tambahUser() {
        // memunculkan modal
        this.modalUsers = new Modal(document.getElementById("modal-users"))
        this.modalUsers.show()

        // mengosongkan inputanyya
        this.setState({
            nama: "",
            username: "",
            password: "",
            role: "admin",
            actioan: "tambah"
        })
    }

    simpanUser(event) {
        event.preventDefault()
        // untuk mencegah berjalannya akdi default dari form submit

        // menghilangkan modal
        this.modalUsers.hide()

        //cek aksi tambah atau ubah
        if(this.state.action === "tambah") {
            // menampung data dari pengguna
            let newUser = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            }

            let temp = this.state.user
            temp.push(newUser)

            this.setState({user: temp})

        }else if(this.state.action === "ubah") {

        }
    }

    render() {
        return(
            <div className="card">
                <div className="card-header bg-primary">
                    <h4 className="text-white">
                        List Daftar User
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {this.state.User.map(userr => (
                            <li className="list-group-item">
                                <div className="row">

                                    {/** BAGIAN NAMA */}
                                    <div className="col-lg-4">
                                        <small className="text-info">Nama</small> <br/>
                                        {userr.nama}
                                    </div>

                                    {/** USERNAME */}
                                    <div className="col-lg-4">
                                        <small className="text-info">Username</small> <br/>
                                        {userr.username}
                                    </div>

                                    {/** ROLE */}
                                    <div className="col-lg-4">
                                        <small className="text-info">Role</small> <br/>
                                        {userr.role}
                                    </div>

                                </div>
                            </li>
                        ))} <br/>
                    </ul>

                    <button className="col-lg-2 btn-primary"
                    onClick={() => this.tambahUser()}>
                        Tambah Data
                    </button>

                    {/** FORM MODAL USER */}
                    <div className="modal" id="modal-member">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-success">
                                    <h4 className="text-white">
                                        Form Users
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => this.simpanUser(ev)}>
                                        Nama 
                                        <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value})}
                                        required
                                        />

                                        Username 
                                        <input type="text" className="form-control mb-2"
                                        value={this.state.username}
                                        onChange={ev => this.setState({ username: ev.target.value})}
                                        required
                                        />

                                        Password 
                                        <input type="text" className="form-control mb-2"
                                        value={this.state.password}
                                        onChange={ev => this.setState({ password: ev.target.value})}
                                        required
                                        />

                                        Role 
                                        <select className="form-control mb2"
                                            value={this.state.role}
                                            onChange={ev => this.setState({ role: ev.target.value })}>
                                            <option value="admin">Admin</option>
                                            <option value="Member">Member</option>
                                        </select>

                                        <button className="btn btn-success btn-sm" type="submit">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// PEN PULANG SOHQEOIHEWOIFJ

export default Users