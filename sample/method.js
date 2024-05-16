const { VK } = require('vk-io');

function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

module.exports = function(RED) {
  function VkMethodNode(config) {
    RED.nodes.createNode(this, config);
    this.config = RED.nodes.getNode(config.config);
    var node = this;
    var vk = new VK({
      token: this.config.token,
      apiVersion: this.config.apiVersion
    });

    this.on('input', function(msg) {
      var method = config.method || msg.payload.method;
      let configParams = JSON.parse(config.params) || null;
      configParams = isEmpty(configParams) ? null : configParams;
      var params = configParams || msg.payload.params;
      vk.api.call(method, params)
        .then((res) => {
          node.status({ fill: 'green', shape: 'dot', text: 'API call success' });
          node.send({ payload: res });
        })
        .catch((error) => {
          node.status({ fill: 'red', shape: 'ring', text: 'API call failed' });
          node.error('API call failed: ' + error.toString());
        });
    });

    node.on('close', function() {
      // Дополнительные действия при закрытии узла
    });
  }

  RED.nodes.registerType('method', VkMethodNode);
};
