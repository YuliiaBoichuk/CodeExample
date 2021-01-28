import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HelperService, TestModes} from '../../services/helper.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {formatDate} from '@angular/common';
import {InformationForTestPage} from '../information-for-test/information-for-test.page';
import {ModalController, ToastController} from '@ionic/angular';
import {AlertComponent} from "../../components/alert/alert.component";

@Component({
    selector: 'page-buy-service',
    templateUrl: 'buy-service.html',
    styleUrls: ['./buy-service.scss'],
})
export class BuyServicePage implements OnInit {

    public serviceForm: FormGroup;
    public submitAttempt = false;
    public customerDeviceId = 0;
    public devices = [];
    public isNewDevice = true;
    public isForWeb = false;
    public translate: {};
    public permanentData = {
        ManagerEMail: 'test@example.com',
        ManagerPhone: '+777777777777',
        NumberCertificate: 0,
        CostCertificate: 0,
        // Series: 'HC',
        Series: 'MP',
        ShopBranch_id: 313,
        // Shop_id: 9,
        Shop_id: 11,
        FirstNameManager: 'NameTEST',
        LastNameManager: 'SurnameTEST'
    };

    public computedData = {
        ContactBuyer: '',
        IMEI: '',
        FirstNameBuyer: '',
        LastNameBuyer: '',
        BuyerEmail: '',
        DeviceModel: '',
        DeviceBrand: '',
        DateCertificate: '',
        AppData: {
            customerDeviceId: 0,
            UUID: '',
        }
    };

    public tests: any[];
    public displayAddButton = true;

    ngOnInit(): void {
        const customerDeviceId = this.route.snapshot.paramMap.get('customer_device_id');
        if (customerDeviceId) {
            this.customerDeviceId = Number(customerDeviceId) || 0;
            // get device
        }
    }

    constructor(
        private router: Router,
        public plt: Platform,
        private route: ActivatedRoute,
        private apiService: ApiService,
        private helperService: HelperService,
        private formBuilder: FormBuilder,
        private translateService: TranslateService,
        private modalController: ModalController,
        public toastController: ToastController,
        private alert: AlertComponent,
    ) {
        if (this.helperService.isForWeb()) {
            this.isForWeb = true;
            this.displayAddButton = false;
        }

        this.translateService.get([
            'P_BUY_SERVICE',
        ]).subscribe((res: any) => {
            this.translate = res['P_BUY_SERVICE'];
        });

        const todayStr = this.getTodayDateString();
        this.serviceForm = formBuilder.group({
                CertificateUsedSaleDate: [todayStr, Validators.compose([])],
                CostProduct: ['', Validators.compose([Validators.required, Validators.min(5000)])],
                CustomerIIN: ['', Validators.compose([
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(12),
                    Validators.pattern('^[0-9]*$')
                ])
                ],
                CreditAgreementNumber: ['', Validators.compose([])],
                isCredit: [false, Validators.compose([])],
                CustomerDeviceTest: ['', Validators.compose([])],
                // phoneImei: ['', Validators.compose([
                //   Validators.required,
                //   Validators.minLength(4)
                // ] )],
            }
        );
    }

