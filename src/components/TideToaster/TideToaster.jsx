import React from 'react';
import './TideToaster.scss';
import _ from 'lodash';
import classNames from 'classnames';


class TideToaster extends React.Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }

    clearMessage = (id) => {
        const index = _.findIndex(this.state.messages, (msg) => msg.id === id);
        if (index === -1)
            return;
        const messages = [...this.state.messages];
        messages.splice(index, 1);
        this.setState({ messages });
    };

    showMessage = (content, config) => {

        const message = { content, ...config, id: Math.random() };
        this.setState({
            messages: [...this.state.messages, message]
        });
        setTimeout(() => {
            this.clearMessage(message.id);
        }, Number(config.duration) || 5000);

        return message;
    };

    error = (content, config = {}) => {
        this.showMessage(content, { type: 'error', ...config });
    };

    success = (content, config = {}) => {
        this.showMessage(content, { type: 'success', ...config });
    };

    info = (content, config = {}) => {
        this.showMessage(content, { type: 'info', ...config });
    };

    render() {

        const { messages } = this.state;
        const message = !!messages.length && messages[messages.length - 1];

        //Only last message is shown because of aesthetics
        return (
            <div className={"TideToaster"}>
                {message &&
                    <div className={classNames('message-bar', message.className, message.type)}>{message.content}</div>
                }
            </div>
        );
    }
}

export default TideToaster;
