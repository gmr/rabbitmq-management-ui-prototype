import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="border-top text-center">
            <ul className="list-inline mt-3">
                <li className="list-inline-item mr-4">
                    <a href="/api" target="_new">
                        HTTP API
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/admin-guide.html" target="_new">
                        {t('server_docs')}
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/getstarted.html" target="_new">
                        {t('tutorials')}
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://groups.google.com/forum/#!forum/rabbitmq-users" target="_new">
                        {t('community_support')}
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://rabbitmq-slack.herokuapp.com/" target="_new">
                        {t('community_slack')}
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/services.html" target="_new">
                        {t('commercial_support')}
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/plugins.html" target="_new">
                        {t('plugins')}
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/github.html" target="_new">
                        Github
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/changelog.html" target="_new">
                        {t('changelog')}
                    </a>
                </li>
            </ul>
        </footer>
    );
}
