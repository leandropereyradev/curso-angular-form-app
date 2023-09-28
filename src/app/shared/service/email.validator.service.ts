import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidatorService implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;

    const httpCallObservable = new Observable<ValidationErrors | null>(
      (subscriber) => {
        console.log({ email });

        // Comprobar si el mail ya está en la DB
        if (email === 'leandro@leandro.com') {
          subscriber.next({ emailTaken: true });
          subscriber.complete();
        }

        subscriber.next(null);
        subscriber.complete();
      }
    );

    return httpCallObservable;
  }
}

// Uso real:

// return this.http.get<any[]>(`https://localhost:3000/users?q=${email}`)
//   .pipe(
//     map(resp => {
//       return (resp.length === 0) ? null : { emailTaken: true }
//     })
//   )
