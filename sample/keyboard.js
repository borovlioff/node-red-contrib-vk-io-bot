module.exports = function (RED) {
    function KeyboardNode(config) {
      RED.nodes.createNode(this, config);
      this.name = config.name;
      this.keyboard = config.keyboard;
  
      let node = this;
      node.on('input', function (msg) {
        
      if(msg.hasOwnProperty("payload") && typeof msg.payload !== "object"){
          node.status({ fill: 'red', shape: 'ring', text: 'msg.payload is object' });
          node.error('Failed to send message:', "object");
        } else {
          msg.payload = {...msg.payload, keyboard: JSON.stringify(config.keyboard)}
          node.send(msg);
        }
        
      });

      node.on('close', function () {
        // Дополнительные действия при закрытии узла
      });
    }
  
    RED.nodes.registerType('keyboard', KeyboardNode);
  };
  