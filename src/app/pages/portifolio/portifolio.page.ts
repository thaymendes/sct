import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-portifolio',
  templateUrl: './portifolio.page.html',
  styleUrls: ['./portifolio.page.scss'],
})
export class PortifolioPage implements OnInit {


  private products = new Array<Product>();
  private productsSubcription: Subscription;

  constructor(private productService: ProductService,
    private activeRoute: ActivatedRoute) {
    const id = this.activeRoute.snapshot.params['id'];    
    this.productsSubcription = this.productService.findByUserId(id).subscribe(data =>{
      this.products = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.productsSubcription.unsubscribe();
  }

}