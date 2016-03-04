window.require(['jquery', 'teradata/dmp/sdk/client', 'teradata/dmp/sdk/config', 'teradata/dmp/sdk/request'], function ($, Client, Config, Request) {
    var config = Config.getDefault();
    config.setEndpoint('https://platform.flxone.com/api/v2');
    config.setCredentials('', '');

    var request = new Request('audience-builder/index');
    request.setParameter('a', 1);
    request.setParameters({b: 2, c: 3});

    var client = new Client(config);
    $.when(client.get(request)).done(function (response) {
        console.log(response.audiences);
    }).fail(function (error) {
        console.log(error);
    });
});