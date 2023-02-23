These modals are created using the Angular CDK Dialog. 

Requirements
- Angular CDK (>=14) `npm i @angular/cdk`
  
Angular Material is not required.

We have a service (modal.service) that:
- Abstracts out the reliance on the Angular CDK
- Handles the management of standard dialogs (alert/prompt/confirm)
- Handles the creation of custom modals from Components or TempalateRefs.

At the time of writing not all modals are displayed using this module: if you work on one that doesn't use this module - please update it to use this module.

The intended API is:
``` modalService.alert('Some alert message') ``` 
``` modalService.open(modalContents: TemplateRef | Component)```


Please see: https://material.angular.io/cdk/dialog/overview  
