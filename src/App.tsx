import React, { useState } from 'react';
import { Credentials } from './models/Credentials';
import { CredentialsContext } from './contexts/Credentials';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Login } from './views/Login';

function App() {
    const [credentials, setCredentials] = useState<Credentials>();

    function logout() {
        setCredentials(undefined);
    }

    return (
        <CredentialsContext.Provider value={credentials}>
            <Header logout={logout} />
            {credentials === undefined && <Login onAuthenticated={setCredentials} />}
            {credentials !== undefined && <div>Authenticated</div>}
            <Footer />
        </CredentialsContext.Provider>
    );
}

export default App;
