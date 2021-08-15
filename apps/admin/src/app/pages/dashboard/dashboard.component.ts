import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@cannon-cloud/orders';
import { ProductsService } from '@cannon-cloud/products';
import { UsersService } from '@cannon-cloud/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/ban-types
  productCount = {};
  orderCount = {};
  userCount = {};
  totalSales = {};
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

  private _getProductCount() {
    this.productService.getProductCount().subscribe((count: any) => {
      this.productCount = count.productCount;
    });
  }

  private _getOrderCount() {
    this.orderService.getOrderCount().subscribe((count: any) => {
      this.orderCount = count.orderCount;
    });
  }

  private _getUserCount() {
    this.userService.getUserCount().subscribe((count: any) => {
      this.userCount = count.userCount;
    });
  }

  private _getTotalSales() {
    this.orderService.getTotalSales().subscribe((sales: any) => {
      this.totalSales = sales.totalsales;
      console.log(this.totalSales);
    });
  }
}
