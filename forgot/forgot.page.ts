import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PhonenumberValidator } from  '../../validators/phonenumber';
import { SmsValidator } from  '../../validators/sms';
import { PasswordValidator } from  '../../validators/password';
import {ApiService} from "../../services/api.service";
import {HttpResponse} from "@angular/common/http";
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public forgotForm1: FormGroup;
  public forgotForm2: FormGroup;
  public submitAttempt: boolean = false;
  userNotFound: boolean = false;
  codeNotValid: boolean = false;
  pType: string;
  public passwordAnalyzerColor: string;
  private strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  private mediumRegex = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
  public passwordStrength = {
    value: 0,
    color: 'transparent',
  };
  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private helperService: HelperService,
      public formBuilder: FormBuilder,
      private apiService: ApiService,
      private alert: AlertComponent,
  ) {
    this.forgotForm1 = formBuilder.group({
      phoneNumber: ['', Validators.compose( [
        Validators.required,
        Validators.maxLength(14),
        // Validators.pattern('[+][0-9]{13}')
        ,PhonenumberValidator.isValid
      ] )
        ,PhonenumberValidator.checkPhoneNumberPresent
      ]
    });
    this.forgotForm2 = formBuilder.group({
      activationCode: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
        Validators.pattern('[0-9]{4}')
        ,SmsValidator.isValid
      ] )
        // ,SmsValidator.checkSmsCode
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern(this.mediumRegex)
        ,PasswordValidator.isValid
      ] )],
      passwordConfirm: ['', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
        ,PasswordValidator.isValid
      ] )]
    }, {
      validators: PasswordValidator.passwordConfirmation.bind(this)
    });
  }

  ngOnInit() {
    this.pType = this.route.snapshot.paramMap.get('type');
    console.log(this.pType);
  }

  showPasswordInfo() {
    this.alert.presentAlert('PASSWORD_HELP_TEXT');
  }

  analyzePassword(value: string) {
    if (value === '') {
      this.passwordStrength.color = 'primary';
      this.passwordStrength.value = 0;
    } else if (this.strongRegex.test(value)) {
      this.passwordStrength.color = 'success';
      this.passwordStrength.value = 1;
    } else if (this.mediumRegex.test(value)) {
      this.passwordStrength.color = 'warning';
      this.passwordStrength.value = 0.7;
    } else {
      this.passwordStrength.color = 'danger';
      this.passwordStrength.value = 0.3;
    }
  }

  onNext(){
    this.userNotFound = false;
    this.submitAttempt = true;
    if(!this.forgotForm1.valid){
      console.log("Bad phone! ", this.forgotForm1.value);
    } else {
      console.log("Phone success!");
      this.submitAttempt = false;
      console.log(this.forgotForm1.value);
      localStorage.setItem('user.phone', this.forgotForm1.value.phoneNumber);
      this.apiService.customerRequestResetPassword({
        'phone': this.forgotForm1.value.phoneNumber
      }).then((resp: HttpResponse<any>) => {
        // this.form1 = false;
        // this.form2 = true;
        this.router.navigate(['/forgot/reset']);
      }).catch((err) => {
        console.log(err);
        if (err.status === 404) {
          this.userNotFound = true;
        }
      });
    }
  }

  onReset(){
    this.codeNotValid = false;
    this.submitAttempt = true;
    if(!this.forgotForm2.valid){
      console.log("Bad code!", this.forgotForm2.value);
    } else {
      console.log("Code success!");
      this.submitAttempt = false;
      console.log(this.forgotForm2.value);

      this.apiService.customerResetPassword({
        "phone": localStorage.getItem('user.phone') || '',
        "password": this.forgotForm2.value.password,
        'activationCode': this.forgotForm2.value.activationCode
      }).then((resp: HttpResponse<any>) => {
        this.submitAttempt = false;
        this.apiService.signIn({
          'phoneNumber': localStorage.getItem('user.phone') || '',
          'password': this.forgotForm2.value.password
        }).then((resp: HttpResponse<any>) => {
          localStorage.setItem('user.CustomerID', resp['CustomerID'] || '');
          localStorage.setItem('user.AuthToken', resp['AuthToken'] || '');
          localStorage.setItem('user.FirstName', resp['FirstName'] || '');
          localStorage.setItem('user.LastName', resp['LastName'] || '');
          localStorage.setItem('user.Email', resp['Email'] || '');
          this.router.navigate(['/onboarding']);
        });
      }).catch((err) => {
        console.log(err);
        if (err.status === 404) {
          this.codeNotValid = true;
        }
      });

    }
  }


}
