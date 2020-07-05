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
                <button className="nav-link btn active" aria-current="page">
                    {t('nav_overview')}
                </button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn">{t('nav_connections')}</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn">{t('nav_channels')}</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn">{t('nav_exchanges')}</button>
            </li>
            <li className="nav-item">
                <button className="nav-link btn">{t('nav_queues')}</button>
            </li>
            {authenticatedUser && authenticatedUser.tags.includes('administrator') && (
                <li className="nav-item">
                    <button className="nav-link btn">{t('nav_admin')}</button>
                </li>
            )}
        </ul>
    );
}
