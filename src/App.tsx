import React, { useEffect, useState } from 'react';

import { AuthenticatedUser, getAuthenticatedUser, logout, saveAuthenticatedUser } from './models/AuthenticatedUser';
import { Overview, getOverview } from './models/Overview';
import { VHost, getVHosts } from './models/VHost';

import { Header } from './components/Header';
import { Login } from './views/Login';
import { Navigation } from './components/Navigation.';
import { Footer } from './components/Footer';
import {RefreshSelector} from "./components/RefreshSelector";

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(getAuthenticatedUser());
    const [loggedOut, setLoggedOut] = useState<boolean>(false);
    const [overview, setOverview] = useState<Overview | null>(null);
    const [refresh, setRefresh] = useState<number>(-1);
    const [vhost, setVHost] = useState<string | null | undefined>(undefined);
    const [vhosts, setVHosts] = useState<Array<VHost> | null>(null);

    useEffect(() => {
        if (authenticatedUser !== null) {
            if (overview === null)
                getOverview().then((overview) => {
                    if (overview) setOverview(overview);
                });
            if (vhosts === null)
                getVHosts().then((values) => {
                    if (values) setVHosts(values);
                });
            if (refresh === -1 && authenticatedUser.refresh !== refresh)
                setRefresh(authenticatedUser.refresh)
            else if (authenticatedUser.refresh !== refresh) {
                authenticatedUser.refresh = refresh;
                saveAuthenticatedUser(authenticatedUser);
            }
            if (vhost === undefined)
                setVHost(authenticatedUser.vhost)
            else if (authenticatedUser.vhost !== vhost) {
                authenticatedUser.vhost = vhost;
                saveAuthenticatedUser(authenticatedUser);
            }
        }
    }, [authenticatedUser, overview, refresh, vhost, vhosts]);

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
                    <RefreshSelector authenticatedUser={authenticatedUser} updateRefresh={setRefresh} />
                    <Navigation authenticatedUser={authenticatedUser} />
                </div>
            )}
            <Footer />
        </>
    );
}

export default App;
