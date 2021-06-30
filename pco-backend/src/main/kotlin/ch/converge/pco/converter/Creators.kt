package ch.converge.pco.converter

import ch.converge.pco.data.UserData
import ch.converge.pco.dto.UserRegisterDto
import ch.converge.pco.enums.LoginType
import ch.converge.pco.model.LoginModel
import ch.converge.pco.model.UserModel
import org.springframework.security.crypto.password.PasswordEncoder

fun  createUserModelWithLogin(userRegisterDto: UserRegisterDto, passwordEncoder: PasswordEncoder): UserModel {
    val userModel = UserModel(
            email = userRegisterDto.email,
            firstName = userRegisterDto.firstName,
            lastName = userRegisterDto.lastName,
            phone = userRegisterDto.phone,
            newsletter = userRegisterDto.newsletter)

    val loginModel = LoginModel(userPassword = passwordEncoder.encode(userRegisterDto.password), user = userModel)

    userModel.logins = mutableListOf(loginModel)

    return userModel
}

fun createUserModelWithSocialLogin(userData: UserData, loginType: LoginType, token: String): UserModel {
    val userModel = UserModel(
            email = userData.email,
            firstName = userData.firstName,
            lastName = userData.lastName
    )

    val loginModel = LoginModel(user = userModel,
                                loginType = loginType,
                                tokenValue = token)

    userModel.logins = mutableListOf(loginModel)

    return userModel
}