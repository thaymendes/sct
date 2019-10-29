import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { ProfileUser } from '../../interfaces/profile-user';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private profiles = new Array<ProfileUser>();
  private profilesSubcription: Subscription;

  constructor(private ProfileService: ProfileService,
    private authService: AuthenticationService,
    private navCtrl: NavController) {
    this.profilesSubcription = this.ProfileService.getProfiles().subscribe(data =>{
      this.profiles = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.profilesSubcription.unsubscribe();
  }


  
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
  }
}
