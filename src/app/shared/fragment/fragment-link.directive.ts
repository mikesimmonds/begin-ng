import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { FragmentService } from './fragment.service';

@Directive({
  selector: '[bgngFragmentLink]',
})
export class FragmentLinkDirective implements AfterViewInit, OnDestroy {
  @Input('bgngFragmentLink') fragmentName!: string;
  @HostListener('click') clickEvent() {
    this.fragmentService.goToAnchor(this.fragmentName);
  }
  constructor(
    private fragmentService: FragmentService,
    public elRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.fragmentService.register(this);
  }

  ngOnDestroy() {
    this.fragmentService.deregister(this);
  }
}
