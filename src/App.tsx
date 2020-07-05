import React, { useEffect, useState } from 'react';

import { AuthenticatedUser, getAuthenticatedUser, logout } from './models/AuthenticatedUser';
import { Overview, getOverview } from './models/Overview';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Login } from './views/Login';

function App() {
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(getAuthenticatedUser());
    const [loggedOut, setLoggedOut] = useState<boolean>(false);
    const [overview, setOverview] = useState<Overview | null>(null);

    useEffect(() => {
        if (authenticatedUser) {
            getOverview().then((overview) => {
                if (overview) setOverview(overview);
            });
        }
    }, [authenticatedUser]);

    function onLogout() {
        logout();
        setAuthenticatedUser(null);
        setLoggedOut(true);
    }

    function renderTag(tag: string) {
        return (
            <span key={'tag-' + tag} className="badge bg-primary">
                {tag}
            </span>
        );
    }

    return (
        <>
            <Header authenticatedUser={authenticatedUser} logout={onLogout} overview={overview} />
            {authenticatedUser === null && <Login onAuthenticated={setAuthenticatedUser} loggedOut={loggedOut} />}
            {authenticatedUser !== null && (
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-body">
                            Authenticated as <strong>{authenticatedUser.username}</strong>
                            <br />
                            Tags {authenticatedUser.tags.map(renderTag)}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

export default App;
