function Pubsub() {
    this.handlers = {};
}

Pubsub.prototype = {
    on: function (eventType, handler) {
        var self = this;
        if ( !(eventType in self.handlers) ) {
            self.handlers[eventType] = [];
        }
        self.handlers[eventType].push(handler);
        return this;
    },
    emit: function (eventType) {

        if (this.handlers[eventType]) {
            var length = this.handlers[eventType].length;
            var args = Array.prototype.slice.call(arguments, 1);

            for (var i = 0; i < length; i++) {
                this.handlers[eventType][i].apply(this, args);
            }
        }



        return this;
    }
}

var pubSub = new Pubsub();
pubSub.on('A', function (data) {
    console.log(1 + data);
});
pubSub.on('A', function (data) {
    console.log(2 + data);
});
pubSub.emit('A', '我是参数');

