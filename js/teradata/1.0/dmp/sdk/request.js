window.define(function () {
    return function (service) {
        var instance = this;
        instance.service = service;
        instance.parameters = {};

        instance.setParameter = function (key, value) {
            instance.parameters[key] = value;
        };

        instance.setParameters = function (map) {
            for (var i in map) {
                if (map.hasOwnProperty(i)) {
                    instance.setParameter(i, map[i]);
                }
            }
        };

        instance.getParameters = function () {
            return instance.parameters;
        };
    };
});