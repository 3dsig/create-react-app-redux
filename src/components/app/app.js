import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from '../../containers/home_container'
import Login from '../login/login'
import Main from '../main/main'

const notFound = () => {
    return (<div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
    </div>);
};

const App = () => (

    <div>
        {/*<header>*/}
        {/*<Link to="/">Home</Link>*/}
        {/*<Link to="/about-us">About</Link>*/}
        {/*</header>*/}

        <main>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route component={notFound} /> {/* see https://stackoverflow.com/questions/32128978/react-router-no-not-found-route */}
            </Switch>
        </main>
    </div>
)

export default App
