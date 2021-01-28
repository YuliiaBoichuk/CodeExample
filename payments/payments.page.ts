import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {HelperService} from "../../services/helper.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  public payments: PaymentListItem[];

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private translateService: TranslateService,
      private apiService: ApiService,
      private helperService: HelperService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.apiService.getPayments().then((res: PaymentListItem[]) => {
      this.payments = res;
    });
  }

  public openPaymentDetails(id: number) {
    this.router.navigate(['/payment-details/' + id]);
  }

  private getStatusIcon(status: number) {
    if (status === 1) {
      return 'checkmark-done-circle-outline';
    } else if (status === 2) {
      return 'alert-circle-outline';
    }

    return 'timer-outline';
  }

  private getStatusIconColor(status: number) {
    if (status === 1) {
      return 'green-icon';
    } else if (status === 2) {
      return 'red-icon';
    }

    return '';
  }

  public goToHomePage() {
    this.router.navigate(['/app/tabs/home']);
  }

}

export class PaymentListItem {
  public Id: number;
  public PaymentSystem: any;
  public Amount: number;
  public RecurringAmount: number;
  public IsRecurringPayment: boolean;
  public Status: any;
  public CreatedAt: Date;
  public CustomerId: number;
}
