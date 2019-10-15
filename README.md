# Smart Profile Photo Editor

## Summary

Uses [Azure Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/) to analyze and approve or reject user-submitted photos.

![picture of the web part in action](./assets/WebPartPreview.gif)

## Used SharePoint Framework Version

![1.9.1](https://img.shields.io/badge/version-1.9.1-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

> Update accordingly as needed.

## Prerequisites

This sample uses **SharePoint Online Tenant Properties** to store the Azure Cognitive Service key and endpoint used to analyze the photos uploaded by users.

To configure your key and endpoint, use the following steps:

1. If you don't already have an Azure Cognitive Services key, [create a trial instance](https://azure.microsoft.com/en-us/try/cognitive-services/) and select **Get API Key** by the **Computer Vision**.
2. Create a **Computer Vision** resource
3. Make note of the **Key** and **Endpoint**.
4. Using Office365-CLI, set the storage entity by using the following commands:

```PowerShell
spo storageentity set --appCatalogUrl <appCatalogUrl> --key azurekey --value <value of the key>
spo storageentity set --appCatalogUrl <appCatalogUrl> --key azureendpoint --value <value of the endpoint>
```

5. If you want to verify that your key and endpoint are stored, use the following command to list all your tenant properties:

```PowerShell
spo storageentity list --appCatalogUrl <appCatalogUrl>
```

## Solution

Solution|Author(s)
--------|---------
react-smart-profile-photo-editor | Hugo Bernier ([Tahoe Ninjas](http://tahoeninjas.blog), @bernierh)


## Version history

Version|Date|Comments
-------|----|--------
1.0|October 15, 2019|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

This web part demonstrates the following concepts:

* Uploading images
* Creating a drag and drop target for uploading images
* Using a web cam to capture images
* Retrieving settings from the SharePoint Online tenant properties
* Using Azure Cognitive Services

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-smart-profile-photo-editor" />
