import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';
import {ApiService} from "../../services/api.service";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from "@ngx-translate/core";
import { ModalController } from '@ionic/angular';
import { CompleteModalPage } from '../complete-modal/complete-modal.page';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.page.html',
  styleUrls: ['./exchange.page.scss'],
})
export class ExchangePage implements OnInit {

  public exchangeForm: FormGroup;
  public submitAttempt: boolean = false;
  deviceBrands = [
    {'id':1, 'name':'Apple'},
    {'id':2, 'name':'Acer'},
    {'id':3, 'name':'ASUS'},
  ];
  deviceModels = [
    {'id':1, 'name':'iphone 6'},
    {'id':2, 'name':'iphone 6s'},
    {'id':3, 'name':'iphone XS'},
  ];
  damageCauses: any[] = [
    {'id':1, 'name':'Падение'},
    {'id':2, 'name':'Затопление'},
    {'id':3, 'name':'Перепад напряжения в сети'},
    {'id':4, 'name':'Контакт с огнем'},
    {'id':5, 'name':'Гарантийные поломки'},
  ];
  damageDescriptions: any[] = [
    {'id':1, 'name':'Имеется акт СЦ'},
    {'id':2, 'name':'Трещина на экране, не включается'},
    {'id':3, 'name':'Сломана задняя крышка'},
    {'id':4, 'name':'Деформация корпуса'},
    {'id':5, 'name':'Полосы на экране'},
  ];

  customSelectOptionsBrand: any = {};
  customSelectOptionsModel: any = {};
  customSelectOptionsCauses: any = {};
  customSelectOptionsDescriptions: any = {};
  exchangeData: any = {};

  constructor(
      private route: Router,
      private router: Router,
      private helperService: HelperService,
      private apiService: ApiService,
      public formBuilder: FormBuilder,
      private translateService: TranslateService,
      private modalController: ModalController,
  ) {
    this.translateService.get([
      'P_EXCHANGE.DEVICE_BRAND',
      'P_EXCHANGE.DEVICE_MODEL',
      'P_EXCHANGE.CAUSE_OF_DAMAGE',
      'P_EXCHANGE.DESCRIPTION_OF_DAMAGE',
    ]).subscribe((res: any) => {
      this.customSelectOptionsBrand = {
        header: res['P_EXCHANGE.DEVICE_BRAND'],
        // subHeader: '',
        // message: '',
        // translucent: true
      };
      this.customSelectOptionsModel = {
        header: res['P_EXCHANGE.DEVICE_MODEL'],
        // subHeader: '',
        // message: '',
        // translucent: true
      };
      this.customSelectOptionsCauses = {
        header: res['P_EXCHANGE.CAUSE_OF_DAMAGE'],
        // subHeader: '',
        // message: '',
        // translucent: true
      };
      this.customSelectOptionsDescriptions = {
        header: res['P_EXCHANGE.DESCRIPTION_OF_DAMAGE'],
        // subHeader: '',
        // message: '',
        // translucent: true
      };
    });

    this.exchangeForm = formBuilder.group({
      certSeries: ['', Validators.compose( [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(2)
      ] )
      ],
      certNumber: ['', Validators.compose( [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ] )
      ],
      deviceBrand: ['', Validators.compose( [
        // Validators.required,
      ] )
      ],
      deviceModel: ['', Validators.compose( [
        // Validators.required,
      ] )
      ],
      deviceCause: ['', Validators.compose( [
        Validators.required,
      ] )
      ],
      deviceDescription: ['', Validators.compose( [
        // Validators.required,
        // Validators.minLength(10),
      ] )
      ],
      isNewDevice: ['', Validators.compose( [
      ] )
      ],
      accWarranty: ['', Validators.compose( [
      ] )
      ],
      accPackaging: ['', Validators.compose( [
      ] )
      ],
      accAccessories: ['', Validators.compose( [
      ] )
      ],
      accConfirm: ['', Validators.compose( [
      ] )
      ],
      comment: ['', Validators.compose( [
      ] )
      ],
    }
    );
  }

  ngOnInit() {
  }

  onConfirm() {
    this.submitAttempt = true;
    if(!this.exchangeForm.valid) {
      console.log('Bad form data!');
    } else {
      console.log('success!');
      this.submitAttempt = false;
      this.exchangeData = this.exchangeForm.value;
      // this.apiService.addEchange(this.exchangeData).then(r => {
        this.route.navigate(['/my-services']);
      // });
    }
  }
  public goToHomePage() {
    this.router.navigate(['/app/tabs/home']);
  }
}
