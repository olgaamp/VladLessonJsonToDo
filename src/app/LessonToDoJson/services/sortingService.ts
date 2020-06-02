import {SortingType} from './sortingType';
import {UserDto} from '../../UserDto';

export class SortingService {
  sort(array: UserDto[], sortingType: SortingType) {
    if (sortingType === SortingType.FirstName) {
      array.sort((user1, user2) => {
        return (user1.first_name > user2.first_name ? 1 : -1);
      });
    } else if (sortingType === SortingType.LastName) {
      array.sort((a, b) => (a.last_name > b.last_name ? 1 : -1));
    } else if (sortingType === SortingType.Gender) {
      array.sort((a, b) => (a.gender > b.gender ? 1 : -1));
    } else if (sortingType === SortingType.DateOfBirth) {
      array.sort((a, b) => (a.dob > b.dob ? 1 : -1));
    } else if (sortingType === SortingType.PhoneNumber) {
      array.sort((a, b) => (a.phone > b.phone ? 1 : -1));
    }
  }
}

