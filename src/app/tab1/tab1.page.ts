import { Component } from '@angular/core';
import { TramasService } from '../services/tramas.service';
import { LoadingController, Platform, AlertController } from '@ionic/angular';
import { Observable} from 'rxjs';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  results: Observable<any>;
  data = [];
  status : string = "";

  constructor(private alertCtrl: AlertController,private localNotification: LocalNotifications,private plt: Platform,public tramasService : TramasService, public loadingController: LoadingController) {
    setInterval(()=> {
      this.getDataTramas(); 
    },5000); 
  }

  async getDataTramas(){
    this.tramasService.getHTTPnative().subscribe(data => {
      this.data = JSON.parse(data.data);
    }, err => {
      console.log(err);
    });

    this.status = this.data[0].receivedString;
    
    if(parseInt(this.status) == 2){
      this.forNotification();
    }
  }

  forNotification() {
    this.localNotification.schedule({
      id: 17,
      title : 'Attention',
      text: 'Trash is Full',
      foreground:true,
      data : {
        page : 'Trash is Full, Please Pick Up'
      }
    });
  }

  async getDataTrash(){
    this.tramasService.getDataTrash().subscribe(data => {
      this.data = JSON.parse(data.data);
    }, err => {
      console.log(err);
    });
  }
}
