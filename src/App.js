import './App.css';
import Data from './Data'
import Summary from './Summary';
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
      
        <Switch>
          <Route exact path='/' component={Data}></Route>
          <Route path='/Summary' component={Summary}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
