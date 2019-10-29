import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  private loading: any;
  
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email é obrigatório.' },
      { type: 'pattern', message: 'Use um email válido.' }
    ],
    'password': [
      { type: 'required', message: 'Senha é obrigatória.' },
      { type: 'minlength', message: 'A senha precisa ter no minimo 5 caracteres' }
    ]
  };

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

  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res); 
       this.presentToast( "Conta criada com sucesso. Já pode entrar no sistema.");
       this.navCtrl.navigateForward('profile');
     }, err => {
       console.log(err);
       switch (err.code) {
         case "auth/email-already-in-use":
          this.presentToast("Email já cadastrado!");
           break;
         default:
            this.presentToast(err.message);
           break;
       }
       
     
     })
    
  }
 
  goLoginPage(){
    this.navCtrl.navigateBack('');
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
