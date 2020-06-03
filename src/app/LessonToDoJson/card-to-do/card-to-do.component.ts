import {Component} from '@angular/core';
import {UserDto} from '../../UserDto';
import {HttpRequestsSenderService} from '../services/httpRequestsSenderService';
import {SortingService} from '../services/sortingService';
import {SortingType} from '../services/sortingType';
import {CreateNewUserService} from '../services/createNewUserService';

@Component({
  selector: 'app-card-to-do',
  //html этого компонента. Отттуда у нас доступ к полям и метоам класса CardToDoComponent
  templateUrl: './card-to-do.component.html',
  styleUrls: ['./card-to-do.component.css']
})
export class CardToDoComponent {

  arrayOfUsers: UserDto[];
  isServerInteractionActive: any = false;
  isServerInteractionActiveFromServer: any = false;
  httpRequestsSenderService: HttpRequestsSenderService = new HttpRequestsSenderService();
  sortingService: SortingService = new SortingService();
  page: string;
  page1: number;
  SortingType = SortingType;
  private operationStarted: boolean;
  private createNewUserService: CreateNewUserService = new CreateNewUserService();

  constructor() {

    // this.какойтоСервис.ЗагрузиДанные((загруженныеДанные) => {
    //   // кладем загруженные данные в arrayOfUsers
    // });

    this.loadData();
  }

  public loadData() {
    let dataUser = localStorage.getItem('dataUser');

    if (dataUser !== null && this.getDiffMs() <= 10000) {
      this.httpRequestsSenderService.processData(dataUser);
    } else {
      this.getDataFromServer(1);
    }
  }

  private getDataFromServer(page: number) {
    let thisComponent = this;

    this.httpRequestsSenderService.getUsers(page, (data: UserDto[]) => {
        thisComponent.arrayOfUsers = data;
        // this.isServerInteractionActiveFromServer = true;
      }, (errorMessage: string) => {
        // тут вариант с ошибкой
        alert(errorMessage);
      },
      () => {
        thisComponent.isServerInteractionActiveFromServer = false;
      });

    // this.httpRequestsSenderService.getUsers(page, (xhr) => {
    //   if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    //     alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    //   } else { // если всё прошло гладко, выводим результат
    //     // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    //     thisComponent.processResponse(xhr, thisComponent);
    //     thisComponent.isServerInteractionActive = false;
    //   }
    // });
    // this.isServerInteractionActive = true;
  }


  private getDiffMs() {
    let timeBegin = localStorage.getItem('getTimeDataUser');
    let dateFromString = new Date(parseInt(timeBegin));
    let now = new Date();
    let diffMs = Math.abs(now.getTime() - dateFromString.getTime());
    return diffMs;
  }


  sort(sortingType: SortingType) {
    this.sortingService.sort(this.arrayOfUsers, sortingType);

  }

  createNewUser() {
    let thisComponent = this;
    thisComponent.isServerInteractionActive = true;

    // всё. Теперь есть и переменная с названием
    this.createNewUserService.createNewUser(() => {
      this.isServerInteractionActive = false;
    });
    // Здесь? Да. можно даже вот так
    // то есть можно даже показывать не на http запрос. А прямо говорить: вот вся операция началась.
    // Будет в ней http или нет не так важно. Пусть крутится, пока идет операция/ всё
    //ПОчему не определено на 85 на 84
  }

  //Создатель новых пользователей
  //Создатель новых запросов   Сделано
  //Обработчик данных (парсинг)
  //Сортировщик  Сделано
  //Отслеживатель того, что данные в кэше уже не валидны
  //сохранятор в локал сторадж
  //обработчик ошибок
  // + сам компонент


  getPage() {
    this.isServerInteractionActiveFromServer = true;
    let page = +this.page;
    this.page1 = page + 1;
    this.getDataFromServer(page);

  }


}

