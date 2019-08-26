import * as React from "react";
import { connect } from 'react-redux'
import Results from './screens/Results'
import { AppState } from './store'


import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import Questions from "./screens/Questions";



class App extends React.Component<AppScreenProps, AppScreenState> {



  render() {
    


    return (
    <Router>
      <Switch>
        <Route path="/" exact component={Questions} />
        <Route path="/mainPage" exact component={Results} />
      </Switch>
    </Router>
    
    )
  }
}




interface AppScreenState {
}

interface AppScreenProps {
}

const mapStateToProps = (state: AppState) => ({
});

export default connect(
  mapStateToProps
)(App);