These modals are created using the Angular CDK Dialog. 

Requirements
- Angular CDK (>=14) `npm i @angular/cdk`
- Import default styles to `src/styles.scss` - `@import './app/<path>/modal/modal-global.scss';`

We have a service (modal.service) that:
- Abstracts out the reliance on the Angular CDK
- Handles the management of standard dialogs (alert/prompt/confirm)
- Handles the creation of custom modals from Components or #TemplateRefs accessed via @ViewChild.

The intended API is:
``` modalService.alert('Some alert message') ``` 
``` modalService.open(modalContents: TemplateRef | Component)```


Please see: https://material.angular.io/cdk/dialog/overview  
