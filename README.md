# BBUS Content App Workshop

## Prerequisites

### 1. CX6 Installation
1. Go to [start.backbase.com](https://start.backbase.com/)
2. Start Project --> Custom Project --> scroll all the way down to 'CX 6 series' and select Next 
3. Follow the terminal commands for platform, cx6-targeting and statics. 
4. Make sure you can access [CX Manager](http://localhost:7777/cxp-manager/login)
5. Log in as admin. Provision the statics and portal found in this repository. bbus-content/collections/bbus-content/
6. cx.zip first; then portal.zip second. These are the latest packaged items from this repository in order to get you set up quickly.

### 1. AYMME
1. At the root, run the following command
```
docker-compose up
```
2. Open AYMME at port 4201
3. Go to Experiences tab and add this experience config
![AYMME experience config](aymme-config.png?raw=true "AYMME experience config")
4. Sync Model 
5. Choose 'Home' as your Page, and then press 'Update & Use Model'
6. Go to Projects tab and add 'bbus-content-app'
7. Import api-extractor.json into Projects tab

### 2. Project setup
1. At the root, run the following command
```
npm install
```
2. Run the project with a configuration to aymme
```
npm run start:aymme
```
3. Open the project at port 4200; and you are done!

Below are helpful notes along the way to understanding structured content

## Structured Content
https://community.backbase.com/documentation/experience_extend_build/6.2.10/developing_structured_content_types

## content-ang // bb-content component
```
<ng-container *ngIf="contentItem$ | async as contentItem">
	<bb-content-image *ngIf="contentItem.type === contentTypeImage" [imageItem]="contentItem.content" [imageClasses]="imageClasses"></bb-content-image>
	<bb-content-html *ngIf="contentItem.type === contentTypeStructuredContent" [html]="contentItem.content.content"></bb-content-html>
</ng-container>
```

## universal-ang -- content-widget-ang
supports 1 image, rich text or plain text

## schema types
https://community.backbase.com/documentation/experience_extend_build/6-2-10/developing_structured_content_types#json_schema_data_type