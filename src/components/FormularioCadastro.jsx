import React, { useEffect, useState } from "react";

export function FormularioCadastro(props) {
    const camposIniciaisDeValores = {
        nomeCompleto: '',
        telefone: '',
        email: '',
        endereco: '',
    }

    // desestructuring 
    let [values, setValues] = useState(camposIniciaisDeValores)

    useEffect(() => {
        if(props.idAtual === '') {
            setValues({
                ...camposIniciaisDeValores
            })
        } else {
            setValues({
                ...props.dadosPacientes[props.idAtual]
            })
        }
    }, [props.idAtual, props.dadosPacientes])

    const manipuladorInputChange = e => {
        let { name, value } = e.target

        setValues({
            ...values,
            [name]: value
        })
    }

    const manipuladorFormEnvio = e => {
        e.preventDefault()
        props.addEedit(values)
    }

    return (
        <form autoComplete="off" onSubmit={manipuladorFormEnvio}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>

                <input 
                    className="form-control" 
                    placeholder="Nome Completo" 
                    name="nomeCompleto" 
                    value={values.nomeCompleto} 
                    onChange={manipuladorInputChange}    
                />
            </div>

            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                    </div>

                    <input 
                        className="form-control" 
                        placeholder="Telefone" 
                        name="telefone" 
                        value={values.telefone} 
                        onChange={manipuladorInputChange}
                    />
                </div>

                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-envelope"></i>
                        </div>
                    </div>

                    <input 
                        className="form-control" 
                        placeholder="Email" 
                        name="email" 
                        value={values.email}
                        onChange={manipuladorInputChange}
                    />
                </div>
            </div>

            <div className="form-group">
                <textarea 
                    className="form-control"
                    placeholder="endereco" 
                    name="endereco" 
                    value={values.endereco} 
                    onChange={manipuladorInputChange}    
                />
            </div>

            <div className="form-group">
                <input 
                    type="submit"
                    value={ props.idAtual === '' ? 'Salvar' : 'Atualizar' } 
                    className="btn btn-primary btn-block"   
                />
            </div>
        </form>
    )
}