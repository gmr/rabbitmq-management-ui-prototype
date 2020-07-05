import React, { Dispatch, useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import { useTranslation } from 'react-i18next';
import { AuthenticatedUser } from '../models/AuthenticatedUser';
import { Overview } from '../models/Overview';
import { VHost } from '../models/VHost';

interface Properties {
    logout: { (): void };
    authenticatedUser: AuthenticatedUser | null;
    overview: Overview | null;
    updateVHost: Dispatch<React.SetStateAction<string | null>>;
    vhosts: Array<VHost> | null;
}

export function Header({ logout, authenticatedUser, overview, vhosts, updateVHost }: Properties) {
    const { t } = useTranslation();
    const all_vhosts = t('header_all_vhosts');
    const [vhost, setVHost] = useState<string | null>(null);
    const [vhostNames, setVHostNames] = useState<Array<string> | null>(null);

    useEffect(() => {
        let values = [all_vhosts];
        if (vhosts !== null) values = values.concat(vhosts.map((value) => value.name));
        setVHostNames(values);
    }, [vhosts, all_vhosts]);

    useEffect(() => {
        if (authenticatedUser === null) {
            setVHost(all_vhosts);
        } else {
            setVHost(authenticatedUser.vhost === null ? all_vhosts : authenticatedUser.vhost);
        }
    }, [authenticatedUser, all_vhosts]);

    function onLogoutClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        logout();
    }

    function onVHostClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        updateVHost(event.currentTarget.innerText);
        setVHost(event.currentTarget.innerText);
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
                        {t('virtual_host')}:<span className="text-primary"> {vhost}</span>
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
                                {t('virtual_host')}: <span className="text-primary">{vhost}</span>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarVirtualHosts">
                                {vhostNames !== null &&
                                    vhostNames
                                        .filter((value) => vhost !== value)
                                        .map((value) => {
                                            return (
                                                <li key={'vhost-' + value}>
                                                    <button className="btn dropdown-item" onClick={onVHostClick}>
                                                        {value}
                                                    </button>
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
