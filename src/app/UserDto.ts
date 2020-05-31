// DTO = data transfer object

export interface UserDto {
  id: number,
  first_name: string,
  last_name: string,
  gender: string,
  dob: string,
  email: string,
  phone: string,
  website: string,
  address: string,
  status: string,
  links: {
    self: { href: string },
    edit: { href: string },
    avatar: { href: string }
  }
}
