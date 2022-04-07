import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FragmentAnchorDirective } from './fragment-anchor.directive';
import { FragmentLinkDirective } from './fragment-link.directive';

/**
 * The FragmentModule is used to link a block of content with an item in a table of contents.
 *
 * There are 2 directives:
 * FragmentAnchor - added to a section of the page that should be scrolled to.
 * FragmentLink - added to an item on the table of contents.
 *
 * Requirements:
 *  - Both the FragmentAnchor and FragmentLink should be given unique identifiers in their input
 *  - app.routing.module should be configured with: useHash: false (this is the default)
 *
 * Features:
 *  - Allows for the user to navigate to sections of the page (FragmentAnchor) from an item in the TOC (FragmentLink)
 *  - Adds a .fragment-active class to the FragmentLink when the relevant FragmentAnchor is visible (IntersectionObserver)
 *  - Adds the fragment name to the URL bar in the browser for bookmarking
 *  - Manually handles scrolling to the correct fragment on page load as Angular Router cannot handle this if the
 * page is generated from api data (this,is because the element with id='fragment-name' is not available on page load)
 *
 * for usage instructions please see {@link FragmentService}
 *
 * @export
 * @class FragmentModule
 */
@NgModule({
  declarations: [FragmentAnchorDirective, FragmentLinkDirective],
  imports: [CommonModule],
  exports: [FragmentAnchorDirective, FragmentLinkDirective],
})
export class FragmentModule {}
