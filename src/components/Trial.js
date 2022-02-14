import React from "react";

class Trial extends React.Component{
    render(){
        // render adalah fungsi untuk tampilan element
        return(
            // di kurawal karena memuat javascript
            // pakai $ karena string digabung sama code 
            <div className={`alert alert-${this.props.bgColor}`}>  
                <h3 className="text-danger">{this.props.title}</h3>
                <small className={`alert alert-${this.props.textColor}`}>{this.props.subtitle}</small>
            </div>
        )
    }
}
export default Trial




import React from "react";
import Trial from "./components/Trial";

class App extends React.Component{
  constructor(){
    // construktor adalah fungsi yang pertama kali di jalankan saat pemanggilan komponen
    super()
    this.state = {
      label: "title of trial component",
      subtitle: "subtitle of trial component",
      color: "success",
      students: [
        {nis: "111", nama: "Budi", kota: "Malang"},
        {nis: "112", nama: "Putri", kota: "Jember"},
        {nis: "113", nama: "Fitro", kota:"Lumajang" },
        {nis: "114", nama: "Vero", kota:"Surabaya" }
      ]
      // state label ibarat variabel global, hanya berlaku di kelas ini saja
      // state di gunakan sebagai title komponen "Trial" (title={this.state.label})
      // karna title masih kosong, value masih kosong, karena menggunakan nilai dari label
      // di berikan control input yang menggunakan on change sehingga langsung ter update
      // untuk mengubah data state menggunakan "setState"
      // State.nama_state --> akses state
      // state --> data realtime dan sebuah komponen
      // statae di gunakan untuk menyimpan data yang di inputkan user (fungsi umum)
      //inget kan?, inget lah aamiin bismillah
      // state isinya array object
    }
  }
  render(){
    return(
      <div  >
        <Trial title={this.state.label} bgColor={this.state.color} textColor="dark"
        subtitle={this.state.subtitle} />

        Text Of Label 
        <input type="text" className="form-control" 
        value={this.state.label}
        onChange={ev => this.setState({label : ev.target.value})} />

        Text for subtitle
        <input type="text" className="form-control"
        value={this.state.subtitle}
        onChange={ev => this.setState({subtitle : ev.target.value})} />

        Color For Trial
        <select className="form-control" value={this.state.color}
        onChange={ev => this.setState({color : ev.target.value})} >
          <option value="danger" >Danger</option>
          <option value="warning" >Warning</option>
          <option value="success" >Success</option>
          <option value="secondary" >Secondaryy</option>
          <option value="info" >Info</option>
        </select>

        List Of students
        <ul className="list-groub" >
          {this.state.students.map(siswa => (
            <li className="list-group-item">
              <div className="row">
                <div className="col-lg-3">
                  <small className="text-primary">NIS</small> <br/>
                  <h5>{siswa.nis}</h5>
                </div>
                <div className= "col-lg-4">
                <small className="text-primary">NAMA</small> <br/>
                  <h5>{siswa.nama}</h5>
                </div>
                <div className= "col-lg-4">
                <small className="text-primary">KOTA</small> <br/>
                  <h5>{siswa.kota}</h5>
                </div>
              </div>
            </li>
          ))}
          
        </ul>
      </div>
    )
  }
}

export default App