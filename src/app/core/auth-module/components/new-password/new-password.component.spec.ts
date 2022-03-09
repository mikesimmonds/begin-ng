// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { Spectator, createComponentFactory } from '@ngneat/spectator';
// import { createRoutingFactory } from '@ngneat/spectator/jest';
// import { MockDeclarations } from 'ng-mocks';
// import { ButtonComponent } from '../../../../../bgng-forms-library/src/lib/button/button.component';
// import { InputWrapperComponent } from '../../../../../bgng-forms-library/src/lib/input-wrapper/input-wrapper.component';
// import { NewPasswordComponent } from './new-password.component';

// /*
// Reference: https://github.com/ngneat/spectator#testing-components
// Don't forget to user ng-mocks for mocking! https://www.npmjs.com/package/ng-mocks
// MockDirective(DirectiveName) or mockProvider(ProviderName)
// Do you need routing? Replace createComponentFactory with createRoutingFactory
//  */

// describe('NewPasswordComponent', () => {
//   let spectator: Spectator<NewPasswordComponent>;
//   const createComponent = createRoutingFactory({
//     component: NewPasswordComponent,
//     imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
//     declarations: [MockDeclarations(InputWrapperComponent, ButtonComponent)],
//     providers: [
//       //       mockProvider(ComponentProvider, {
//       //         methodToMock: () => ({company: 'Test Company', kvk: '00000000'})
//       //       })
//     ],
//   });

//   it('should create', () => {
//     spectator = createComponent();

//     expect(spectator.component).toBeTruthy();
//   });
// });
