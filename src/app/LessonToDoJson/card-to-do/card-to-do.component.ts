import {Component} from '@angular/core';

@Component({
  selector: 'app-card-to-do',
  //html этого компонента. Отттуда у нас доступ к полям и метоам класса CardToDoComponent
  templateUrl: './card-to-do.component.html',
  styleUrls: ['./card-to-do.component.css']
})
export class CardToDoComponent {

  arrayOfUsers;
  
  // метод компонента CardToDoComponent

  constructor() {
    this.loadData();
  }

  private loadData() {
    let dataUser = localStorage.getItem('dataUser');

    if (dataUser !== null && this.getDiffMs() <= 10000) {
      this.processData(dataUser);
    } else {
      this.getDataFromServer();
    }
  }

  private getDataFromServer() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://gorest.co.in/public-api/users?_format=json&access-token=Mpa9uWdhPEW_AbKAgwY8PHJHODpV84Cgo1d-');
    xhr.onload = this.getOnloadFunction(xhr);
    xhr.send();
  }

  private getOnloadFunction(xhr: XMLHttpRequest) {
    let thisComponent = this;
    return function() {

      if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
      } else { // если всё прошло гладко, выводим результат
        alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
        thisComponent.processResponse(xhr, thisComponent);
      }
    };
  }

  private processResponse(xhr: XMLHttpRequest, thisComponent: this) {
    localStorage.setItem('dataUser', xhr.response);
    let now = new Date();
    localStorage.setItem('getTimeDataUser', '' + now.getTime());
    thisComponent.processData(xhr.response);
  }

  private getDiffMs() {
    let timeBegin = localStorage.getItem('getTimeDataUser');
    let dateFromString = new Date(parseInt(timeBegin));
    let now = new Date();
    let diffMs = Math.abs(now.getTime() - dateFromString.getTime());
    return diffMs;
  }

  processData(dataUser: string) {
    this.arrayOfUsers = JSON.parse(dataUser).result.sort((a, b) => (a.gender > b.gender ? 1 : -1));
  }

  sort(sortingType: string) {
    if (sortingType === 'first_name') {
      this.arrayOfUsers.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
    } else if (sortingType === 'last_name') {
      this.arrayOfUsers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1));
    } else if (sortingType === 'gender') {
      this.arrayOfUsers.sort((a, b) => (a.gender > b.gender ? 1 : -1));
    } else if (sortingType === 'dob') {
      this.arrayOfUsers.sort((a, b) => (a.dob > b.dob ? 1 : -1));
    } else if (sortingType === 'phone') {
      this.arrayOfUsers.sort((a, b) => (a.phone > b.phone ? 1 : -1));
    }
  }

  getDataJson() {

  }
}
