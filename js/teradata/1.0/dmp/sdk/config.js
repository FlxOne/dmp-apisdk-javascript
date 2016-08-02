window.define(function () {
    var defaultMaxRetries = 5;

    var Config = function () {
        var instance = this;
        instance.endpoint = null;
        instance.authToken = null;
        instance.csrfToken = null;
        instance.maxRetries = defaultMaxRetries;
        instance.credentials = {
            username: null,
            password: null
        };

        instance.setEndpoint = function (endpoint) {
            if (endpoint.substr(-1) === '/') {
                endpoint = endpoint.substr(0, endpoint.length - 1);
            }

            instance.endpoint = endpoint;
        };

        instance.getEndpoint = function () {
            return instance.endpoint;
        };

        instance.setAuthToken = function (authToken) {
            instance.authToken = authToken;
        };

        instance.getAuthToken = function () {
            return instance.authToken;
        };

        instance.setCsrfToken = function (csrfToken) {
            instance.csrfToken = csrfToken;
        };

        instance.getCsrfToken = function () {
            return instance.csrfToken;
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
            config.setMaxRetries(defaultMaxRetries);
            return config;
        }
    };
});