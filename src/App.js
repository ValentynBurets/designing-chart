import './App.css';
import Layout from './Components/Layout';
import Home from "./Pages/HomePage/Home"
import UserTaskListPage from "./Pages/UserTaskListPage/UserTaskListPage"
import UserTaskPerformance from "./Pages/UserTaskPerformancePage/UserTaskPerformancePage"
import AutorizationPage from "./Pages/AutorizationPage/AutorizationPage"
import UserListPage from "./Pages/UserListPage/UserListPage"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/user-task-list">UserTaskListPage</Link>
            </li>
            <li>
              <Link to="/user-task-performance">UserTaskPerformance</Link>
            </li>
            <li>
              <Link to="/autorization">AutorizationPage</Link>
            </li>
            <li>
              <Link to="/user-list-page">UserListPage</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Layout>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/user-task-list">
              <UserTaskListPage />
            </Route>
            <Route path="/user-task-performance">
              <UserTaskPerformance />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/autorization">
              <AutorizationPage />
            </Route>
            <Route path="/user-list-page">
              <UserListPage />
            </Route>
          </Layout>
        </Switch>
      </div>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}