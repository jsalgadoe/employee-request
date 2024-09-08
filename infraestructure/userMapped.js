export class UserMapper {
  static userLoginMapper(
    userLogin = {
      name: "",
      password: "",
    }
  ) {
    return {
      name: userLogin.name,
      password: userLogin.password,
    };
  }

  static userRegisterMapper(
    userRegister = {
      name: "",
      password: "",
      is_admin: false,
      identification: "",
    }
  ) {
    return {
      name: userRegister.name,
      password: userRegister.password,
      is_admin: userRegister.is_admin,
      identification: userRegister.identification,
    };
  }
}
