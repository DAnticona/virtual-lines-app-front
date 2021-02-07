import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorsService {
  constructor() {}

  passwordValid(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  timesValid(startDate: string, startTime: string, endDate: string, endTime: string) {
    return (formGroup: FormGroup) => {
      const startDateControl = formGroup.controls[startDate];
      const startTimeControl = formGroup.controls[startTime];
      const endDateControl = formGroup.controls[endDate];
      const endTimeControl = formGroup.controls[endTime];

      const startDatetime = new Date(
        startDateControl.value.substr(0, 4),
        Number(startDateControl.value.substr(5, 2)) - 1,
        startDateControl.value.substr(8, 2),
        startTimeControl.value.substr(0, 2),
        startTimeControl.value.substr(3, 2),
        0,
        0
      );
      const endDatetime = new Date(
        endDateControl.value.substr(0, 4),
        Number(endDateControl.value.substr(5, 2)) - 1,
        endDateControl.value.substr(8, 2),
        endTimeControl.value.substr(0, 2),
        endTimeControl.value.substr(3, 2),
        0,
        0
      );

      if (startDatetime.getTime() >= endDatetime.getTime()) {
        endTimeControl.setErrors({ endDatetimeInvalid: true });
        endDateControl.setErrors({ endDatetimeInvalid: true });
      } else {
        endTimeControl.setErrors(null);
        endDateControl.setErrors(null);
      }
    };
  }
}
