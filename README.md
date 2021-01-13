# Backbase WA3 Project

# Prerequites
https://community.backbase.com/documentation/Retail-Banking/latest/setup_widget_development_environment
https://community.backbase.com/documentation/Design-System/3-8-1/install_theme?bb=1#install_theme

# Take latest package dependencies from Retail Banking App 
https://community.backbase.com/documentation/Retail-Apps/latest/install_web_app

# Structured Content
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