import {UserDto} from '../../UserDto';
import {HttpRequestsSenderService} from './httpRequestsSenderService';

export class DataLoader {
  private httpRequestsSenderService: HttpRequestsSenderService = new HttpRequestsSenderService();

  loadData(page: number,
           functionForSuccess: (data: UserDto[], currentPage: number) => void,
           functionForError: (errorMessage: string) => void,
           functionInTheEnd: () => void) {
    let dataUser = localStorage.getItem(page.toString());
    if (dataUser !== null && this.getDiffMs() <= 100000) {
      alert('Загружаю с LocalStorage');
      this.processData(dataUser, functionForSuccess, functionInTheEnd);
    } else {
      alert('Загружаю с сервера');
      this.httpRequestsSenderService.getUsers(page, functionForSuccess, functionForError, functionInTheEnd);
    }

  }

  private getDiffMs() {
    let timeBegin = localStorage.getItem('getTimeDataUser');
    let dateFromString = new Date(parseInt(timeBegin));
    let now = new Date();
    let diffMs = Math.abs(now.getTime() - dateFromString.getTime());
    return diffMs;
  }

  processData(dataUser: string, functionForSuccess: (data: UserDto[], currentPage: number) => void, functionInTheEnd: () => void) {
    let data = JSON.parse(dataUser);
    functionForSuccess(data.result as UserDto[], data._meta.currentPage);
    functionInTheEnd();
  }
}
