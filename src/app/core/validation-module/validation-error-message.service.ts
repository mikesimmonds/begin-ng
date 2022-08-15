import { ElementRef, Injectable, RendererFactory2 } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, first, switchMapTo, tap } from 'rxjs/operators';

/*
How to use:
This service returns error message strings to the component and toggles a class called as specified. It holds all of the error messages and needs to be kept up to date when new CustomValidators are added.

The component that implements it should register for the
error messages by handing in the <input>'s ElementRef and FormControlName.

We use the ElementRef instance to allow us to only check for errors on blur
We use the FormControlName instance to get the errors themselves, which are then looked up and returned as strings.


The compo that uses this service should look something like this:

@Component({
  selector: 'flow-text-input',
  template: '
    <input type='text'>
    // <ng-content select='input'> Content projection version

    <span>{{errorMessage$ | async}}</span>
  ',
  styleUrls: ['./flow-text-input.component.scss']
})

export class FlowTextInputComponent implements AfterContentInit {

    errorMessage$: Observable<string>;

  @ViewChild(FormControlName, {static:false, read: ElementRef}) inputElRef;
  @ViewChild(FormControlName, {static:false}) inputFormControl;

  // These for content projection version
  // @ContentChild(FormControlName, {static:false, read: ElementRef}) inputElRef;
  // @ContentChild(FormControlName, {static:false}) inputFormControl;

  constructor(
    errorService: ValidationErrorMessageService
  ) {}

  ngAfterContentInit(): void {
    this.errorMessage$ = this.errorService.registerForErrors(this.inputElRef, this.inputFormControl);
  }

}

 */

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorMessageService {
  renderer2;

  // Service config
  invalidClassName: string = 'bgng-invalid';

  constructor(rendererFactory2: RendererFactory2) {
    // https://github.com/angular/angular/issues/17824#issuecomment-353239017
    this.renderer2 = rendererFactory2.createRenderer(null, null);
  }

  public registerForErrors(
    inputElRef: ElementRef,
    inputFormControl: any // TODO: Type this, Maybe AbstractFormControl
  ): Observable<string | null> {
    const inputElement = inputElRef.nativeElement;
    const blur$ = fromEvent(inputElement, 'blur');
    const valueChange$ = inputFormControl.valueChanges;
    const _errorString = new Subject<string | null>();
    const errorString$ = _errorString.asObservable();

    blur$
      .pipe(
        filter((e: any) => !e['relatedTarget']),
        first(),
        tap(() => {
          if (!inputFormControl.errors) {
            _errorString.next(null);
            this.renderer2.removeClass(inputElement, this.invalidClassName);
          } else {
            const error = this.getError(inputFormControl.errors);
            this.renderer2.addClass(inputElement, this.invalidClassName);
            _errorString.next(error);
          }
        }),
        switchMapTo(valueChange$)
      )
      .subscribe(() => {
        if (!inputFormControl.errors) {
          this.renderer2.removeClass(inputElement, this.invalidClassName);
          _errorString.next(null);
        } else {
          const error = this.getError(inputFormControl.errors);
          this.renderer2.addClass(inputElement, this.invalidClassName);
          _errorString.next(error);
        }
      });
    return errorString$;
  }

  errorsMap: Map<string, (error: ValidationErrors) => string> = new Map([
    ['invalidEmail', this.invalidEmail],
    ['invalidPhone', this.invalidPhone],
    ['invalidPostcode', this.invalidPostcode],
    ['matchFields', this.matchFields],

    ['required', this.required],
    ['minlength', this.minLength],
    ['maxlength', this.maxLength],
    ['min', this.min],
    ['max', this.max],
  ]);

  public getError(errorsObject: ValidationErrors) {
    let errorKey;

    if (errorsObject.hasOwnProperty('required')) {
      errorKey = 'required';
    } else {
      errorKey = Object.keys(errorsObject)[0];
    }

    const errorFn = this.errorsMap.get(errorKey);
    if (errorFn) {
      return errorFn(errorsObject[errorKey]);
    } else {
      console.error(
        'There is a validation error message missing for: ',
        errorKey
      );
      return null;
    }
  }

  private required(): string {
    return 'Required';
  }

  private minLength(errors: ValidationErrors): string {
    const requiredMin = errors.requiredLength;
    return `Must be at least ${requiredMin} characters`;
  }

  private maxLength(errors: ValidationErrors): string {
    const requiredMax = errors.requiredLength;
    return `Must be fewer than ${requiredMax} characters`;
  }

  private min(errors: ValidationErrors): string {
    const requiredMin = errors.min;
    return `Must be at least ${requiredMin}`;
  }

  private max(errors: ValidationErrors): string {
    const requiredMax = errors.max;
    return `Must be fewer than ${requiredMax}`;
  }

  private matchFields(): string {
    return 'Passwords do not match';
  }

  private invalidPhone(): string {
    return 'Invalid phone number';
  }

  private invalidEmail(): string {
    return 'Invalid email address';
  }

  private invalidPostcode(): string {
    return 'Invalid Postcode';
  }
}
