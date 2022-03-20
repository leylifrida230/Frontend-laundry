import axios from "axios";
import React from "react";
import { Modal } from "bootstrap"
import { authorization, baseUrl, formatNumber } from "../Config";

export default class FormTransaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            id_member: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            dibayar: false,
            id_user: "",
            detail_transaksi: [],
            members: [],
            pakets: [],
            id_paket: "",
            qty: 0,
            jenis_paket: "",
            harga: 0,
        }
    }

    getMember() {
        let endpoint = `${baseUrl}/member/`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(error => console.log(error))
    }

    getPaket() {
        let endpoint = `${baseUrl}/paket/`
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ pakets: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getMember()
        this.getPaket() 

        let user = JSON.parse(localStorage.getItem("users"))

        if (user.role !== 'Admin' && user.role !== 'Kasir') {
            window.alert(`Maaf anda tidak memiliki akses menuju halaman ini`)

            window.location.href = '/'
            
        } 
    }

    tambahPaket(e) {
        e.preventDefault()
        this.modal.hide()
        // digunakan untuk menyimpan data paket yang dipilih 
        // beserta jumlahnya kedalam array detail_transaksi
        let idPaket = this.state.id_paket
        let SelectedPaket = this.state.pakets.find(
            paket => paket.id_paket == idPaket
        )
        let newPaket = {
            id_paket: this.state.id_paket,
            qty: this.state.qty,
            jenis_paket: SelectedPaket.jenis_paket,
            harga: SelectedPaket.harga,
        }

        //ambil array detail transaksi
        let temp = this.state.detail_transaksi
        temp.push(newPaket)
        this.setState({ detail_transaksi: temp })
        console.log({ temp })
    }

    addPaket() {
        // menampilkan form modal untuk memilih paket
        this.modal = new Modal(document.getElementById('modal-paket'))
        this.modal.show()
        console.log(this.state.pakets)
        // kosongkan form nya
        this.setState({
            id_paket: "",
            qty: "",
            jenis_paket: "",
            harga: 0
        })
    }

    hapusPaket(id_paket){
        if (window.confirm("apakah anda yakin akan menghapus paket ini?")) {
            // let endpoint = `${baseUrl}/paket/` + id_paket
            // axios.delete(endpoint, authorization)
            // .then(response => {
            //     window.alert(response.data.message)
            //     this.getData()
            // })
            // .catch(error => {console.log(error)})

            // mencari posisi index dari data yang akan dihapus
            let temp = this.state.detail_transaksi
            let index = temp.findIndex(detail => detail.id_paket === id_paket)

            // menghapus data pada array
            temp.splice(index, 1)
            this.setState({details: temp})
        }
    }

    // iki tadi awale seng "users users" awale "user" tapi tak ganti "users"
    SimpanTransaksi(){
        let endpoint = `${baseUrl}/transaksi/`
        let users = JSON.parse(localStorage.getItem("users"))
        let newData = {
            id_member: this.state.id_member,
            tgl: this.state.tgl,
            batas_waktu: this.state.batas_waktu,
            tgl_bayar: this.state.tgl_bayar,
            dibayar: this.state.dibayar,
            id_user: users.id_users,
            detail_transaksi: this.state.detail_transaksi
        }
        axios.post(endpoint, newData, authorization)
        .then(response => {
            window.alert(response.data.message)
        })
        .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-white">
                            Form Transaksi
                        </h4>
                    </div>

                    <div className="card-body">
                        Member
                        <select className="form-control mb-2"
                            value={this.state.id_member}
                            onChange={(e => this.setState({ id_member: e.target.value }))}>
                            {this.state.members.map(member => (
                                <option value={member.id_member}>
                                    {member.nama}
                                </option>
                            ))}
                        </select>

                        Tanggal Transaksi
                        <input type="date" className="form-control mb-2"
                            value={this.state.tgl}
                            onChange={e => this.setState({ tgl: e.target.value })} />

                        Batas Waktu
                        <input type="date" className="form-control mb-2"
                            value={this.state.batas_waktu}
                            onChange={e => this.setState({ batas_waktu: e.target.value })} />

                        Tanggal Bayar
                        <input type="date" className="form-control mb-2"
                            value={this.state.tgl_bayar}
                            onChange={e => this.setState({ tgl_bayar: e.target.value })} />

                        Status Bayar
                        <select className="form-control mb-2"
                            value={this.state.dibayar}
                            onChange={e => this.setState({ dibayar: e.target.value })}>
                            <option value={true}>Sudah Dibayar</option>
                            <option value={false}>Belum Dibayar</option>
                        </select>

                        <button className="btn btn-success"
                            onClick={() => this.addPaket()}>
                            Tambah Paket
                        </button>

                        {/** Tampilkan isi detail */}
                        <h5 className="text-warning">
                            Detail Transaksi
                        </h5>

                        {this.state.detail_transaksi.map(detail => (
                            <div className="row">
                                {/** area Nama Paket */}
                                <div className="col-lg-3">
                                    {detail.jenis_paket}
                                </div>
                                {/** area Quantity */}
                                <div className="col-lg-2">
                                    Qty :  {detail.qty}
                                </div>
                                {/** area Harga Paket */}
                                <div className="col-lg-3">
                                    @ Rp {formatNumber(detail.harga)}
                                </div>
                                {/** area Harga Total */}
                                <div className="col-lg-4">
                                    Total Harga : Rp {formatNumber(detail.harga * detail.qty)}
                                </div>
                                <div className="col-lg-3">
                                    <button className='btn btn-sm btn-danger mx-1'
                                        onClick={() => this.hapusPaket(detail.id_paket)}>
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className="btn btn-outline-info"
                        onClick={() => this.SimpanTransaksi()}>
                            Simpan Transaksi
                        </button>

                        {/** Modal Untuk pilihan paket */}
                        <div className="modal" id="modal-paket">
                            <div className="modal-dialog modal-md">
                                <div className="modal-content">
                                    <div className="modal-header bg-danger">
                                        <h4 className="text-white">
                                            Pilih Paket
                                        </h4>
                                    </div>

                                    <div className="modal-body">
                                        <form onSubmit={(e) => this.tambahPaket(e)}>
                                            Pilih Paket
                                            <select className="form-control mb-2"
                                                value={this.state.id_paket}
                                                onChange={e => this.setState({ id_paket: e.target.value })}>
                                                    <option value="">Pilih Paket</option>
                                                {this.state.pakets.map(paket => ( 
                                                    <option value={paket.id_paket}>
                                                        {paket.jenis_paket}
                                                    </option>
                                                ))}
                                            </select>

                                            Jumlah (Qty)
                                            <input type="number" className="form-control mb-2"
                                                value={this.state.qty}
                                                onChange={e => this.setState({ qty: e.target.value })} />

                                            <button className="btn btn-success" type="submit">
                                                Tambah
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