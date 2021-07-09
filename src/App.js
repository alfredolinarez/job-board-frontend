import './App.css';
import { BrowserRouter as Router, Switch, Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import Category from './pages/Category';
import JobDetails from './pages/Job';
import Administrator from './pages/Administrator';
import JobEditor from './pages/JobEditor';
import Register from './pages/Register';
import Login from './pages/Login';
import CategoryEditor from "./pages/CategoryEditor"
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

export default function App() {
  return (
    <Router>
      <Switch>
        <AuthenticatedRoute exact path="/add" component={JobEditor} />
        <UnauthenticatedRoute exact path="/register" component={Register} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
        <AuthenticatedRoute exact path="/admin" component={Administrator} />
        <AuthenticatedRoute exact path="/job/:id" component={JobDetails} />
        <AuthenticatedRoute exact path="/job/:id/edit" component={JobEditor} />
        <AuthenticatedRoute exact path={["/category/:slug", "/category/:slug/:page" ]} component={Category} />
        <AuthenticatedRoute exact path={["/admin/categories", "/admin/categories/:slug"]} component={CategoryEditor} />
        <AuthenticatedRoute exact path="/category" component={() => <Redirect to="/"/>} />
        <AuthenticatedRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}
