import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '@cannon-cloud/orders';
import { ProductsService } from '@cannon-cloud/products';
import { UsersService } from '@cannon-cloud/users';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  // eslint-disable-next-line @typescript-eslint/ban-types
  productCount = {};
  orderCount = {};
  userCount = {};
  totalSales = {};
  endSubs$: Subject<any> = new Subject();
  constructor(
    private productService: ProductsService,
    private orderService: OrdersService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this._getProductCount();
    this._getOrderCount();
    this._getUserCount();
    this._getTotalSales();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getProductCount() {
    this.productService
      .getProductCount()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((count: any) => {
        this.productCount = count.productCount;
      });
  }

  private _getOrderCount() {
    this.orderService
      .getOrderCount()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((count: any) => {
        this.orderCount = count.orderCount;
      });
  }

  private _getUserCount() {
    this.userService
      .getUserCount()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((count: any) => {
        this.userCount = count.userCount;
      });
  }

  private _getTotalSales() {
    this.orderService
      .getTotalSales()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((sales: any) => {
        this.totalSales = sales.totalsales;
        console.log(this.totalSales);
      });
  }
}
