import {Component} from '@angular/core';
import {UserDto} from '../../UserDto';
import {HttpRequestsSenderService} from '../services/httpRequestsSenderService';
import {SortingService} from '../services/sortingService';
import {SortingType} from '../services/sortingType';

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
  sortingService: SortingService = new SortingService();
  page: string;
  SortingType = SortingType;

  constructor() {
    this.loadData();
  }

  private loadData() {
    let dataUser = localStorage.getItem('dataUser');

    if (dataUser !== null && this.getDiffMs() <= 10000) {
      this.processData(dataUser);
    } else {
      this.getDataFromServer(1);
    }
  }

  private getDataFromServer(page: number) {
    let thisComponent = this;
    // alert(`Страница ${this.page}`);

    // let page = +this.page;
    // let page = this.getPage();
    alert(`Загрузи  ${page}`);

    this.httpRequestsSenderService.getUsers(page, (xhr) => {
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
    let parsedArrayOfUsers = JSON.parse(dataUser).result;
    this.sortingService.sort(parsedArrayOfUsers, SortingType.Gender);

    this.arrayOfUsers = parsedArrayOfUsers;
  }

  sort(sortingType: SortingType) {
    this.sortingService.sort(this.arrayOfUsers, sortingType);
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


  getPage() {
    alert(`Страница ${this.page}`);
    let page = +this.page;
    this.getDataFromServer(page);
  }
}

