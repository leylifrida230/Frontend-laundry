import React from "react";
import { Modal } from "bootstrap"
import axios from "axios"
import { data } from "jquery";
import {baseUrl} from "../Config"

class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            members: [
                {
                    id_member: "01", nama: "Kim Zulkidin",
                    alamat: "Jalan Gunung Semeru 13 Malang",
                    jenis_kelamin: "Pria", telepon: "01234567"
                },

                {
                    id_member: "02", nama: "Lee Felix Navidad",
                    alamat: "Jalan Semeru kanan 28 Surabaya",
                    jenis_kelamin: "Pria", telepon: "00123456"
                },

                {
                    id_member: "03", nama: "Suholangkaya",
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
        // Menampilkan modal member
        this.modalMember = new Modal(document.getElementById("modal-member")) // this "modal-member"
        this.modalMember.show()
        // Reset state untuk form member
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
        if (this.state.action === "tambah") {
            let endpoint = `${baseUrl}/member/`
            // menampung data dari pengguna
            let newMember = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }

            //tambahkan ke state members(array)
            // let temp = this.state.members
            //menambahkan data dalam array
            // temp.push(newMember)
            // this.setState({ members: temp })

            axios.post(endpoint, newMember)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

        }else if(this.state.action === "ubah"){
            // let temp = this.state.members
            // let index = temp.findIndex(
            //     member => member.id_member === this.state.id_member
            // )

            // temp[index].nama = this.state.nama
            // temp[index].alamat = this.state.alamat
            // temp[index].telepon = this.state.telepon
            // temp[index].jenis_kelamin = this.state.jenis_kelamin

            // this.setState({ members: temp })
            let newMember = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }
            
            let endpoint = `${baseUrl}/member/` + this.state.id_member

            axios.put(endpoint, newMember)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            this.modalMember.hide()
        }
    }

    ubahData(id_member) {
        this.modalMember = new Modal(document.getElementById("modal-member")) // this "modal-member"
        this.modalMember.show() //Menampilkan modal member

        //mencari index posisi dari data member yg akan diubah
        let index = this.state.members.findIndex(
            member => member.id_member === id_member
        )

        this.setState({
            action: "ubah",
            id_member: this.state.members[index].id_member,
            nama: this.state.members[index].nama,
            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon
        })
    }

    hapusData(id_member) {
        if (window.confirm('Apakah anda yakin ingin menghapus data ini?')) {
            // let temp = this.state.members
            // let index = temp.findIndex(
            //     member => member.id_member === id_member
            // )

            // // menghapus data pada array
            // temp.splice(index, 1)

            // this.setState({ members: temp })

            let endpoint = `${baseUrl}/member/` + id_member
            // menampung data dari pengguna

            axios.delete(endpoint)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    getData() {
        let endpoint = `${baseUrl}/member/`
        axios.get(endpoint)
            .then(response => {
                this.setState({ members: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        // fungsi ini di jalankan setelah fungsi render berjalan
        this.getData()
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

                    <button className="col-lg-2 btn-primary"
                        onClick={() => this.tambahData()}>
                        Tambah Data
                    </button>

                    <ul className="list-group">
                        {this.state.members.map(member => (
                            <li className="list-group-item">
                                {/* list group item lebih responsif */}
                                <div className="row">
                                    {/* clasname : row, berguna untuk menyusun data ke samping, karena defaultnya ke bawah*/}
                                    {/* BAGIAN NAMA*/}
                                    <div className="col-lg-4">
                                        <small className="text-info">Nama</small> <br />
                                        {member.nama}
                                    </div>

                                    {/* BAGIAN GENDER*/}
                                    <div className="col-lg-2">
                                        <small className="text-info">Gender</small> <br />
                                        {member.jenis_kelamin}
                                    </div>

                                    {/* BAGIAN TELEPON*/}
                                    <div className="col-lg-3">
                                        <small className="text-info">Telepon</small> <br />
                                        {member.telepon}
                                    </div>

                                    <button small className='btn btn-sm col-sm-1 btn-success mx-1'
                                        onClick={() => this.ubahData(member.id_member)}>
                                        Edit
                                    </button>

                                    <button className='btn btn-sm col-sm-1 btn-danger mx-1'
                                        onClick={() => this.hapusData(member.id_member)}>
                                        Delete
                                    </button>

                                    {/* BAGIAN ALAMAT*/}
                                    <div className="col-lg-12">
                                        <small className="text-info">Alamat</small> <br />
                                        {member.alamat}
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>

                    {/** Form Modal Member */}
                    <div className="modal" id="modal-member" > {/** AND THIS "modal-member" harus sama seyeng */}
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
                                            Save
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