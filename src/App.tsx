import React, { useState } from 'react';
import { Credentials } from './models/Credentials';
import { CredentialsContext } from './contexts/Credentials';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Login } from './views/Login';

function App() {
    const [credentials, setCredentials] = useState<Credentials>();
    const [loggedOut, setLoggedOut] = useState<boolean>(false);

    function logout() {
        setCredentials(undefined);
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
        <CredentialsContext.Provider value={credentials}>
            <Header logout={logout} />
            {credentials === undefined && <Login onAuthenticated={setCredentials} loggedOut={loggedOut} />}
            {credentials !== undefined && (
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-body">
                            Authenticated as <strong>{credentials.username}</strong>
                            <br />
                            Tags {credentials.tags.map(renderTag)}
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </CredentialsContext.Provider>
    );
}

export default App;
