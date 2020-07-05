import React from 'react';
import SVG from 'react-inlinesvg';
import { useTranslation } from 'react-i18next';
import { AuthenticatedUser } from '../models/AuthenticatedUser';
import { Overview } from '../models/Overview';

interface Properties {
    logout: { (): void };
    authenticatedUser: AuthenticatedUser | null;
    overview: Overview | null;
}

export function Header({ logout, authenticatedUser, overview }: Properties) {
    const { t } = useTranslation();
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-2">
                    <SVG src={require('../images/logo.svg')} />
                </div>
                {authenticatedUser !== undefined && (
                    <div className="offset-9 col-1 text-right pr-0 mr-0">
                        <button className="btn btn-secondary btn-sm" onClick={logout}>
                            {t('logout')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
