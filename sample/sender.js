const { VK } = require('vk-io');

module.exports = function (RED) {
  function SenderNode(config) {
    RED.nodes.createNode(this, config);
    this.config = RED.nodes.getNode(config.config);
    var node = this;
    var vk = new VK({
      token: this.config.token,
      apiVersion: this.config.apiVersion
    });

    this.on('input', function (msg) {
        var peer_id = config.peer_id || msg.payload.peer_id;
        var text = config.text || msg.payload.text;
        var random_id = Date.now();

      vk.api.messages.send({
        peer_id: peer_id,
        message: text,
        random_id: random_id,
        ...msg.payload
        // Другие параметры сообщения, если нужно
      })
        .then((res) => {
          node.status({ fill: 'green', shape: 'dot', text: 'Message sent' });
          node.send({
            payload:{message_id:res}
          });
        })
        .catch((error) => {
          node.status({ fill: 'red', shape: 'ring', text: 'Failed to send message' });
          node.error('Failed to send message: '+ error.toString());
        });
    });

    node.on('close', function () {
      // Дополнительные действия при закрытии узла
    });
  }

  RED.nodes.registerType('sender', SenderNode);
};
