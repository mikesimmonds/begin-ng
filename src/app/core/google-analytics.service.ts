import { AfterViewInit, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../environments/environment';
/**

THIS IS ONLY FOR GA, not more modern GTM
 * This service allows listens to navigation changes and sends a pageview to google analytics as set up in index.html
 * As the standard Google Analytics script that is pasted into the header of the index.html page relies on page changes
 * to trigger the sending of a pageview. Angular is an SPA and does not navigate pages in the usual way. Therefore we
 * need to manually send the pageview using this service.
 *
 * Custom events can easily be sent to Google Analytice by setting up the Custom events example. This can be useful
 *  for analying things like Call-to-action button clicks, failed login attempts and even exceptions (although there are
 * far better services for this)
 *
 * reference: https://developers.google.com/analytics/devguides/collection/analyticsjs/
 *
 * @export
 * @class GoogleAnalyticsService
 * @implements {AfterViewInit}
 */
@Injectable({
  providedIn: 'root',
})
export class GoogleAnalyticsService implements AfterViewInit {
  isProduction = environment.production;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    if (this.isProduction) {
      this.subscribeToNavigationEventsForGA();
    }
  }

  subscribeToNavigationEventsForGA() {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.sendGAPageView(ev.urlAfterRedirects);
      }
    });
  }

  sendGAPageView(url: string) {
    // console.log('GA-pageView');
    (<any>window).ga('set', 'page', url);
    (<any>window).ga('send', 'pageview');
  }

  // Custom Events Example
  // sendGARegistrationEvent() {
  //   if (!this.isProduction) {
  //     return;
  //   }
  //   (<any>window).ga('send', {
  //     hitType: 'event',
  //     eventCategory: 'register',
  //     eventAction: 'completed',
  //   });
  // }

  // sendException(errorMessage: string, isFatal = false) {
  //   // console.log('GA-Exception');
  //   (<any>window).ga('send', 'exception', {
  //     exDescription: errorMessage,
  //     exFatal: isFatal,
  //   });
  // }

  // // This is a test event for reference
  // sendTestEvent() {
  //   // console.log('GA-testEvent');
  //   (<any>window).ga('send', {
  //     hitType: 'event',
  //     eventCategory: 'TestCategory',
  //     eventAction: 'testAction',
  //     eventLabel: 'testLabel',
  //   });
  // }
}
