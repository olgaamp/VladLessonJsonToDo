import {HttpRequestsSenderService} from './httpRequestsSenderService';
import {UserDto} from '../../UserDto';

export class CreateNewUserService {

  // у аргументов есть имена. Мы их какие хотим - такие пишем. Главное - порядок один за другим
  createNewUser(setOperationStarted: () => void): void { //А здест где название? Какой здесь параметр??? Как можно понять?
    let obj = {
      first_name: 'Kuznetcova',
      last_name: 'Ratke',
      gender: 'male',
      email: 'olga_amp@mail.ru',
      status: 'active'
    } as UserDto;

    let service = new HttpRequestsSenderService();
    service.postUser(obj, setOperationStarted);
  }
}
