import { Directive, ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FragmentAnchorDirective } from './fragment-anchor.directive';
import { FragmentLinkDirective } from './fragment-link.directive';

/**
 * TODO:
 * 1. Move config to a parent and hand in as @Input (see next commment)
 * 2. Consider using a parent directive on a root element instead of a sevice
 * as it has access to lifecycle hooks and would be destroyed on page change, reduciing risk of
 * registrations not being fully removed
 */

/**
 * The fragment directives can be used to navigate to a section of a page from a link in the TOC, and adds a class to the
 *  item in the TOC based on the currently visible sections.
 *
 * 1. Set the activeClassName to whatever you require
 * 2. The identifiers handed into the directives will be kebab-cased to remove spaces from the #fragment
 *
 * To use:
 * ``` html
<section *ngFor="let section of topic.sections">
    <h2 class="section-title" [ttdFragmentAnchor]="fragmentName"> <<= This key (fragmentName) must match the one below
      {{ section.title }}
    </h2>
    <p>{{section.text}}</p>
</section>
<div class="sidebar">
    <p>In this topic:</p>
    <ul>
      <li *ngFor="let section of topic.sections; index as sectionHeaderIndex">
        <a class="list-link" [ttdFragmentLink]="<fragmentName>"> <<= This key (fragmentName) must match the one above
          {{section.title}}
        </a>
      </li>
    </ul>
  </div>
</div>
 * ```
 *
 * @export
 * @class FragmentService
 */
@Injectable({
  providedIn: 'root',
})
export class FragmentService {
  activeClassName = 'fragment-active';

  initialised = false;
  anchorLinkMap = new Map<string, { anchor?: ElementRef; link?: ElementRef }>();
  htmlNameMap = new Map<Element, string>();

  observer: IntersectionObserver;

  intersectionConfig: IntersectionObserverInit = {
    // Example: This allows the "intersection" as being a bit outside the viewport
    rootMargin: '0px 0px 0px 0px',
  };

  constructor(private route: ActivatedRoute, private router: Router) {
    this.init();
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        for (var entry of entries) {
          if (entry.isIntersecting) {
            const name = this.htmlNameMap.get(entry.target);
            if (name && this.anchorLinkMap.has(name)) {
              const linkEl = this.anchorLinkMap.get(name);
              linkEl?.link?.nativeElement.classList.add(this.activeClassName);
            }
          } else {
            const name = this.htmlNameMap.get(entry.target);
            if (name && this.anchorLinkMap.has(name)) {
              const linkEl = this.anchorLinkMap.get(name);
              linkEl?.link?.nativeElement.classList.remove(
                this.activeClassName
              );
            }
          }
        }
      },
      this.intersectionConfig
    );
  }

  init() {
    if (this.initialised) return;
    this.listenToRouteChange();
    this.initialised = true;
  }

  public register(directive: FragmentLinkDirective | FragmentAnchorDirective) {
    this.checkFragmentName(directive);
    const urlName = this.kebabCase(directive.fragmentName);
    if (directive instanceof FragmentLinkDirective) {
      this.registerLink(directive.elRef, urlName);
    } else if (directive instanceof FragmentAnchorDirective) {
      this.registerAnchor(directive.elRef, urlName);
    }
  }

  public deregister(
    directive: FragmentLinkDirective | FragmentAnchorDirective
  ) {
    this.checkFragmentName(directive);
    const urlName = this.kebabCase(directive.fragmentName);
    this.anchorLinkMap.delete(urlName);
  }

  public goToAnchor(name: string) {
    const urlName = this.kebabCase(name);
    this.router.navigate([], {
      fragment: urlName,
    });
    this.scrollToFragment(urlName);
  }

  private checkFragmentName(
    directive: FragmentLinkDirective | FragmentAnchorDirective
  ): void {
    if (!directive.fragmentName) {
      throw new Error(
        `No fragmentName supplied to register ${directive}. Usage example: [fragmentLink]="<fragmentName>" `
      );
    }
  }

  private listenToRouteChange() {
    this.route.fragment.subscribe((fragment) => {
      setTimeout(() => {
        this.scrollToFragment(fragment);
      }, 600);
      // Using time is hacky but the only way around ATM. Image loading causes the size of the page to change.
      // Options: If no framgment in anchorLinkMap at call time then wait 100 and retry (doesn't help images)
      // Option  2: run the scrollTo() multiple times until its in the correct position based on the mutation observer.
    });
  }

  private scrollToFragment(fragment: string | null) {
    if (fragment && this.anchorLinkMap.has(fragment)) {
      const targetAnchor = this.anchorLinkMap.get(fragment)?.anchor;
      if (!targetAnchor) {
        throw new Error(`Cannot find target for fragment: ${fragment}`);
      }
      targetAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private registerAnchor(elRef: ElementRef, urlName: string) {
    if (this.anchorLinkMap.has(urlName)) {
      const current = this.anchorLinkMap.get(urlName);
      this.anchorLinkMap.set(urlName, { ...current, anchor: elRef });
    } else {
      this.anchorLinkMap.set(urlName, { anchor: elRef });
    }
    this.htmlNameMap.set(elRef.nativeElement, urlName); // kinda weird workaround
    this.observer.observe(elRef.nativeElement);
  }

  private registerLink(elRef: ElementRef, urlName: string) {
    // The link may or may not be available.
    if (this.anchorLinkMap.has(urlName)) {
      const current = this.anchorLinkMap.get(urlName);
      this.anchorLinkMap.set(urlName, { ...current, link: elRef });
    } else {
      this.anchorLinkMap.set(urlName, { link: elRef });
    }
  }

  private kebabCase(string: string): string {
    return string.split(' ').join('-').toLowerCase();
  }
}
