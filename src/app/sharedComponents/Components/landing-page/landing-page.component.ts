import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navBar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { select, Store } from '@ngrx/store';
import { loadDoctors, loadUsers } from '../../../GolbalStore/global.action';
import { Observable } from 'rxjs';
import { selectAllDoctors } from '../../../GolbalStore/global.selectors';
import { Doctor } from '../../../GolbalStore/global.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  Doctors$!:Observable<Doctor[]>

  constructor(private store:Store){}

  ngOnInit(): void {
    AOS.init();
    this.store.dispatch(loadDoctors())
  this.Doctors$=this.store.pipe(select(selectAllDoctors))

  }
  

}
