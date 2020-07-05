import React from 'react';
import { useTranslation } from 'react-i18next';
import { AuthenticatedUser } from '../models/AuthenticatedUser';

interface Properties {
    authenticatedUser: AuthenticatedUser | null;
}

export function Navigation({ authenticatedUser }: Properties) {
    const { t } = useTranslation();

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                    {t('nav_overview')}
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    {t('nav_connections')}
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    {t('nav_channels')}
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    {t('nav_exchanges')}
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">
                    {t('nav_queues')}
                </a>
            </li>
            {authenticatedUser && authenticatedUser.tags.includes('administrator') && (
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        {t('nav_admin')}
                    </a>
                </li>
            )}
        </ul>
    );
}
