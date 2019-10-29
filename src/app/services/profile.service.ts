import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ProfileUser } from '../interfaces/profile-user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profilesCollection: AngularFirestoreCollection<ProfileUser>;
  constructor(private afs: AngularFirestore) {
    this.profilesCollection = this.afs.collection<ProfileUser>('profiles');
  }

  getProfiles(){
    return this.profilesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id, ...data};
        })
      })
    );
   }

  findByUserId(userId){
    return this.afs.collection<ProfileUser>('profiles', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
      })
    );
  }

  addProfile(profile: ProfileUser) {
    return this.profilesCollection.add(profile);
  }

  updateProfile(id: string,profile: ProfileUser) {
    return this.profilesCollection.doc<ProfileUser>(id).update(profile);
  }
  
  deleteProfile(id: string) {
    return this.profilesCollection.doc(id).delete();
  }
}
