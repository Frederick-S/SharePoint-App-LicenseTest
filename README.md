# SharePoint App LicenseTest
A demo that illustrates how to import and validate app license in SharePoint 2013 with JavaScript.

## Import license
I searched a lot and finally found the answer [here](https://social.msdn.microsoft.com/Forums/office/en-US/9df99f1c-2dda-4f12-98d4-c32df63c6734/how-to-create-test-app-license?forum=appsforsharepoint).

There are two key points:

1. Add `test=true` to license token.
2. Set `Tenant` permission to `Full Control`.

## Check license with Office Store verification web service
Make sure the app license token have not expired (the `te` attribute), otherwise `SP.Utilities.Utility.getAppLicenseInformation` will return empty `SP.AppLicenseCollection`.
