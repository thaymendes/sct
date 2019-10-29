import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, NavController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Product } from '../../../interfaces/product';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.page.html',
  styleUrls: ['./productadd.page.scss'],
})
export class ProductaddPage implements OnInit {
  private product: Product = {};
  private productId: string = null;
  private productSubscription: Subscription;
  
  task: AngularFireUploadTask;

  progress: any;  // Observable 0 to 100

  image: string; // base64

  constructor(
    private camera: Camera,
    private file: File,
    private platform: Platform,
    private storage: AngularFireStorage,
    private authService: AuthenticationService,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController
  ) { 
    this.productId = this.activeRoute.snapshot.params['id'];
    if(this.productId) this.loadProduct();
  }

  ngOnInit() {
  }

  loadProduct(){
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data =>{
      this.product = data;
    });
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  saveProduct(){
    this.product.userId = this.authService.getAuth().currentUser.uid;
    if (this.productId) {
      this.product.picture = this.image;
      try {
        this.productService.updateProduct(this.productId, this.product);
        this.navCtrl.navigateBack('/product');
      } catch (error) {
        console.log(error);
      }
    } else {
      this.product.createdAt = new Date().getTime();
      try {
        this.productService.addProduct(this.product);
        this.navCtrl.navigateBack('/product');
      } catch (error) {
        console.log(error);
      }
    }
  }



  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    return await this.camera.getPicture(options)
  }

  createUploadTask(file: string): void {

    const filePath = `my-pet-crocodile_${ new Date().getTime() }.jpg`;

    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(filePath).putString(this.image, 'data_url');

    this.progress = this.task.percentageChanges();
  }

  async openGalery() {
    const base64 = await this.captureImage();
    this.createUploadTask(base64);
  }
}
