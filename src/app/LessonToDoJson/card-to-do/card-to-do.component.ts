import {Component, OnInit} from '@angular/core';

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
    // 1. Создаём новый XMLHttpRequest-объект
    let dataUser = localStorage.getItem('dataUser');
    if (dataUser !== null) {
      this.processData(dataUser);
    } else {
      let xhr = new XMLHttpRequest();
      let thisComponent = this;

      // 2. Настраиваем его: GET-запрос по URL /article/.../load
      xhr.open('GET', 'https://gorest.co.in/public-api/users?_format=json&access-token=Mpa9uWdhPEW_AbKAgwY8PHJHODpV84Cgo1d-');

      // 3. Этот код сработает после того, как мы получим ответ сервера
      xhr.onload = function() {
        if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
          alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else { // если всё прошло гладко, выводим результат
          alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
          localStorage.setItem('dataUser', xhr.response);

          thisComponent.processData(xhr.response);
        }
      };

      // ниже 2 обработчика не пригодились. Они нужны по факту, но сейчас давай на них не обращать внимание. Это если что-то пошло не так.
      xhr.send();
    }
  }

  processData(dataUser: string) {
    this.arrayOfUsers = JSON.parse(dataUser).result.sort((a, b) => (a.gender > b.gender ? 1 : -1));
  }

  sortByFirst_mame() {

    this.arrayOfUsers.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
  }

  getDataJson() {

  }

  sortByLast_name() {
    this.arrayOfUsers.sort((a, b) => (a.last_name > b.last_name ? 1 : -1));
  }

  sortByGender() {
    this.arrayOfUsers.sort((a, b) => (a.gender > b.gender ? 1 : -1));
  }

  sortByDob() {
    this.arrayOfUsers.sort((a, b) => (a.dob > b.dob ? 1 : -1));
  }

  sortByPhone() {
    this.arrayOfUsers.sort((a, b) => (a.phone > b.phone ? 1 : -1));
  }
}
