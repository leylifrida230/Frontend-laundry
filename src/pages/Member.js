import React from "react";
import $ from "jquery";
import axios from "axios";
import { Modal } from "bootstrap"

class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            members: [
                {
                    id_member: "111", nama: "Edo",
                    alamat: "Jalan Gunung Semeru 13 Malang",
                    jenis_kelamin: "Pria", telepon: "01234567"
                },

                {
                    id_member: "112", nama: "Sifa",
                    alamat: "Jalan Semeru kanan 28 Surabaya",
                    jenis_kelamin: "Wanita", telepon: "00123456"
                },

                {
                    id_member: "113", nama: "Suho",
                    alamat: "Jalan Bromo 54 Malang",
                    jenis_kelamin: "Pria", telepon: "89456123"
                },
            ],

            id_member: "",
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "",
            action: "", //untuk menyimpan aksi dari tambah atau ubah data

        }
    }

    tambahData() {
        // memunculkan modal
        this.modalMember = new Modal(document.getElementById("modal-member"))
        this.modalMember.show()

        // mengosongkan inputannya
        this.setState({
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "wanita",
            id_member: Math.random(1, 10000000),
            action: "tambah", //untuk menyimpan aksi dari tambah atau ubah data
        })
    }

    simpanData(event) {
        event.preventDefault()
        // untuk mencegah berjalannya akdi default dari form submit

        // menghilangkan modal
        this.modalMember.hide()

        //cek aksi tambah atau ubah
        if(this.state.action === "tambah") {
            // menampung data dari pengguna
            let newMember = {
                id_member: this.state.id.member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }

            let temp = this.state.members
            temp.push(newMember)

            this.setState({members: temp})

        }else if(this.state.action === "ubah") {

        }
    }

    Edit = selectedItem => {
        $("modal_member").modal("show")
        this.setState({
            action: "update",
            id_member: selectedItem.id_member,
            nama: selectedItem.nama,
            alamat: selectedItem.alamat,
            jenis_kelamin: selectedItem.jenis_kelamin,
            telepon: selectedItem.telepon
        })
    }

    render() {
        return (
            <div className="card" >
                <div className="card-header bg-primary" >
                    <h4 className="text-white">
                        List Daftar Member
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {this.state.members.map(member => (
                            <li className="list-group-item">
                                {/* list group item lebih responsif */}
                                <div className="row">
                                    {/* clasname : row, berguna untuk menyusun data ke samping, karena defaultnya ke bawah*/}
                                    {/* BAGIAN NAMA*/}
                                    <div className="col-lg-5">
                                        <small className="text-info">Nama</small> <br />
                                        {member.nama}
                                    </div>

                                    {/* BAGIAN GENDER*/}
                                    <div className="col-lg-3">
                                        <small className="text-info">Gender</small> <br />
                                        {member.jenis_kelamin}
                                    </div>

                                    {/* BAGIAN TELEPON*/}
                                    <div className="col-lg-4">
                                        <small className="text-info">Telepon</small> <br />
                                        {member.telepon}
                                    </div>

                                    {/* BAGIAN ALAMAT*/}
                                    <div className="col-lg-12">
                                        <small className="text-info">Alamat</small> <br />
                                        {member.alamat}
                                    </div>

                                    <button className="col-lg-1 mx-1 btn-success"
                                        onClick={() => this.Edit(member)}>
                                        Edit
                                    </button>


                                    <button className="col-lg-1 mx-1 btn-danger"
                                        onClick={() => this.dropMember(member)}>
                                        Delete
                                    </button>

                                </div>
                            </li>
                        ))} <br />

                    </ul>

                    <button className="col-lg-2 btn-primary"
                        onClick={() => this.tambahData()}>
                        Tambah Data
                    </button>

                    {/** Form Modal Member */}
                    <div className="modal" id="modal-member" >
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-success">
                                    <h4 className="text-white">
                                        Form Member
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={ev => this.simpanData(ev)}>
                                        Nama
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.nama}
                                            onChange={ev => this.setState({ nama: ev.target.value })}
                                            required
                                        />

                                        Alamat
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.alamat}
                                            onChange={ev => this.setState({ alamat: ev.target.value })}
                                            required
                                        />

                                        Telepon
                                        <input type="text" className="form-control mb-2"
                                            value={this.state.telepon}
                                            onChange={ev => this.setState({ telepon: ev.target.value })}
                                            required
                                        />

                                        Gender
                                        <select className="form-control mb2"
                                            value={this.state.jenis_kelamin}
                                            onChange={ev => this.setState({ jenis_kelamin: ev.target.value })}>
                                            <option value="pria">Pria</option>
                                            <option value="wanita">Wanita</option>
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

export default Member