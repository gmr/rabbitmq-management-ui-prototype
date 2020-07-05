import React from 'react';
import SVG from 'react-inlinesvg';
import { useTranslation } from 'react-i18next';
import { AuthenticatedUser } from '../models/AuthenticatedUser';
import { Overview } from '../models/Overview';
import { VHost } from '../models/VHost';

interface Properties {
    logout: { (): void };
    authenticatedUser: AuthenticatedUser | null;
    overview: Overview | null;
    vhosts: Array<VHost> | null;
}

export function Header({ logout, authenticatedUser, overview, vhosts }: Properties) {
    const { t } = useTranslation();

    function onLogoutClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        logout();
    }

    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light border-bottom border-secondary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <SVG src={require('../images/logo.svg')} />
                </a>
                {overview && (
                    <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <span className="badge bg-light text-dark border border-dark font-weight-normal">
                                {overview.product_name} {overview.product_version}
                            </span>
                        </li>
                        <li className="nav-item">
                            <span className="ml-2 badge bg-light text-dark border border-dark font-weight-normal">
                                Erlang {overview.erlang_version}
                            </span>
                        </li>
                    </ul>
                )}
                {overview && (
                    <span className="nav-text float-lg-right mr-2">
                        {t('cluster')}:<span className="text-primary"> {overview.cluster_name}</span>
                    </span>
                )}
                {authenticatedUser && vhosts && vhosts.length === 1 && (
                    <span className="nav-text float-lg-right mr-2">
                        {t('virtual_host')}:<span className="text-primary"> {authenticatedUser.vhost}</span>
                    </span>
                )}
                {authenticatedUser && vhosts && vhosts.length > 1 && (
                    <ul className="navbar-nav mr-2 mb-2 mb-lg-0 float-lg-right">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link btn dropdown-toggle"
                                id="navbarVirtualHosts"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {t('virtual_host')}: <span className="text-primary">{authenticatedUser.vhost}</span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarVirtualHosts">
                                {vhosts
                                    .filter((vhost) => vhost.name !== authenticatedUser.vhost)
                                    .map((vhost) => {
                                        return (
                                            <li key={'vhost-' + vhost.name}>
                                                <button className="btn dropdown-item">{vhost.name}</button>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </li>
                    </ul>
                )}
                {authenticatedUser && (
                    <ul className="navbar-nav mb-2 mb-lg-0 float-lg-right mr-2">
                        <li className="nav-item dropdown">
                            <button
                                className="nav-link dropdown-toggle btn"
                                id="navbarUser"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {t('user')}: <span className="text-primary">{authenticatedUser.username}</span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarUser">
                                <li>
                                    <button className="btn dropdown-item" onClick={onLogoutClick}>
                                        {t('logout')}
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}
