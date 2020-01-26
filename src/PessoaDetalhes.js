import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';

import PessoaDataService from './PessoaDataService';
import Utils from './Utils'

const cpfMask = [
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ".",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    ".",
    /[0-9]/,
    /[0-9]/,
    /[0-9]/,
    "-",
    /[0-9]/,
    /[0-9]/
];

class PessoaDetalhes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            pessoa: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }
    componentDidMount() {

        console.log(this.state.id)
        // eslint-disable-next-line
        if (this.state.id == -1) {
            this.setState({ subtitulo: "Adicionar pessoa" });
            return
        }

        PessoaDataService.carregarPessoa(this.state.id)
            .then(response => {
                let pessoa = response.data
                pessoa.cpf = Utils.formataCPF(pessoa.cpf);
                
                this.setState({ pessoa: pessoa, subtitulo: "Editar pessoa" })
            })
    }
    onSubmit(values) {
        console.log(values);
        let pessoa = {
            id: this.state.id,
            cpf: Utils.retiraFormatCPF(values.cpf),
            nome: values.nome,
            sexo: values.sexo,
            email: values.email,
            dataNascimento: values.dataNascimento,
            naturalidade: values.naturalidade,
            nacionalidade: values.nacionalidade
        }

        if (this.state.id == -1) {
            PessoaDataService.adicionarPessoa(pessoa)
                .then(() => this.props.history.push('/pessoas'))
        } else {
            PessoaDataService.editarPessoa(this.state.id, pessoa)
                .then(() => this.props.history.push('/pessoas'))
        }


    }

    validate(values) {
        let errors = {}
        if (!values.nome) {
            errors.nome = 'Informar o nome é obrigatório'
        } else if (values.nome.length > 100) {
            errors.nome = 'Tamanho máximo do nome é de 100 caracteres'
        }

        if (!values.cpf) {
            errors.cpf = 'Informar o CPF é obrigatório'
        } else if (Utils.validaErroCPF(values.cpf)) {
            errors.cpf = 'CPF informado é inválido'
        }

        if (!values.dataNascimento) {
            errors.dataNascimento = 'Informar a data de nascimento é obrigatório'
        } else if (Utils.validaErroData(values.dataNascimento)) {
            errors.dataNascimento = 'Data de nascimento informada é inválida'
        }

        if (Utils.validaErroEmail(values.email)) {
            errors.email = 'E-mail informado é inválido'
        } else if (values.email && values.email.length > 100) {
            errors.email = 'Tamanho máximo do e-mail é de 100 caracteres'
        }

        if (values.naturalidade && values.naturalidade.length > 100) {
            errors.naturalidade = 'Tamanho máximo da naturalidade é de 100 caracteres'
        }

        if (values.nacionalidade && values.nacionalidade.length > 100) {
            errors.nacionalidade = 'Tamanho máximo da nacionalidade é de 100 caracteres'
        }

        return errors
    }
    limparForm() {
        let pessoa = {
            nome: '',
            cpf: '',
            email: '',
            dataNascimento: '',
            sexo: '',
            nacionalidade: '',
            naturalidade: ''
        }
        this.setState({pessoa: pessoa})
    }

    render() {
        let subtitulo = this.state.subtitulo;
        let id = this.state.id;
        let { nome, cpf, email, dataNascimento, sexo, nacionalidade, naturalidade } = this.state.pessoa;
        return (

            <div>
                <h3>{subtitulo}</h3>
                <div className="container">
                    <Formik
                        initialValues={{ id, nome, cpf, email, dataNascimento, sexo, nacionalidade, naturalidade }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => {

                                return (
                                    <Form>
                                        <ErrorMessage name="nome" component="div"
                                            className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label>Nome</label>
                                            <Field className="form-control" type="text" name="nome" />
                                        </fieldset>
                                        <ErrorMessage name="email" component="div"
                                            className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label>E-mail</label>
                                            <Field className="form-control" type="email" name="email" />
                                        </fieldset>
                                        <ErrorMessage name="cpf" component="div"
                                            className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label>CPF</label>
                                            <Field
                                                className="form-control"
                                                name="cpf"
                                                render={({ field }) => (
                                                    <MaskedInput
                                                        {...field}
                                                        mask={cpfMask}
                                                        id="cpf"
                                                        type="text"
                                                        className="form-control"
                                                    />
                                                )}
                                            />
                                        </fieldset>
                                        <fieldset className="form-group">
                                            <label>Sexo</label>
                                            {/* <Field className="form-control" type="text" name="sexo" /> */}
                                            <Field as="select" className="form-control" name="sexo">
                                                <option value="" label="Selecione" />
                                                <option value="M" label="Masculino" />
                                                <option value="F" label="Feminino" />
                                            </Field>                                            
                                        </fieldset>
                                        <ErrorMessage name="dataNascimento" component="div"
                                            className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label>Data Nascimento</label>
                                            <Field className="form-control" type="date" name="dataNascimento" />
                                        </fieldset>
                                        <ErrorMessage name="naturalidade" component="div"
                                            className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label>Naturalidade</label>
                                            <Field className="form-control" type="text" name="naturalidade" />
                                        </fieldset>
                                        <ErrorMessage name="nacionalidade" component="div"
                                            className="alert alert-warning" />
                                        <fieldset className="form-group">
                                            <label>Nacionalidade</label>
                                            <Field className="form-control" type="text" name="nacionalidade" />
                                        </fieldset>
                                        <div style={{marginBottom: '20px'}}>
                                        <button className="btn btn-success" type="submit">Salvar</button>
                                        <button className="btn btn-warning" style={{marginLeft: '10px'}} type="reset" onClick={() => this.limparForm()}>Limpar</button>
                                        <button className="btn btn-alert" style={{marginLeft: '10px'}} type="reset" onClick={() => this.props.history.push('/pessoas')}>Cancelar</button>
                                        </div>
                                    </Form>
                                )
                            }
                        }

                    </Formik>

                </div>
            </div>
        )
    }

}

export default PessoaDetalhes