import React, { Component } from 'react';
import PessoaDataService from './PessoaDataService';
import Utils from './Utils';
import { userService } from './userService';

class PessoaLista extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pessoas: [],
            message: null,
            erro: ''
        }

        this.refreshPessoas = this.refreshPessoas.bind(this)
        this.excluirPessoa = this.excluirPessoa.bind(this)
        this.editarPessoa = this.editarPessoa.bind(this)
        this.adicionarPessoa = this.adicionarPessoa.bind(this)
    }

    componentWillMount() {
        this.refreshPessoas();
    }

    refreshPessoas() {
        PessoaDataService.carregarTodasPessoas()//HARDCODED
            .then(
                response => {
                    var listaPessoas = response.data;
                    if (listaPessoas && listaPessoas.length > 0) {
                        listaPessoas.forEach(p => {
                            p.cpf = Utils.formataCPF(p.cpf);
                            p.dataNascimento = Utils.formataData(p.dataNascimento);
                            if (p.sexo == 'M') {
                                p.sexo = "Masculino"
                            } else if (p.sexo == 'F') {
                                p.sexo = "Feminino"
                            }
                        });
                    }
                    this.setState({ pessoas: listaPessoas })
                }
            ).catch(
                () => {
                    window.location.reload()                   
                })
    }
    adicionarPessoa() {
        this.props.history.push(`/pessoa/-1`)
    }
    editarPessoa(id) {
        this.props.history.push(`/pessoa/${id}`)
    }
    excluirPessoa(id, nome) {
        PessoaDataService.excluirPessoa(id)
            .then(
                response => {
                    this.setState({ message: `Pessoa ${nome} removida com sucesso` })
                    this.refreshPessoas()
                }
            )

    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-11">
                        <h3>Todas pessoas</h3>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-alert" onClick={() => this.props.history.push(`/login`)}>Sair</button>
                    </div>
                </div>
                
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Sexo</th>
                                <th>E-mail</th>
                                <th>Data nascimento</th>
                                <th>Naturalidade</th>
                                <th>Nacionalidade</th>
                                <th> </th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.pessoas.map(
                                    pessoa =>
                                        <tr key={pessoa.id}>
                                            <td>{pessoa.cpf}</td>
                                            <td>{pessoa.nome}</td>
                                            <td>{pessoa.sexo}</td>
                                            <td>{pessoa.email}</td>
                                            <td>{pessoa.dataNascimento}</td>
                                            <td>{pessoa.naturalidade}</td>
                                            <td>{pessoa.nacionalidade}</td>
                                            <td><button className="btn btn-success" onClick={() => this.editarPessoa(pessoa.id)}>Editar</button></td>
                                            <td><button className="btn btn-warning" onClick={() => {if (window.confirm(`Você tem certeza que deseja excluir ${pessoa.nome}?`)) {this.excluirPessoa(pessoa.id, pessoa.nome)}}}>Excluir</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.adicionarPessoa}>Adicionar</button>
                    </div>
                </div>
            </div>
        )

    }
}

export default PessoaLista