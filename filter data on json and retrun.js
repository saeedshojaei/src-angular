// >>>>>>>>>>>>>>>>>html<<<<<<<<<<<<<<<<<<<<<
<div class="wrapper">
	<span id="search-box">
    <input 
      (keyup)="getFilteredUsers()" 
      class="col-lg-7" 
      id="search-input" 
      type="text"  
      name="users" 
      [(ngModel)]="filterString"
      placeholder="Search by name">
  </span>

  <span id="people">{{filteredUsers?.length}} People</span>

  <div class="accordion" id="accordionExample">
    <div class="card" *ngFor="let user of filteredUsers">
      <div class="card-header" id="headingOne">
        <h5 class="mb-0">
          <button 
            class="btn btn-link" 
            type="button" 
            data-toggle="collapse" 
            [attr.data-target]="'#' + user.name.slice(0, 2) + user.name.length" 
            aria-expanded="true" 
            aria-controls="collapseOne">
            {{user.name}}
          </button>
          <span class= "plus-sign">+</span>
        </h5>
      </div>
      <div 
        [id]="user.name.slice(0, 2) + user.name.length" 
        class="collapse" 
        aria-labelledby="headingOne" 
        data-parent="#accordionExample">
        <div class="card-body">
          <img src="./assets/user.jpg" id= "user-pic">
          {{user.email}}
          {{user.address}}
        </div>
      </div><!-- end  of .card-body-->
    </div><!-- end of .card -->
  </div><!--end of .accordion-->
</div><!--end of .wrapper -->

{/* <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ts>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Member } from './member';
import { UsersService } from './users.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  filterString = '';
  apiNameList: Member[];
  filteredUsers: Member[];
  subscription: Subscription;

  users: any[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.serveUsers();

    // This is for some other question
    this.usersService.getUsers()
      .subscribe((users: any[]) => {
        this.users = users.filter(user => user.status && user.name === 'Leanne Graham')
        console.log('Got the users as: ', this.users);
      })
  }

  transformPlus(event) {
    console.log(event);
  }

  serveUsers() {
    this.subscription = this.usersService.serveUsers()
      .subscribe(users => this.apiNameList = users);
  }

  getFilteredUsers() {
    this.filteredUsers = this.apiNameList.filter(user => user.name.toLowerCase().indexOf(this.filterString.toLowerCase()) > -1);
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}
