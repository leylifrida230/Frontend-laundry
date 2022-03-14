import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { end } from "@popperjs/core";
import { authorization, baseUrl, formatNumber } from "../Config"

class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            pakets: [
                {
                    jenis_paket: "Jaket", harga: "50000"
                },

                {
                    jenis_paket: "Karpet", harga: "60000"
                },

                {
                    jenis_paket: "Selimut", harga: "25000"
                },
            ],
            id_paket: "",
            jenis_paket: "",
            harga: "",
            action: "",
            visible: true
        }
    }

    tambahPaket() {
        this.modalPaket = new Modal(document.getElementById('modal-paket'))
        this.modalPaket.show()

        this.setState({
            jenis_paket: "",
            harga: "",
            action: "tambah"
        })
    }

    simpanPaket(event) {
        event.preventDefault()

        this.modalPaket.hide()

        if (this.state.action === "tambah") {
            let endpoint = `${baseUrl}/paket/` //kudu pake slash belakang
            let newPaket = {
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }

            axios.post(endpoint, newPaket, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // let temp = this.state.pakets

            // temp.push(newPaket)
            // this.setState({ pakets: temp })
        } else if (this.state.action === "ubah") {
            let endpoint = `${baseUrl}/paket/` + this.state.id_paket
            let newPaket = {
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }

            axios.put(endpoint, newPaket, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // let temp = this.state.pakets
            // let index = temp.findIndex(
            //     paket => paket.id_paket === this.state.id_paket
            // )

            // temp[index].jenis_paket = this.state.jenis_paket
            // temp[index].harga = this.state.harga

            // this.setState({ pakets: temp })

            this.modalPaket.hide()
        }
    }

    ubahPaket(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal-paket")) // this "modal-member"
        this.modalPaket.show() //Menampilkan modal member

        //mencari index posisi dari data member yg akan diubah
        let index = this.state.pakets.findIndex(
            paket => paket.id_paket === id_paket
        )

        this.setState({
            action: "ubah",
            id_paket: this.state.pakets[index].id_paket,
            jenis_paket: this.state.pakets[index].jenis_paket,
            harga: this.state.pakets[index].harga,
        })
    }

    hapusPaket(id_paket) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini ?')) {

            let endpoint = `${baseUrl}/paket/` + id_paket

            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

            // let temp = this.state.pakets
            // let index = temp.findIndex(
            //     paket => paket.id_paket === id_paket  
            // )

            // // menghapus data array
            // temp.splice(index, 1)

            // this.setState({pakets: temp})
        }
    }

    getData() {
        let endpoint = `${baseUrl}/paket/`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ pakets: response.data })
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
            <div className="container">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h4 className="text-white">
                            List Daftar Paket
                        </h4>
                    </div>

                    <div className="card-body">

                        {/* <button className="col-lg-2 btn-primary"
                        onClick={() => this.tambahPaket()}>
                        Tambah Data
                    </button> */}

                        {/* UNTUK BUTTON TAMBAH DATA TAPI BUAT ADMIN SAMA KASIR AJA */}
                        <div className="col-lg-3">
                            {this.showAddButton()}
                        </div>

                        <ul className="list-group">
                            {this.state.pakets.map(paket => (
                                <li className="list-group-item">
                                    <div className="row">

                                        {/** BAGIAN JENIS PAKET */}
                                        <div className="col-lg-5">
                                            <small className="text-info">Paket</small> <br />
                                            {paket.jenis_paket}
                                        </div>

                                        {/** BAGIAN HARGA PAKET */}
                                        <div className="col-lg-4 ">
                                            <small className="text-info">Harga</small> <br />
                                            {formatNumber(paket.harga)}
                                        </div>

                                        {/**BUTTON */}
                                        {/* <button className="btn btn-sm col-sm-1 btn-success mx-1"
                                        onClick={() => this.ubahPaket(paket.id_paket)}>
                                        Edit
                                    </button>

                                    <button className="btn btn-sm col-sm-1 btn-danger mx-1"
                                        onClick={() => this.hapusPaket(paket.id_paket)}>
                                        Delete
                                    </button> */}

                                        <div className="col-lg-3">
                                            <small className="text-info">Action</small> <br />

                                            <button small className={`btn btn-sm btn-success mx-1 ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.ubahPaket(paket.id_paket)}>
                                                Edit
                                            </button>

                                            <button className={`btn btn-sm btn-danger mx-1 ${this.state.visible ? `` : `d-none`}`}
                                                onClick={() => this.hapusPaket(paket.id_paket)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))} <br />


                        </ul>

                        {/** FORM MODAL PAKET */}
                        <div className="modal" id="modal-paket">
                            <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                    <div className="modal-header bg-success">
                                        <h4 className="text-white">
                                            Form Paket
                                        </h4>
                                    </div>

                                    <div className="modal-body">
                                        <form onSubmit={ev => this.simpanPaket(ev)}>
                                            Jenis Paket
                                            <input type="text" className="form-control mb-2"
                                                value={this.state.jenis_paket}
                                                onChange={ev => this.setState({ jenis_paket: ev.target.value })}
                                                required
                                            />

                                            Harga
                                            <input type='text' className="form-control mb-2"
                                                value={this.state.harga}
                                                onChange={ev => this.setState({ harga: ev.target.value })}
                                                required
                                            />

                                            <button className="btn btn-success btn-sm" type="submit">
                                                Save
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Paket