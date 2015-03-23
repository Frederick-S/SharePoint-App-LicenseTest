(function ($) {
    function importTestLicense() {
        // Use the product id defined in AppManifest.xml
        var productId = '{55c923c8-3801-44b6-bb8a-2506dd320a1c}';
        var rawXMLLicenseToken =
            '<r>' +
                '<t ' +
                'aid="WA900006056" ' +
                'pid="' + productId + '" ' +
                'cid="32F3E7FC559F4F49" ' +
                'ts="30" ' +
                'et="Trial" ' +
                'ad="2015-03-01T16:49:34Z" ' +
                'ed="2015-03-30T16:49:34Z" ' +
                'sd="2015-03-01T16:49:34Z" ' +
                'te="2015-03-30T16:49:34Z" ' +
                'test="true"' +
                '/>' +
                '<d>VNNAnf36IrkyUVZlihQJNdUUZl/YFEfJOeldWBtd3IM=</d>' +
            '</r>';

        var context = SP.ClientContext.get_current();
        SP.Utilities.Utility.importAppLicense(context, rawXMLLicenseToken, 'en-US', 'US', 'App Name', 'http://www.office.com', 'Provider Name', 5);

        context.executeQueryAsync(function (sender, args) {
            console.log('License is imported successfully.');

            var appLicenseCollection = SP.Utilities.Utility.getAppLicenseInformation(context, productId);

            context.executeQueryAsync(function (sender, args) {
                if (appLicenseCollection.get_count() > 0) {
                    var rawXMLLicenseToken = appLicenseCollection.get_item(0).get_rawXMLLicenseToken();
                    var rawXMLLicenseTokenEncoded = encodeURIComponent(rawXMLLicenseToken);

                    var verificationServiceUrl = "https://verificationservice.officeapps.live.com/ova/verificationagent.svc/rest/verify?token=";
                    var request = new SP.WebRequestInfo();
                    request.set_url(verificationServiceUrl + rawXMLLicenseTokenEncoded);
                    request.set_method("GET");
                    var response = SP.WebProxy.invoke(context, request);
                    context.executeQueryAsync(function () {
                        if (response.get_statusCode() == 200) {
                            alert(response.get_body());
                        } else {
                            alert(response.get_body());
                        }
                    }, function () {
                        alert(response.get_body());
                    });
                }
            }, function (sender, args) {
                alert(args.get_message());
            });
        }, function (sender, args) {
            alert(args.get_message());
        });
    }

    importTestLicense();
})(jQuery);