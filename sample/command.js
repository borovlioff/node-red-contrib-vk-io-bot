const { VK } = require('vk-io');

module.exports = function (RED) {
    function CommandNode(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        var node = this;
        var vk = new VK({
            token: this.config.token,
            apiVersion: this.config.apiVersion
        });

        vk.updates.on('message_new', (context) => {
            const { message } = context;

            if (message.text) {
                if (config.regex) {
                    const regex = new RegExp(config.command);

                    if (regex.test(message.text)) {
                        // Создаем объект сообщения для отправки в следующий узел
                        var msg = {
                            topic: 'vk-message',
                            payload: {
                                ...message
                                // Другие поля сообщения, которые вы хотите передать
                            }
                        };

                        // Отправляем объект сообщения в следующий узел
                        node.send(msg);
                    }
                } else if (message.text === config.command) {
                    // Создаем объект сообщения для отправки в следующий узел
                    var msg = {
                        topic: 'vk-message',
                        payload: {
                            ...message
                            // Другие поля сообщения, которые вы хотите передать
                        }
                    };

                    // Отправляем объект сообщения в следующий узел
                    node.send(msg);
                }
            }
        });

        vk.updates.start().catch((error) => {
            node.error(`Failed to start updates:${error.toString()}`);
        });

        node.on('close', function () {
            vk.updates.stop();
        });
    }
    RED.nodes.registerType('command', CommandNode);
};
