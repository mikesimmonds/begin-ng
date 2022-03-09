// import { HttpClientTestingModule } from "@angular/common/http/testing";
// import { Spectator, createComponentFactory } from "@ngneat/spectator";
// import { createRoutingFactory } from "@ngneat/spectator/jest";
// import { MockDeclarations } from "ng-mocks";
// import { ButtonComponent } from "../../../../../bgng-forms-library/src/lib/button/button.component";
// import { ConfirmAccountComponent } from "./confirm-account.component";

// /*
// Reference: https://github.com/ngneat/spectator#testing-components
// Don't forget to user ng-mocks for mocking! https://www.npmjs.com/package/ng-mocks
// MockDirective(DirectiveName) or mockProvider(ProviderName)
// Do you need routing? Replace createComponentFactory with createRoutingFactory
//  */

// describe("ConfirmAccountComponent", () => {
//   let spectator: Spectator<ConfirmAccountComponent>;
//   const createComponent = createRoutingFactory({
//     component: ConfirmAccountComponent,
//     imports: [HttpClientTestingModule],
//     declarations: [MockDeclarations(ButtonComponent)],
//     providers: [
//       //       mockProvider(ComponentProvider, {
//       //         methodToMock: () => ({company: 'Test Company', kvk: '00000000'})
//       //       })
//     ],
//   });

//   //   beforeEach(() => spectator = createComponent());

//   it("should create", () => {
//     spectator = createComponent({
//       queryParams: {
//         code: "mockCode", // This sets the @Input
//       },
//     });
//     expect(spectator.component).toBeTruthy();
//   });
// });
