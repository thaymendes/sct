
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  private loading: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private lodingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern', message: 'Por favor digite um email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatória.' },
      { type: 'minlength', message: 'Senha deve possuir no minimo 5 caracteres.' }
    ]
  };

  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.navCtrl.navigateForward('/profile');
    }, err => {
      console.log(err);
      switch (err.code) {
        case "auth/user-not-found":
         this.presentToast("Email não cadastrado");
          break;
          case "auth/wrong-password":
              this.presentToast("Senha invalida");
            break;
        default:
           this.presentToast(err.message);
          break;
      }
    })
  }
 
  goToRegisterPage(){
    this.navCtrl.navigateForward('/register');
  }

  async presentLoading(){
    this.loading = await this.lodingCtrl.create({message:"Por favor, aguarde..."});
    return this.loading.present();
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({message, duration: 2000});
    toast.present();
  }
}
