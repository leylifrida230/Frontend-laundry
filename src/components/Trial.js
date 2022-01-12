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