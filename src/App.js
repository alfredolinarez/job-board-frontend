import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import JobDetails from './pages/JobDetails';
import Administrator from './pages/Administrator';
import AddJob from './pages/AddJob';
import Register from './pages/Register';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/add" component={AddJob} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Administrator} />
        <Route exact path="/jobdetails/:id" component={JobDetails} />
        <Route exact path="/categorypage" component={CategoryPage} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
