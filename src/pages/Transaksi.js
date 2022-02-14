import React from "react";
import axios from "axios";
import { baseUrl } from "../Config";

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: [],
        }
    }

    getData() {
        let endpoint = `${baseUrl}/transaksi/`

        axios.get(endpoint)
            .then(response => {
                this.setState({ transaksi: response.data })
                console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
    }

    HapusTransaksi(id_paket) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {

            //mencari posisi index dari data yang akan dihapus
            // let temp = this.state.detail_transaksi
            // let index = temp.findIndex(detail => detail.id_paket === id_paket)

            //menghapus data pada array
            // temp.splice(index, 1)

            // this.setState({ transaksi: temp })

            let endpoint = `${baseUrl}/transaksi/` + id_paket

            axios.delete(endpoint)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
        }
    }

    convertStatus(status) {
        if (status === 1) {
            return (
                <div className="badge bg-info">
                    Transaksi Baru
                </div>
            )
        } else if (status === 2) {
            return (
                <div className="badge bg-warning">
                    Sedang diproses
                </div>
            )
        } else if (status === 3) {
            return (
                <div className="badge bg-secondary">
                    Siap diambil
                </div>
            )
        } else if (status === 4) {
            return (
                <div className="badge bg-success">
                    Telah diambil
                </div>
            )
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-header bg-info">
                    <h4 className="text-white">
                        List Transaksi
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {this.state.transaksi.map(trans => (
                            <li className="list-group-item">
                                <div className="row">
                                    {/** Member area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Member
                                        </small><br />
                                        {trans.member.nama}
                                    </div>

                                    {/** Tanggal Transaksi area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Transaki
                                        </small><br />
                                        {trans.tgl}
                                    </div>

                                    {/** Batas Waktu area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Batas Waktu
                                        </small><br />
                                        {trans.batas_waktu}
                                    </div>

                                    {/** Tanggal Bayar area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Bayar
                                        </small><br />
                                        {trans.tgl_bayar}
                                    </div>

                                    {/** Status area */}
                                    <div className="col-lg-5">
                                        <small className="text-info">
                                            Status
                                        </small><br />
                                        {this.convertStatus(trans.status)}
                                    </div>
                                    <br/>

                                    <div>
                                            <button className='btn btn-sm col-sm-1 btn-danger mx-1 my-1'
                                                onClick={() => this.HapusTransaksi(trans.id_paket)}>
                                                Delete
                                            </button>

                                            <button className='btn btn-sm col-sm-1 btn-success mx-1'
                                                onClick={() => this.EditTransaksi(trans.id_paket)}>
                                                Edit
                                            </button>

                                            <button className='btn btn-sm col-sm-2 btn-info mx-1'
                                                onClick={() => this.TambahTransaksi(trans.id_paket)}>
                                                Tambah Transaksi
                                            </button>
                                        </div>

                                </div>

                                <hr />

                                {/** Area Detail Transaksi */}
                                <h5>Detail Transaksi</h5>
                                {trans.detail_transaksi.map(detail => (
                                    <div className="row">
                                        {/** area Nama Paket */}
                                        <div className="col-lg-3">
                                            {detail.paket.jenis_paket}
                                        </div>
                                        {/** area Quantity */}
                                        <div className="col-lg-2">
                                            Qty :  {detail.qty}
                                        </div>
                                        {/** area Harga Paket */}
                                        <div className="col-lg-3">
                                            @ Rp {detail.paket.harga}
                                        </div>
                                        {/** area Harga Total */}
                                        <div className="col-lg-4">
                                            Total Rp {detail.paket.harga * detail.qty}
                                        </div>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}