    async presentToast(text) {
        const toast = await this.toastController.create({
            position: 'top',
            message: text,
            //duration: 4000,
            buttons: [
                {
                    side: 'start',
                    icon: 'alert-circle-outline',
                    text: '',
                    handler: () => {
                    }
                }, {
                    text: 'OK',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });
        toast.present();
    }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    async displayHowToPassTests(serviceForm) {
        if (serviceForm.status === 'INVALID'){
            this.submitAttempt = true;
            this.validateAllFormFields(this.serviceForm);
            return;
        }
        if (this.customerDeviceId) {
            this.apiService.getCustomerDevice(this.customerDeviceId).then((res) => {
                this.apiService.getDeviceTesting(this.customerDeviceId).then((tests: any[]) => {
                    this.tests = tests;
                    if (res['CustomerIIN'] !== this.serviceForm.value.CustomerIIN) {
                        const data = {
                            CustomerIIN: this.serviceForm.value.CustomerIIN
                        };
                        this.apiService.sendCustomerIIN(data).then((item) => {
                            console.log(item);
                        });
                    }
                });
            });
        }
        this.submitAttempt = true;
        if (this.serviceForm.valid) {
            this.submitAttempt = false;
            const data = {...this.serviceForm.value, ...this.permanentData, ...this.computedData};
            const jsonData = JSON.stringify(data);
            localStorage.setItem('buyServiceData', jsonData);

            if (this.isForWeb && (this.tests && this.tests.length < 1)) {
                this.presentToast(this.translate['PASS_TEST']);
            } else {
                if (this.isNewDevice || this.serviceForm.value.CustomerDeviceTest) {
                    this.router.navigate(['/price-buy-service']);
                    // this.router.navigate(['/kts-packages']);
                } else {
                    const modal = await this.modalController.create({
                        component: InformationForTestPage,
                        componentProps: {}
                    });
                    await modal.present();
                    modal.onWillDismiss().then(data => {
                        if (data.data.willNavigate) {
                            this.onBuyBtnClick(false);
                        }
                    });
                }
            }
        } else {
            if (this.isForWeb && (this.tests && this.tests.length < 1)) {
                this.presentToast(this.translate['PASS_TEST']);
            }
        }
    }

    onBuyBtnClick(isFullMode: boolean) {
        this.submitAttempt = true;
        if (this.serviceForm.valid) {
            this.submitAttempt = false;
            const data = {...this.serviceForm.value, ...this.permanentData, ...this.computedData};
            const jsonData = JSON.stringify(data);
            localStorage.setItem('buyServiceData', jsonData);
            // console.log(data);
            if (this.isNewDevice || this.serviceForm.value.CustomerDeviceTest) {
                // this.router.navigate(['/kts-packages']);
                this.router.navigate(['/price-buy-service']);
            } else {
                const CustomerID = +localStorage.getItem('user.CustomerID') || '';
                localStorage.setItem('status.DeviceID', this.customerDeviceId.toString());
                localStorage.setItem('status.CustomerID', CustomerID.toString());
                localStorage.setItem('status.UUID', this.computedData.AppData.UUID || '');
                this.helperService.setTestMode(isFullMode && TestModes.Full || TestModes.Express);
                this.router.navigate(['/screen-sensor']);
            }
        }
    }

    onSelectTest(value) {
        if (!value.detail.value) {
            return;
        }
        const report = this.tests.find((test) => {
            return test.Id.toString() === value.detail.value;
        });
        if (report.IsValid === false) {
            this.serviceForm.patchValue({CustomerDeviceTest: null})
            this.alert.presentAlert('OUTDATED_REPORT');
        }
        const ExpressTestKeys = Object.keys(this.helperService.getExternalTestStatuses()).map((key) => {
            return key.charAt(0).toUpperCase() + key.slice(1);
        })
        let passed = 0;
        let names = '';
        let testsCount = 0;
        Object.keys(report).map((key, ind) => {
            const isExpressKey = ExpressTestKeys.find((testKey) => {
                return key === testKey;
            });
            if (report && isExpressKey) {
                switch (report[key]) {
                    case 2:
                        passed++;
                        testsCount++;
                        break;
                    case 0 || 1:
                        switch (key) {
                            case 'Sensor':
                                key = 'Сенсорный экран';
                                break;
                            case 'Speaker':
                                key = 'Динамик';
                                break;
                            case 'Mic':
                                key = 'Микрофон';
                                break;
                            case 'Wifi':
                                key = 'Wifi';
                                break;
                            case 'Bluetooth':
                                key = 'Bluetooth';
                                break;
                            case 'Charger':
                                key = 'Зарядное устройство';
                                break;
                            case 'Front':
                                key = 'Фронтальная камера';
                                break;
                            case 'Rear':
                                key = 'Задняя камера';
                                break;
                            default:
                                break;
                        }
                        names += '\n' + key;
                        break;
                    default:
                        break;
                }
            }
        });

        if (testsCount < 7) {
            this.serviceForm.patchValue({CustomerDeviceTest: null});
            this.alert.presentAlert('INCOMPLETE_REPORT', names);
        }
    }

    ionViewWillEnter() {
        if (this.customerDeviceId) {
            this.apiService.getCustomerDevice(this.customerDeviceId).then((res) => {
                this.apiService.getDeviceTesting(this.customerDeviceId).then((tests: any[]) => {
                    this.tests = tests;
                    console.log(this.tests);
                    if (res['Price']) {
                        this.serviceForm.controls['CostProduct'].setValue(res['Price']);
                        this.isNewDevice = false;
                    }
                    if (res['CustomerIIN']) {
                        this.serviceForm.controls['CustomerIIN'].setValue(res['CustomerIIN']);
                    }
                    this.computedData.DeviceBrand = res['Brand'];
                    this.computedData.DeviceModel = res['Title'];
                    this.computedData.IMEI = res['IMEI'];
                    this.computedData.AppData.UUID = res['UUID'];

                    this.computedData.DateCertificate = this.getTodayDateString();
                    this.computedData.AppData.customerDeviceId = this.customerDeviceId;

                    this.computedData.BuyerEmail = localStorage.getItem('user.Email');
                    this.computedData.ContactBuyer = localStorage.getItem('user.phone');
                    // const fullname = localStorage.getItem('user.FullName') || '';
                    // const nameParts = fullname.split(' ');
                    // let lastName = ' ';
                    // if (nameParts.length > 1) {
                    //   lastName = nameParts[1];
                    // }
                    this.computedData.FirstNameBuyer = localStorage.getItem('user.FirstName');
                    this.computedData.LastNameBuyer = localStorage.getItem('user.LastName');
                });
            });
        }
        this.apiService.getCustomerDevices().then(r => {
            this.apiService.loadingController.dismiss();
            this.devices = this.helperService.objectToArray(r);
            setTimeout(() => {
                this.apiService.loadingController.dismiss();
            }, 500);
        });
    }

    private getTodayDateString() {
        const today = new Date();
        today.setHours(today.getHours() - 4);
        return formatDate(today, 'dd.MM.yyyy HH:mm', 'en-US');
    }

    private myFormatDate(date) {
        return formatDate(date, 'dd.MM.yyyy HH:mm', 'en-US');
    }

    public goToHomePage() {
        this.router.navigate(['/app/tabs/home']);
    }
}
