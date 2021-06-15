import React from 'react';
import { Container } from 'react-bootstrap';
import './Application.sass';
import TopMenu from '../TopMenu/TopMenu';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TerminiPage from '../TerminiPage/TerminiPage';
import StranicePage from '../StranicePage/StranicePage';


export default function Application() {
  return (
    <BrowserRouter>
      <Container className = "Application">
        <div className="Application-header">
          Front
        </div>

        <TopMenu />

        <div className = "Application-body">

          <Switch>
            <Route exact path="/termini">
              <TerminiPage/>
            </Route>

            <Route path="/rezervacije">
              <StranicePage />
            </Route>

            <Route path="/korisnik/:uid?">
              Nalog
            </Route>

            <Route path="/odjava">
              <StranicePage />
            </Route>
          </Switch>
        </div>


      </Container>
    </BrowserRouter>
  );
}


