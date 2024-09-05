import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navBar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {


  ngOnInit(): void {
    AOS.init();
  }
  

}
