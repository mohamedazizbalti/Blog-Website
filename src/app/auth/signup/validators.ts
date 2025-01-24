import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import {debounceTime, distinctUntilChanged, Observable, of} from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import {UserService} from '../../services/userService/user.service';

export class UniqueValidators {
  static usernameValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => userService.isUsernameTaken(value)),
        map(isTaken => (isTaken ? { usernameTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  static emailValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => userService.isEmailTaken(value)),
        map(isTaken => (isTaken ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}
