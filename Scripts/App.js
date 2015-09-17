(function ($, SP) {
    function writeMessage(message) {
        $('.message').append('<p>' + message + '</p>');
    }

    function importTestLicense() {
        // Use the product id defined in AppManifest.xml
        var start = new Date();
        var end = new Date(start.getTime() + 30 * 86400000);
        var productId = '{55c923c8-3801-44b6-bb8a-2506dd320a1c}';
        var rawXMLLicenseToken =
            '<r>' +
                '<t ' +
                'aid="WA900006056" ' +
                'pid="' + productId + '" ' +
                'cid="32F3E7FC559F4F49" ' +
                'ts="30" ' +
                'et="Trial" ' +
                'ad="' + start.toISOString() + '" ' +
                'ed="' + end.toISOString() + '" ' +
                'sd="' + start.toISOString() + '" ' +
                'te="' + end.toISOString() + '" ' +
                'test="true"' +
                '/>' +
                '<d>VNNAnf36IrkyUVZlihQJNdUUZl/YFEfJOeldWBtd3IM=</d>' +
            '</r>';

        var context = SP.ClientContext.get_current();
        SP.Utilities.Utility.importAppLicense(context, rawXMLLicenseToken, 'en-US', 'US', 'App Name', 'http://www.office.com', 'Provider Name', 5);

        context.executeQueryAsync(function (sender, args) {
            writeMessage('License is imported successfully.');
            writeMessage('Getting license token ...');

            var appLicenseCollection = SP.Utilities.Utility.getAppLicenseInformation(context, productId);

            context.executeQueryAsync(function (sender, args) {
                if (appLicenseCollection.get_count() > 0) {
                    var rawXMLLicenseToken = appLicenseCollection.get_item(0).get_rawXMLLicenseToken();
                    var rawXMLLicenseTokenEncoded = encodeURIComponent(rawXMLLicenseToken);

                    writeMessage('Verifying license token ...');

                    var verificationServiceUrl = "https://verificationservice.officeapps.live.com/ova/verificationagent.svc/rest/verify?token=";
                    var request = new SP.WebRequestInfo();
                    request.set_url(verificationServiceUrl + rawXMLLicenseTokenEncoded);
                    request.set_method("GET");
                    var response = SP.WebProxy.invoke(context, request);
                    context.executeQueryAsync(function () {
                        if (response.get_statusCode() == 200) {
                            writeMessage('Your license info is:');
                            writeMessage($('<div/>').text(response.get_body()).html());
                        } else {
                            writeMessage(response.get_body());
                        }
                    }, function () {
                        writeMessage(response.get_body());
                    });
                } else {
                    writeMessage('No licene token is found.');
                }
            }, function (sender, args) {
                writeMessage(response.get_body());
            });
        }, function (sender, args) {
            writeMessage(response.get_body());
        });
    }

    importTestLicense();
})(jQuery, SP);