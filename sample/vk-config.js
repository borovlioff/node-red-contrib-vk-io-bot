const { VK } = require('vk-io');

module.exports = function (RED) {
  function VkConfigNode(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.token = config.token;
    this.secret = config.secret;
    this.apiVersion = config.apiVersion;
    this.vkInstance = new VK({
      token: this.token,
      apiVersion: this.apiVersion
  });
  }
  RED.nodes.registerType('vk-config', VkConfigNode);
};