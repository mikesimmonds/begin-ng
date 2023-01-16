import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef } from '@angular/core';
/**
 * This directive listens to the keyup even of an text input
 * or textarea and updates the value of the word count in one of 2 ways:
 *
 *  # Hand in a #templateRef
 * You can have multiple word counts on the same page so long as the templateRefs are unique each time
 *
 * @example
 * <input type="text" [ttdWordCounter]="wordCountRef">
 * <span #wordCountRef>WORD COUNT INSERTED HERE</span>
 *
 * <input type="text" [ttdWordCounter]="wordCountRef2">
 * <span #wordCountRef2>WORD COUNT INSERTED HERE</span>
 *
 *  # Use the exported reference and bind to the count property
 *
 *  @example
 * <input ttdWordCounter #wordCount="ttdWordCounterRef">
 * <span>{{ wordCount.count }}</span>
 *
 * <input ttdWordCounter #wordCount2="ttdWordCounterRef">
 * <span>{{ wordCount2.count }}</span>
 *
 * @export
 * @class WordCountInputDirective
 * @implements {AfterViewInit}
 */
@Directive({
  selector: '[ttdWordCounter]',
  exportAs: 'ttdWordCounterRef'
})
export class WordCounterDirective implements AfterViewInit {

  @Input('ttdWordCounter') outputTemplateRef: TemplateRef<HTMLElement>;

  public count = 0;

  @HostListener('keyup', ['$event.target'])
  onChange(target: HTMLInputElement) {
    this.setCount(this.countWords(target.value));
  }

  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.checkElementIsTextInput();
  }

  private countWords(str: string) {
    return str.trim().split(/\s+/).length;
  }

  private checkElementIsTextInput(): void {
    const element = this.elRef.nativeElement;
    if (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA') {
      throw new Error('The word count input directive can only be used on text inputs or textareas');
    }
  }

  private setCount(value: number) {
    this.count = value;
    if (!!this.outputTemplateRef) {
      this.setTextContent(value);
    }
  }

  private setTextContent(count: number) {
      this.renderer.setProperty(this.outputTemplateRef, 'textContent', count.toString());
  }
}
