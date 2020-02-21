import React, { Component } from 'react'
import IronInput from './IronInput';
import IronSelect from './IronSelect';
import { roleOptions } from '../utils';

class Register extends Component {
    state = {
        paternalLastName: '',
        rfc: '',
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        disabled: true
    }

    handleChange = (e) => {
        let { name, value } = e.target; 
        this.setState({[name]: value}, this.checkIfReady)
    }

    checkIfReady = () => {
        let checkState = Object.assign({}, this.state);
        delete checkState.maternalLastName;
        delete checkState.disabled;
        let values = Object.values(checkState);
        let isReady = values.reduce((acu, current) => {
            console.log(acu, current)
            return acu && current;
        }, true);
        this.setState({disabled: !isReady});
    }

    sendInfo = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h1>Bienvenido a IronKonfio</h1>
                <p>Ingresa tus datos de contacto para ayudarte en todo momento</p>
                <p>Si tu negocio factura como persona moral, ingresa los datos de un socio o representante legal?</p>
                <IronInput label="Nombre(s)" type="text" name="name" placeholder="Andres" handleChange={this.handleChange}/>
                <IronInput label="Primer Apellido" type="text" name="paternalLastName" placeholder="Cravioto" handleChange={this.handleChange}/>
                <IronInput label="Segundo Apellido" type="text" name="maternalLastName" placeholder="Vélez" handleChange={this.handleChange}/>
                <IronInput label="Email" type="email" name="email" placeholder="andres@email.com" handleChange={this.handleChange}/>
                <IronInput label="Celular" type="number" name="phoneNumber" placeholder="5512232323" handleChange={this.handleChange}/>
                <IronInput label="Contraseña" type="password" name="password" handleChange={this.handleChange}/>
                <h3>Ingresa el RFC con el que facturas</h3>
                <IronInput label="RFC" type="text" name="rfc" handleChange={this.handleChange}/>
                {
                    this.state.rfc.length == 12 && 
                    <IronSelect 
                        label="role"
                        name="role" 
                        handleChange={this.handleChange}
                        options={roleOptions}
                    />
                }
                <button disabled={this.state.disabled} onClick={this.sendInfo}>Submit</button>
            </div>
        )
    }
}

export default Register;