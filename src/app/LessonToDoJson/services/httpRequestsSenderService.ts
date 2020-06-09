import {UserDto} from '../../UserDto';
import {SortingType} from './sortingType';

export class HttpRequestsSenderService {

  private static url: string = 'https://gorest.co.in/public-api/users?_format=json&access-token=Mpa9uWdhPEW_AbKAgwY8PHJHODpV84Cgo1d-';

  getUsers(
    page: number,
    functionForSuccess: (data: UserDto[], currentPage: number) => void,
    functionForError: (errorMessage: string) => void,
    functionInTheEnd: () => void) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', HttpRequestsSenderService.url + '&page=' + page);
    let thisComponent = this;
    xhr.onload = function() {
      // 1 строчка, где мы знаем, что ответ получен

      if (xhr.status !== 200) {
        functionForError(xhr.status + ' ' + xhr.statusText);
      } else {
        // тут как-то побрабатывает данные
        // получаем наш массив. Пусть переменная называется data
        let data = thisComponent.processResponse(xhr, page);
        functionForSuccess(data.result as UserDto[], page);
      }

      functionInTheEnd();
    };
    xhr.send();
  }

  private processResponse(xhr: XMLHttpRequest, page) {
    let pageString: string = page;
    localStorage.setItem(pageString, xhr.response);
    let now = new Date();
    localStorage.setItem('getTimeDataUser', '' + now.getTime());
    // сломалось здесь. Нужно разбираться
    // localStorage.setItem('getPageNumberDataUser', xhr._meta.currentPage);
    let result = JSON.parse(xhr.response);
    return result;
  }

  postUser(userDto: UserDto, functionToExecuteWhenUserUploadedToServer: () => void) {
    let user = JSON.stringify(userDto);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', HttpRequestsSenderService.url);
    xhr.onload = functionToExecuteWhenUserUploadedToServer;
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(user);
  }


}
