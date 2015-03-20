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
                'ad="2012-10-30T16:49:34Z" ' +
                'ed="2012-10-30T16:49:34Z" ' +
                'sd="2012-10-30T16:49:34Z" ' +
                'te="2012-10-30T16:49:34Z" ' +
                'test="true"' +
                '/>' +
                '<d>VNNAnf36IrkyUVZlihQJNdUUZl/YFEfJOeldWBtd3IM=</d>' +
            '</r>';

        var context = SP.ClientContext.get_current();
        SP.Utilities.Utility.importAppLicense(context, rawXMLLicenseToken, 'en-US', 'US', 'App Name', 'http://www.office.com', 'Provider Name', 5);

        context.executeQueryAsync(function (sender, args) {
            alert('License is imported successfully.');
        }, function (sender, args) {
            alert(args.get_message());
        });
    }

    importTestLicense();
})(jQuery);