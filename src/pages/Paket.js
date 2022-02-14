import React from "react";
import { Modal } from "bootstrap"

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
            ]
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header bg-primary">
                    <h4 className="text-white">
                        List Daftar Paket
                    </h4>
                </div>

                <div className="card-body">
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
                                    <div className="col-lg-4">
                                        <small className="text-info">Harga</small> <br />
                                        {paket.harga}
                                    </div>

                                    {/**BUTTON */}
                                    <button className="col-lg-1 mx-1 btn-success"
                                        onClick={() => this.Edit(paket)}>
                                        Edit
                                    </button>

                                    <button className="col-lg-1 mx-1 btn-danger"
                                        onClick={() => this.dropPaket(paket)}>
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))} <br />


                    </ul>
                    <button className="col-lg-2 btn-primary"
                        onClick={() => this.tambahPaket()}>
                        Tambah Data
                    </button>

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
                                        value={this.state.pakets}/>
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

export default Paket