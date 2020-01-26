import React, { Component } from 'react';
import PessoaDataService from './PessoaDataService';
import Utils from './Utils';

class PessoaLista extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pessoas: [],
            message: null
        }

        this.refreshPessoas = this.refreshPessoas.bind(this)
        this.excluirPessoa = this.excluirPessoa.bind(this)
        this.editarPessoa = this.editarPessoa.bind(this)
        this.adicionarPessoa = this.adicionarPessoa.bind(this)
    }

    componentDidMount() {
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

                    console.log(response);
                    this.setState({ pessoas: listaPessoas })
                }
            )
    }
    adicionarPessoa() {
        this.props.history.push(`/pessoa/-1`)
    }
    editarPessoa(id) {
        console.log('update ' + id)
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
                <h3>Todas pessoas</h3>
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