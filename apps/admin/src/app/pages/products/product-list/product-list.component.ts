import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService, Product } from '@cannon-cloud/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productsService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getProdcuts();
  }

  deleteProduct(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(
          () => {
            this._getProdcuts();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Product Successfuly Deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Error Deleting Product - ${error}`,
            });
          }
        );
      },
    });
  }

  updateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  private _getProdcuts() {
    this.productsService.getProducts().subscribe((prod) => {
      this.products = prod;
    });
  }
}
