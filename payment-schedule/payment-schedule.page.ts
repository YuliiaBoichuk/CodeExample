import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {HelperService} from '../../services/helper.service';
import {TranslateService} from '@ngx-translate/core';
import {PaymentService} from '../../services/payment.service';
import {ScheduleService} from '../../services/schedule.service';


@Component({
    selector: 'app-payment-schedule',
    templateUrl: './payment-schedule.page.html',
    styleUrls: ['./payment-schedule.page.scss'],
})
export class PaymentSchedulePage implements OnInit {
    public payments: any;
    public Position: number;
    public Amount: number;
    public NeedToPayAmount: number;
    public PaidAmount: number;
    public StatusPayment: number;
    public StatusCode: number;
    public PayDateTime: Date;
    public Description: string;
    public Title: string;
    public Price: number;
    public CertificateCost: number;
    public PaymentSystem: number;
    PaymentScheduleDetailsData: {};

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private translateService: TranslateService,
        private apiService: ApiService,
        private helperService: HelperService,
        private paymentService: PaymentService,
        private scheduleService: ScheduleService
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        const paymentDetailsData = {...this.paymentService.getPayments()}
        this.apiService.getRecurringPayment(paymentDetailsData).then((res) => {
            this.payments = res['Payments'].filter((payment) => {
                if (payment['StatusCode'] === 0 || payment['StatusCode'] === 6 || payment['StatusCode'] === 4) {
                    return payment;
                }
            }).reverse();
            this.PaidAmount = res['PaidAmount'];
            this.NeedToPayAmount = res['NeedToPayAmount'];
            this.Description = res['Description'];
            this.Title = res['Title'];
            this.Price = res['Price'];
            this.CertificateCost = res['CertificateCost'];
            this.PaymentSystem = res['PaymentSystem'];
            this.PaymentScheduleDetailsData = {
                Description: this.Description,
                Title: this.Title,
                Price: this.Price,
                CertificateCost: this.CertificateCost,
                PaymentSystem: this.PaymentSystem
            };
            this.scheduleService.setScheduleProperties({...this.PaymentScheduleDetailsData});
        });
    }

    public openPaymentDetails(id: number, status: number, PayDateTime: Date, Amount: number) {
        if (status === 0) {
            this.router.navigate(['/schedule-details/' + id], {state: {PayDateTime, Amount}});
        }
    }

    private getStatusIcon(status: number) {
        if (status === 0 || status === 4) {
            return 'checkmark-done-circle-outline';
        } else if (status === 1) {
            return 'timer-outline';
        }
    }

    private getStatusIconColor(status: number) {
        if (status === 0 || status === 4) {
            return 'green-icon';
        } else if (status === 1) {
            return '';
        }
    }

    public goToHomePage() {
        this.router.navigate(['/app/tabs/home']);
    }
}
