const { VK } = require('vk-io');

module.exports = function (RED) {
    function CallbackEventNode(config) {
        RED.nodes.createNode(this, config);
        this.config = RED.nodes.getNode(config.config);
        const node = this;

        var event = config.event;
        if (event === 'custom') {
            event = config.customEvent;
        }

        const vk = new VK({
            token: this.config.token,
            apiVersion: this.config.apiVersion
        });
        
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


        node.on('input', function (msg) {
            if(msg.payload.type === "confirmation"){
                node.status({ fill: 'red', shape: 'ring', text: 'Подтвердите ваш сервер' });
                return;
            }
            if(node.config?.secret){
                if(msg.payload?.secret){
                    if(msg.payload.secret === node.config.secret){
                        vk.updates.handleWebhookUpdate(msg.payload);
                    } else {
                        node.error(`Не верный secret ${msg.payload.secret}`);
                    }
                } else {
                    node.error(`Callback приходит без поля secret\n Callback:${msg.payload.toString()}`);
                }
                
            } else {
                vk.updates.handleWebhookUpdate(msg.payload);
            }
            
        })

        node.on('close', function () {
            vk.updates.stop();
        });
    }

    RED.nodes.registerType('callback-event', CallbackEventNode);
};
