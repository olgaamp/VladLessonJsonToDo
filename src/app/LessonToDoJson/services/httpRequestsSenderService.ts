import {UserDto} from '../../UserDto';

export class HttpRequestsSenderService {

  private url: string = 'https://gorest.co.in/public-api/users?_format=json&access-token=Mpa9uWdhPEW_AbKAgwY8PHJHODpV84Cgo1d-';

  getUsers(page: number, functionToExecuteWhenAllUsersDownloaded: (xhr: XMLHttpRequest) => void) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.url + '&page=' + page);
    xhr.onload = function() {
      functionToExecuteWhenAllUsersDownloaded(xhr);
    };
    xhr.send();
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
