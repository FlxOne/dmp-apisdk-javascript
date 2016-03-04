window.define(function () {
    var Config = function () {
        var instance = this;
        instance.endpoint;
        instance.credentials;
        instance.maxRetries;

        instance.setEndpoint = function (endpoint) {
            instance.endpoint = endpoint;
        };

        instance.getEndpoint = function () {
            return instance.endpoint;
        };

        instance.setCredentials = function (username, password) {
            instance.credentials = {
                username: username,
                password: password
            };
        };

        instance.getCredentials = function () {
            return instance.credentials;
        };

        instance.setMaxRetries = function (maxRetries) {
            instance.maxRetries = maxRetries;
        };

        instance.getMaxRetries = function () {
            return instance.maxRetries;
        };
    };

    return {
        getDefault: function () {
            var config = new Config();
            config.setEndpoint('https://platform.flxone.com/api');
            config.setMaxRetries(5);
            return config;
        }
    };
});