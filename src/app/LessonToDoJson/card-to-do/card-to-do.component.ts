import {Component} from '@angular/core';
import {UserDto} from '../../UserDto';
import {SortingService} from '../services/sortingService';
import {SortingType} from '../services/sortingType';
import {CreateNewUserService} from '../services/createNewUserService';
import {DataLoader} from '../services/data.loader';

@Component({
  selector: 'app-card-to-do',
  templateUrl: './card-to-do.component.html',
  styleUrls: ['./card-to-do.component.css']
})
export class CardToDoComponent {

  arrayOfUsers: UserDto[];
  isNewUserUploadingInProgress: boolean = false;
  isUsersArrayDownloadingInProgress: boolean = false;
  sortingService: SortingService = new SortingService();
  page: string;
  pageNumber: number = 1;
  SortingType = SortingType;
  private createNewUserService: CreateNewUserService = new CreateNewUserService();
  dataLoader: DataLoader = new DataLoader();

  constructor() {
    this.loadData(this.pageNumber);
  }

  private loadData(number: number) {
    let thisComponent = this;
    this.isUsersArrayDownloadingInProgress = true;
    this.dataLoader.loadData(number, (data: UserDto[], currentPage: number) => {
        thisComponent.arrayOfUsers = data;
        thisComponent.pageNumber = +currentPage;
      }, (errorMessage: string) => {
        alert('Ошибка: ' + errorMessage);
      },
      () => {
        thisComponent.isUsersArrayDownloadingInProgress = false;
      });
  }

  onSortButtonClick(sortingType: SortingType) {
    this.sortingService.sort(this.arrayOfUsers, sortingType);
  }

  onCreateNewUserButtonClick() {
    this.isNewUserUploadingInProgress = true;
    let thisComponent = this;
    this.createNewUserService.createNewUser(() => {
      thisComponent.isNewUserUploadingInProgress = false;
    });
  }

  onLoadPageButtonClick() {
    let pageNumber = +this.page;
    this.loadData(pageNumber);
  }

  onNextPageButtonClick() {
    this.loadData(this.pageNumber + 1);
  }
}

