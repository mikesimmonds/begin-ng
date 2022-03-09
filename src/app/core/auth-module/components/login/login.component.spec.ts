// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { Spectator, createComponentFactory } from '@ngneat/spectator';
// import { createRoutingFactory } from '@ngneat/spectator/jest';
// import { MockDeclarations } from 'ng-mocks';
// import { ButtonComponent } from '../../../../../bgng-forms-library/src/lib/button/button.component';
// import { InputWrapperComponent } from '../../../../../bgng-forms-library/src/lib/input-wrapper/input-wrapper.component';
// import { LoginComponent } from './login.component';

// /*
// Reference: https://github.com/ngneat/spectator#testing-components
// Don't forget to user ng-mocks for mocking! https://www.npmjs.com/package/ng-mocks
// MockDirective(DirectiveName) or mockProvider(ProviderName)
// Do you need routing? Replace createComponentFactory with createRoutingFactory
//  */

// describe('LoginComponent', () => {
//   let spectator: Spectator<LoginComponent>;
//   const createComponent = createRoutingFactory({
//     component: LoginComponent,
//     imports: [ReactiveFormsModule, HttpClientTestingModule],
//     declarations: [MockDeclarations(InputWrapperComponent, ButtonComponent)],
//     providers: [
//       //       mockProvider(ComponentProvider, {
//       //         methodToMock: () => ({company: 'Test Company', kvk: '00000000'})
//       //       })
//     ],
//   });

//   //   beforeEach(() => spectator = createComponent());

//   it('should create', () => {
//     spectator = createComponent({
//       //       props: {
//       //         avatarDetails: avatarDetailsMock // This sets the @Input
//       //       },
//     });
//     expect(spectator.component).toBeTruthy();
//   });
// });
