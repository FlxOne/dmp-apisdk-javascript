window.define(['jquery'], function ($) {
    return function (config) {
        var instance = this;
        instance.config = config;
        instance.authToken = null;
        instance.csrf = null;
        instance.loginAttempts = 0;

        instance.get = function (request) {
            return instance._execute('GET', request);
        };

        instance.post = function (request) {
            return instance._execute('POST', request);
        };

        instance.put = function (request) {
            return instance._execute('PUT', request);
        };

        instance.delete = function (request) {
            return instance._execute('DELETE', request);
        };

        instance._execute = function (method, request) {
            var deferred = new $.Deferred();
            $.when(instance._authenticated()).done(function () {
                if (instance.csrf !== null) {
                    request.setParameter('csrf', instance.csrf);
                }

                $.ajax({
                    url: instance.config.getEndpoint() + '/' + request.service,
                    dataType: 'json',
                    type: method,
                    data: request.getParameters(),
                    beforeSend: function (xhr) {
                        if (instance.authToken !== null) {
                            xhr.setRequestHeader('X-Auth', instance.authToken);
                        }
                    }
                }).done(function (result) {
                    if (result.hasOwnProperty('response')) {
                        var response = result.response;
                        if (response.status === 'OK') {
                            deferred.resolve(response);
                        } else {
                            deferred.reject();
                        }
                    }
                }).error(function (result) {
                    if (result.hasOwnProperty('status') && result.status === 401) {
                        instance.authToken = null;
                        if (instance.loginAttempts < config.getMaxRetries()) {
                            // Retry request
                            setTimeout(function () {
                                instance._execute(method, request);
                            }, (1000 * instance.loginAttempts * instance.loginAttempts) + Math.floor(Math.random() * 100) + 1);
                        } else {
                            deferred.reject();
                        }
                    } else {
                        deferred.reject(result.responseJSON.response.error);
                    }
                });
            }).fail(function (error) {
                deferred.reject(error);
            });

            return deferred.promise();
        };

        instance._authenticated = function () {
            var deferred = new $.Deferred();
            if (instance.authToken === null) {
                $.ajax({
                    url: instance.config.getEndpoint() + '/auth',
                    data: instance.config.getCredentials(),
                    method: 'POST'
                }).done(function (result) {
                    instance.loginAttempts = 0;
                    instance.csrf = result.csrf;
                    instance.authToken = result.response.token;
                    deferred.resolve();
                }).fail(function (result) {
                    instance.loginAttempts++;
                    deferred.reject(result.responseJSON.response.error);
                });
            } else {
                deferred.resolve();
            }
            return deferred.promise();
        };
    };
});