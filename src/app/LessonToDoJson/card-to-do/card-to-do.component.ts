import {Component} from '@angular/core';
import {UserDto} from '../../UserDto';
import {HttpRequestsSenderService} from '../services/httpRequestsSenderService';

@Component({
  selector: 'app-card-to-do',
  //html этого компонента. Отттуда у нас доступ к полям и метоам класса CardToDoComponent
  templateUrl: './card-to-do.component.html',
  styleUrls: ['./card-to-do.component.css']
})
export class CardToDoComponent {

  arrayOfUsers: any[];
  isServerInteractionActive: any = false;
  httpRequestsSenderService: HttpRequestsSenderService = new HttpRequestsSenderService();

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
    let thisComponent = this;
    this.httpRequestsSenderService.getUsers(1, (xhr) => {
      if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
      } else { // если всё прошло гладко, выводим результат
        // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
        thisComponent.processResponse(xhr, thisComponent);
        thisComponent.isServerInteractionActive = false;
      }
    });
    this.isServerInteractionActive = true;
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
      this.arrayOfUsers.sort((a, b) => {
        return (a.first_name > b.first_name ? 1 : -1);
      });
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

  createNewUser() {
    let obj = {
      first_name: 'Kuznetcova',
      last_name: 'Ratke',
      gender: 'male',
      email: 'olga_amp@mail.ru',
      status: 'active'
    } as UserDto;

    let thisComponent = this;
    this.httpRequestsSenderService.postUser(obj, function() {
      thisComponent.isServerInteractionActive = false;
    });

    this.isServerInteractionActive = true;
  }

  //Создатель новых пользователей
  //Создатель новых запросов
  //Обработчик данных (парсинг)
  //Сортировщик
  //Отслеживатель того, что данные в кэше уже не валидны
  //сохранятор в локал сторадж
  //обработчик ошибок
  // + сам компонент
}
