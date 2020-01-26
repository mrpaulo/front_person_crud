import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PessoaLista from './PessoaLista';
import PessoaDetalhes from './PessoaDetalhes';


class PessoaApp extends Component {
    render() {
        return (<>
              <h1>Cadastro de Pessoas</h1>
              <Router>
                <>                    
                    <Switch>
                        <Route exact path="/" component={PessoaLista} />
                        <Route path="/pessoas" component={PessoaLista} />
                        <Route path="/pessoa/:id" component={PessoaDetalhes}/>} />
                    </Switch>
                </>
            </Router>
              </>
        )
    }
}

export default PessoaApp