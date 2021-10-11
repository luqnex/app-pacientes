import React, { useState, useEffect } from "react";
import { FormularioCadastro } from "./FormularioCadastro";
import fireDb from '../database/firebase'

export function Cadastro() {

    let [dadosPacientes, setDadosPacientes] = useState({})
    let [idAtual, setIdAtual] = useState('')

    useEffect(() => {
        // lista os pacientes
        fireDb.child('pacientes').on('value', dbPhoto => {
            if(dbPhoto.val() !== null) {
                setDadosPacientes({
                    ...dbPhoto.val()
                })
            } else {
                setDadosPacientes({})
            }
        })
    }, [])

    const addEedit = obj => {
        if(idAtual === '') {
            // adiciona novos pacientes
            fireDb.child('pacientes').push(
                obj,
                error => {
                    if(error) {
                        console.log(error)
                    } else {
                        setIdAtual('')
                    }
                }
            )
        } else{
            fireDb.child(`pacientes/${idAtual}`).set(
                obj, 
                error => {
                    if(error) {
                        console.log(error)
                    } 
                }
            )
        }
    }

    const deletePaciente = key => {
        if(window.confirm("Deseja realmente deletar esse cadastro?")) {
            fireDb.child(`pacientes/${key}`).remove(
                error => {
                    if(error) {
                        console.log(error)
                    }
                }
            )
        }
    }

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Cadastro de pacientes</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-5">
                    <FormularioCadastro {...({addEedit, idAtual, dadosPacientes})} />
                </div>

                <div className="col-md-7">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th>Nome Completo</th>
                                <th>Telefone</th>
                                <th>E-mail</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                Object.keys(dadosPacientes).map(id => {
                                    return (
                                        <tr key={id}>
                                            <td>{ dadosPacientes[id].nomeCompleto }</td>
                                            <td>{ dadosPacientes[id].telefone }</td>
                                            <td>{ dadosPacientes[id].email }</td>
                                        
                                            <a className="btn btn-primary" onClick={() => {setIdAtual(id)}}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>

                                            <a className="btn btn-danger" onClick={() => deletePaciente(id) }>
                                                <i className="fas fa-trash-alt mt-1"></i>
                                            </a>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}