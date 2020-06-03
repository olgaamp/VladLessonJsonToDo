import {UserDto} from '../../UserDto';
import {SortingType} from './sortingType';

export class HttpRequestsSenderService {

  private url: string = 'https://gorest.co.in/public-api/users?_format=json&access-token=Mpa9uWdhPEW_AbKAgwY8PHJHODpV84Cgo1d-';

  getUsers(
    page: number,
    functionForSuccess: (data: UserDto[]) => void,
    functionForError: (errorMessage: string) => void,
    functionInTheEnd: () => void) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.url + '&page=' + page);
    let thisService = this;
    xhr.onload = function() {
      if (xhr.status !== 200) {
        functionForError(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      } else {
        // тут как-то побрабатывает данные
        // получаем наш массив. Пусть переменная называется data
        let data = thisService.processResponse(xhr);
        functionForSuccess(data);
      }

      functionInTheEnd();
    };
    xhr.send();
  }

  private processResponse(xhr: XMLHttpRequest): UserDto[] {
    localStorage.setItem('dataUser', xhr.response);
    let now = new Date();
    localStorage.setItem('getTimeDataUser', '' + now.getTime());
    let result = this.processData(xhr.response);
    // localStorage.setItem('getPageNumber', page);

    return result;
  }

  public processData(dataUser: string) {
    let parsedArrayOfUsers = JSON.parse(dataUser).result;

    return parsedArrayOfUsers;
  }

  postUser(userDto: UserDto, functionToExecuteWhenUserUploadedToServer: () => void) {
    let user = JSON.stringify(userDto);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', this.url);
    xhr.onload = functionToExecuteWhenUserUploadedToServer;
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(user);
  }

}
