import React from 'react';
import SVG from 'react-inlinesvg';
import { useTranslation } from 'react-i18next';
import { useCredentials } from '../contexts/Credentials';

interface Properties {
    logout: { (): void };
}

export function Header({ logout }: Properties) {
    const { t } = useTranslation();
    const credentials = useCredentials();
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <SVG src={require('../images/logo.svg')} />
                </div>
                {credentials !== undefined && (
                    <div className="offset-9 col-1 text-right pr-0 mr-0">
                        <button className="btn btn-secondary" onClick={logout}>
                            {t('logout')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
