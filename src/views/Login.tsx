import React, { Dispatch, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Credentials, getModel } from '../models/Credentials';

interface Properties {
    onAuthenticated: Dispatch<React.SetStateAction<Credentials | undefined>>;
}

interface FormData {
    username: string | null;
    password: string | null;
}

export function Login(props: Properties) {
    const { t } = useTranslation();

    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [credentials, setCredentials] = useState<FormData>({ username: null, password: null });

    function onLoginAttempt(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            setAuthenticating(true);
            getModel(credentials.username, credentials.password).then((result) => {
                if (result !== undefined) {
                    props.onAuthenticated(result);
                }
            });
        }
    }

    const canAuthenticate = authenticating || (credentials.username === null && credentials.password === null);

    return (
        <div className="modal-dialog-centered" tabIndex={-1}>
            <div className="modal-dialog">
                <form>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('login')}</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-3">
                                    <label htmlFor="username" className="col-form-label">
                                        {t('username')}
                                    </label>
                                </div>
                                <div className="col-9">
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        tabIndex={1}
                                        disabled={authenticating}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                                            setCredentials({ ...credentials, username: ev.target.value })
                                        }
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
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        disabled={authenticating}
                                        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void =>
                                            setCredentials({ ...credentials, password: ev.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-top-0">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                disabled={canAuthenticate}
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
