import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  
  showMobileNevBar = false;

  constructor(
    private navBarService: NavBarService
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.navBarService.isLoggedIn();
  }

  getUserNameFromToken(): string{
    return this.navBarService.getUserNameFromTOken();
  }

}
