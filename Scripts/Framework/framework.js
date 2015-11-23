window.framework = window.framework || new function () {
    this.controllers = {};
    this.services = {};
    this.models = {};
    var that = this;


    this.factory = new function objectsFactory() {

        var defaultObjects = {
            controller: (function (name, object) {
                // encapsulated this way you cant extend default object
                // maybe it is a good idea to make the deault objects extensible
                function controller(name, object) {
                    this.specifics = {
                        name: name
                    };
                    this.observables = {};

                    if ("specifics" in object)
                        throw new Error(["cant use property specifics while initializing new controller"]);

                    this.extend(object);
                }
                controller.prototype = {
                    constructor: controller,
                    index: function () {
                        throw new Error("Overwriting this method is obligatory.");
                    },
                    update: function () {
                    }
                }

                return controller;
            }())
        }

        return {
            controller: function (name, object) {
                if (name.contains("Controller")) {
                    that.controllers[name] = new defaultObjects.controller(name, object);
                    return that.controllers[name];
                }
            }
        }
    }
};