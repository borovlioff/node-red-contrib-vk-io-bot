module.exports = function (RED) {
  function VkConfigNode(config) {
    RED.nodes.createNode(this, config);
    this.name = config.name;
    this.token = config.token;
    this.secret = config.secret;
    this.apiVersion = config.apiVersion;
  }
  RED.nodes.registerType('vk-config', VkConfigNode);
};