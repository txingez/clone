import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import OperationRulePage from './app/ui/operationRule/operationRulePage'
import NotFoundPage from './app/notFoundPage'
import MainLayout from './app/layout/mainLayout'
import UserNotActivePage from './app/userNotActivePage'
import WaitingPage from './app/waitingPage'

export default (
  <Router>
    <div>
      <Switch>
        <MainLayout exact path="/" component={OperationRulePage}/>
        <MainLayout exact path="/accounts/:media/:mediaAccountId" component={OperationRulePage}/>
        <MainLayout exact path="/accounts/:media/:mediaAccountId/rules/:ruleId" component={OperationRulePage}/>
        <Route exact path="/not-active" component={UserNotActivePage}/>
        <Route exact path='/callback' component={WaitingPage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  </Router>
)
