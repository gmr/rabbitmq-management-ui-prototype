import React, { Dispatch, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthenticatedUser, login } from '../models/AuthenticatedUser';

interface Properties {
    onAuthenticated: Dispatch<React.SetStateAction<AuthenticatedUser | null>>;
    loggedOut: boolean;
}

interface FormData {
    username: string | null;
    password: string | null;
}

export function Login(props: Properties) {
    const { t } = useTranslation();

    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loggedOut, setLoggedOut] = useState<boolean>(props.loggedOut);
    const [credentials, setCredentials] = useState<FormData>({ username: null, password: null });

    const usernameRef = useRef<HTMLInputElement>(null);

    function onLoginAttempt(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            setAuthenticating(true);
            login(credentials.username, credentials.password).then((result) => {
                setAuthenticating(false);
                setLoggedOut(false);
                if (result !== undefined) {
                    setError(false);
                    props.onAuthenticated(result);
                } else {
                    setError(true);
                    setCredentials({ ...credentials, password: null });
                    usernameRef.current?.focus();
                }
            });
        }
    }

    const disableButton = authenticating || credentials.username === null || credentials.password === null;

    return (
        <div className="modal-dialog-centered" tabIndex={-1}>
            <div className="modal-dialog">
                <form noValidate>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('login')}</h5>
                        </div>
                        <div className="modal-body">
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {t('login_failed')}
                                </div>
                            )}
                            {loggedOut && (
                                <div className="alert alert-success" role="alert">
                                    {t('logged_out')}
                                </div>
                            )}
                            <div className="row mb-3">
                                <div className="col-3">
                                    <label htmlFor="username" className="col-form-label">
                                        {t('username')}
                                    </label>
                                </div>
                                <div className="col-9">
                                    <input
                                        autoFocus
                                        required
                                        autoComplete="username"
                                        className={'form-control'}
                                        disabled={authenticating}
                                        id="username"
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                                            setCredentials({ ...credentials, username: ev.target.value })
                                        }
                                        ref={usernameRef}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="password" className="col-form-label">
                                        {t('password')}
                                    </label>
                                </div>
                                <div className="col-9">
                                    <input
                                        required
                                        className={'form-control'}
                                        disabled={authenticating}
                                        id="password"
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                                            setCredentials({ ...credentials, password: ev.target.value })
                                        }
                                        type="password"
                                        value={credentials.password ? credentials.password : ''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button
                                type="submit"
                                className="btn btn-outline-primary"
                                disabled={disableButton}
                                onClick={onLoginAttempt}
                            >
                                {t('login')}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
