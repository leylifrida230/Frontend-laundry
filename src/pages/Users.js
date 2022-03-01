import { Modal } from "bootstrap";
import React from "react";
import axios from "axios";
import { authorization, baseUrl } from "../Config"

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            User: [
                {
                    id_user: "01", nama: "heesung", username: "hee-en",
                    password: "1234", role: "Admin"
                },

                {
                    id_user: "02", nama: "leyli", username: "leyy",
                    password: "4321", role: "Admin"
                },

                {
                    id_user: "03", nama: "fell", username: "feel",
                    password: "7894", role: "Admin"
                },

            ],

            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            action: "",
            visible: true
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
            role: "",
            action: "tambah"
        })
    }

    simpanUser(event) {
        event.preventDefault()
        // untuk mencegah berjalannya akdi default dari form submit

        // menghilangkan modal
        this.modalUsers.hide()

        //cek aksi tambah atau ubah
        if (this.state.action === "tambah") {
            let endpoint = `${baseUrl}/users/`
            // menampung data dari pengguna
            let newUser = {
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            }

            axios.post(endpoint, newUser, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // let temp = this.state.user
            // temp.push(newUser)

            // this.setState({user: temp})

        } else if (this.state.action === "ubah") {
            let endpoint = `${baseUrl}/users/` + this.state.id_user

            let newUser = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            }

            axios.put(endpoint, newUser, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // let temp = this.state.user
            // let index = temp.findIndex(
            //     user => user.id_user === this.state.id_user
            // )

            // temp[index].nama = this.state.nama
            // temp[index].username = this.state.username
            // temp[index].password = this.state.password
            // temp[index].role = this.state.role

            // this.setState({ user: temp })

            this.modalUsers.hide()
        }
    }

    ubahUser(id_user) {
        this.modalUsers = new Modal(document.getElementById("modal-users")) // this "modal-member"
        this.modalUsers.show() //Menampilkan modal USER

        //mencari index posisi dari data USER yg akan diubah
        let index = this.state.User.findIndex(
            user => user.id_user === id_user
        )

        this.setState({
            action: "ubah",
            id_user: this.state.User[index].id_user,
            nama: this.state.User[index].nama,
            username: this.state.User[index].username,
            password: this.state.password,
            role: this.state.User[index].role
        })
    }

    hapusUser(id_user) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
            let endpoint = `${baseUrl}/users/` + id_user

            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
            // let temp = this.state.User
            // let index = temp.findIndex(
            //     user => user.id_user === id_user
            // )

            // // menghapus data pada array
            // temp.splice(index, 1)

            // this.setState({ user: temp })
        }
    }

    getData() {
        let endpoint = `${baseUrl}/users/`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ User: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        // fungsi ini di jalankan setelah fungsi render berjalan
        this.getData()
        let user = JSON.parse(localStorage.getItem("users"))
        //Cara Pertama
        this.setState({
            role: user.role
        })

        // Cara kedua
        if (user.role === 'admin') {
            this.setState({
                visible: true
            })
        } else (
            this.setState({
                visible: false
            })
        )
    }

    showAddButton() {
        if (this.state.role === 'admin') {
            return (
                <button type='button' class='btn btn-outline-dark'
                    onClick={() => this.tambahData()}>
                    Tambah
                </button>
            )
        }
    }


    render() {
        return (
            <div className="card">
                <div className="card-header bg-primary">
                    <h4 className="text-white">
                        List Daftar User
                    </h4>
                </div>

                <div className="card-body">

                    {/* <button className="col-lg-2 btn-primary"
                        onClick={() => this.tambahUser()}>
                        Tambah Data
                    </button> <br/> */}

                    <div className="col-lg-3">
                        {this.showAddButton()}
                    </div>

                    <ul className="list-group">
                        {this.state.User.map(userr => (
                            <li className="list-group-item">
                                <div className="row">

                                    {/** BAGIAN NAMA */}
                                    <div className="col-lg-3">
                                        <small className="text-info">Nama</small> <br />
                                        {userr.nama}
                                    </div>

                                    {/** USERNAME */}
                                    <div className="col-lg-3">
                                        <small className="text-info">Username</small> <br />
                                        {userr.username}
                                    </div>

                                    {/** ROLE */}
                                    <div className="col-lg-3">
                                        <small className="text-info">Role</small> <br />
                                        {userr.role}
                                    </div>

                                    {/* <button small className='btn btn-sm col-sm-1 btn-success mx-1'
                                        onClick={() => this.ubahUser(userr.id_user)}>
                                        Edit
                                    </button>

                                    <button className='btn btn-sm col-sm-1 btn-danger mx-1'
                                        onClick={() => this.hapusUser(userr.id_user)}>
                                        Delete
                                    </button> */}

                                    <button small className={`btn btn-sm col-sm-1 btn-success mx-1 ${this.state.visible ? `` : `d-none`}`}
                                        onClick={() => this.ubahUser(userr.id_user)}>
                                        Edit
                                    </button>

                                    <button className={`btn btn-sm col-sm-1 btn-danger mx-1 ${this.state.visible ? `` : `d-none`}`}
                                        onClick={() => this.hapusUser(userr.id_user)}>
                                        Delete
                                    </button>

                                </div>
                            </li>
                        ))} <br />
                    </ul>

                    {/** FORM MODAL USER */}
                    <div className="modal" id="modal-users">
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
                                            onChange={ev => this.setState({ nama: ev.target.value })}
                                            required
                                        />

                                        Username
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.username}
                                            onChange={ev => this.setState({ username: ev.target.value })}
                                            required
                                        />

                                        Password
                                        <input type="password" className="form-control mb-2"
                                            value={this.state.password}
                                            onChange={ev => this.setState({ password: ev.target.value })}
                                            required
                                        />

                                        Role
                                        <select className="form-control mb2"
                                            value={this.state.role}
                                            onChange={ev => this.setState({ role: ev.target.value })}>
                                            <option value="Admin">Admin</option>
                                            <option value="Member">Member</option>
                                            <option value="Kasir">Kasir</option>
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

export default Users