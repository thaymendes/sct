import { Component, OnInit } from '@angular/core';
import { ProfileUser } from '../../interfaces/profile-user';
import { Subscription } from 'rxjs';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ProfileService } from '../../services/profile.service';
import { ProfileType } from 'src/app/enums/profile-type.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: any;
  private profileUser: ProfileUser = {};
  private profileUserId: any;
  private userId: string = null;
  private profileSubscription: Subscription;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private activeRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private profileService: ProfileService) {
        
  }

  ngOnInit() {
    if(this.authService.userDetails()){
      this.user = this.authService.userDetails();
      this.userId =this.authService.getAuth().currentUser.uid;
      if(this.userId) this.loadProfile(); 
    }else{
      this.navCtrl.navigateBack('');
    }
  }

  redirect(){
    console.log(ProfileType[this.profileUser.typeProfile]);
    const prof: string = ProfileType[this.profileUser.typeProfile];
      if(prof == "0"){
        this.navCtrl.navigateRoot('dashboard');  
      } else {
        this.navCtrl.navigateRoot('product');      
      }
  }

  loadProfile(){
    this.profileSubscription = this.profileService.findByUserId(this.userId).subscribe(data =>{
      if(data.length >0) this.profileUser = data[0];
      if(this.profileUser.typeProfile) this.redirect();
    });
    
  }

  ngOnDestroy() {
    if (this.profileSubscription) this.profileSubscription.unsubscribe();
  }

  saveProfile(){
    this.profileUser.userId = this.authService.getAuth().currentUser.uid;
    if (this.profileUser.id) {
      try {
        this.profileService.updateProfile(this.profileUser.id, this.profileUser);
        this.navCtrl.navigateBack('/profile');
      } catch (error) {
        console.log(error);
      }
    } else {
      this.profileUser.createdAt = new Date().getTime();
      try {
        console.log('entrou aqui para salvar...');
        console.log(this.profileUser);
        this.profileService.addProfile(this.profileUser);
        this.navCtrl.navigateBack('/profile');
      } catch (error) {
        console.log(error);
      }
    }
    this.redirect();
  }
}
