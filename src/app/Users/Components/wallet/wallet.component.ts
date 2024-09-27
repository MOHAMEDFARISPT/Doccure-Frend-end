import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../sharedComponents/Components/navBar/navbar.component';
import { UserSlidebarComponent } from '../../../sharedComponents/Components/user-slidebar/user-slidebar.component';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../Store/User/user.state';
import * as userActions from '../../Store/User/user.actions'
import { selectUser } from '../../Store/User/user.selector';
import { UserModel } from '../../Store/User/userModel';
import { Observable } from 'rxjs';
import { UserServicesService } from '../../services/user-services.service';
import { ActivatedRoute } from '@angular/router';
import { IWallet } from '../../Interfaces/userInterface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [UserSlidebarComponent,NavbarComponent,CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements OnInit {

user$!:Observable<UserModel|null>
userId!:string | undefined;
Walletdata!:IWallet;

constructor(
  private store:Store<AppState>,
private userService:UserServicesService,
private route:ActivatedRoute
){

}



  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';

    this.userService.getWallet(this.userId).subscribe({
      next:(res)=>{
      this.Walletdata=res
      }
    })

  }

}
