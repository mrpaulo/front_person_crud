import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PessoaLista from './PessoaLista';
import PessoaDetalhes from './PessoaDetalhes';
import { LoginPage } from './LoginPage';
import { PrivateRoute } from './PrivateRoute'

class PessoaApp extends Component {
    render() {
        return (<>
              <h1>Cadastro de Pessoas</h1>
              <Router>
                <>                    
                    <Switch>
                        <PrivateRoute exact path="/" component={PessoaLista} />
                        <Route path="/login" component={LoginPage} />
                        <PrivateRoute path="/pessoas" component={PessoaLista} />
                        <PrivateRoute path="/pessoa/:id" component={PessoaDetalhes}/>} />
                    </Switch>
                </>
            </Router>
              </>
        )
    }
}

export default PessoaApp