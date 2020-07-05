import React from 'react';

export function Footer() {
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
                        Server Docs
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/getstarted.html" target="_new">
                        Tutorials
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://groups.google.com/forum/#!forum/rabbitmq-users" target="_new">
                        Community Support
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://rabbitmq-slack.herokuapp.com/" target="_new">
                        Community Slack
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/services.html" target="_new">
                        Commercial Support
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/plugins.html" target="_new">
                        Plugins
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/github.html" target="_new">
                        Github
                    </a>
                </li>
                <li className="list-inline-item mr-4">
                    <a href="https://www.rabbitmq.com/changelog.html" target="_new">
                        Changelog
                    </a>
                </li>
            </ul>
        </footer>
    );
}
