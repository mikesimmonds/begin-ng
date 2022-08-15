import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import { FragmentService } from './fragment.service';

@Directive({
  selector: '[bgngFragmentAnchor]',
})
export class FragmentAnchorDirective implements AfterContentInit, OnDestroy {
  @Input('bgngFragmentAnchor') fragmentName!: string;

  constructor(
    public elRef: ElementRef,
    private fragmentService: FragmentService
  ) {}

  ngAfterContentInit() {
    this.fragmentService.register(this);
  }

  ngOnDestroy() {
    this.fragmentService.deregister(this);
  }
}
