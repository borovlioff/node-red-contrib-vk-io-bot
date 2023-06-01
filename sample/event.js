const { VK } = require('vk-io');

// event.js
module.exports = function (RED) {
    function EventNode(config) {
      RED.nodes.createNode(this, config);
      this.config = RED.nodes.getNode(config.config);
      var node = this;
      var vk = new VK({
        token: this.config.token,
        apiVersion: this.config.apiVersion
      });
      
      var event = config.event;
      if (event === 'custom') {
        event = config.customEvent;
      }
  
      vk.updates.on(event, (context) => {
        // Обработка события
        // context - объект контекста события
  
        // Создаем объект сообщения для отправки в следующий узел
        var msg = {
          type_event:event,
          payload: {...context.payload}
        };
        // Отправляем объект сообщения в следующий узел
        node.send(msg);
      });
  
      vk.updates.start().catch((error) => {
        node.error('Failed to start updates:', error);
      });
  
      node.on('close', function () {
        vk.updates.stop();
      });
    }
  
    RED.nodes.registerType('event', EventNode);
  };
  