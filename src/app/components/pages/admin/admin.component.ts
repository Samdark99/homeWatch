import { Component, OnInit } from '@angular/core';
import { UserList } from 'src/app/core/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  //Variables
  users: UserList;
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  records = [];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers(1); 
  }

  getUsers(page: number){
    this.usersService.getAllUsers(page)
      .subscribe((users) => {
        if(users.data.length > 0){
          this.users = users;
          this.currentPage = users.pageNumber;
          this.pageSize = users.pageSize;
          this.totalRecords = users.totalRecords;
          this.totalPages = users.totalPages;
          this.records = users.data ? users.data:[];
        }
      },(err) => {
        console.log("Algo no cuadra");
        console.log(err);
      });
  }

  //Pagination
  initialRange(): number{
    if(this.currentPage === 1){
      return 1; //First Page
    } else if(this.currentPage === this.totalPages){
      let records = this.totalRecords;
      do{
        records--;
      } while(records % this.pageSize != 0); //Obtain initial range of page, in this case, tens
      return records + 1;
    } else{
      return this.currentPage * this.pageSize - this.pageSize + 1; //Basically, (n*10) - (9)
    }
  }

  finalRange(): number{
    if(this.currentPage === 1){
      return this.pageSize;
    } else if(this.currentPage === this.totalPages){
      return this.totalRecords;
    } else{
      return this.currentPage * this.pageSize;
    }
  }

  isOnTheFirstPage(): boolean{
    return this.currentPage === 1 ? true : false;
  }

  isOnTheFinalPage(): boolean{
    return this.currentPage === this.totalPages ? true : false;
  }
}
