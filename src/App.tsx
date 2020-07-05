import React, { useEffect, useState } from 'react';

import { AuthenticatedUser, getAuthenticatedUser, logout, saveAuthenticatedUser } from './models/AuthenticatedUser';
import { Overview, getOverview } from './models/Overview';
import { VHost, getVHosts } from './models/VHost';

import { Header } from './components/Header';
import { Login } from './views/Login';
import { Navigation } from './views/Navigation.';
import { Footer } from './components/Footer';

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(getAuthenticatedUser());
    const [loggedOut, setLoggedOut] = useState<boolean>(false);
    const [overview, setOverview] = useState<Overview | null>(null);
    const [vhost, setVHost] = useState<string | null>(null);
    const [vhosts, setVHosts] = useState<Array<VHost> | null>(null);

    useEffect(() => {
        if (authenticatedUser && overview === null) {
            getOverview().then((overview) => {
                if (overview) setOverview(overview);
            });
        }
        if (authenticatedUser && vhosts === null) {
            getVHosts().then((values) => {
                if (values) setVHosts(values);
            });
        }
    }, [authenticatedUser, overview, vhosts]);

    useEffect(() => {
        if (authenticatedUser !== null && authenticatedUser.vhost !== vhost) {
            authenticatedUser.vhost = vhost;
            saveAuthenticatedUser(authenticatedUser);
        }
    }, [authenticatedUser, vhost]);

    function onLogout() {
        logout();
        setAuthenticatedUser(null);
        setLoggedOut(true);
        setOverview(null);
        setVHosts(null);
    }

    return (
        <>
            <Header
                authenticatedUser={authenticatedUser}
                logout={onLogout}
                overview={overview}
                updateVHost={setVHost}
                vhosts={vhosts}
            />
            {authenticatedUser === null && <Login onAuthenticated={setAuthenticatedUser} loggedOut={loggedOut} />}
            {authenticatedUser !== null && (
                <div className="container-fluid">
                    <Navigation authenticatedUser={authenticatedUser} />
                </div>
            )}
            <Footer />
        </>
    );
}

export default App;
