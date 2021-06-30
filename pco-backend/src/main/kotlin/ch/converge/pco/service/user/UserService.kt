package ch.converge.pco.service.user

import ch.converge.pco.data.UserData
import ch.converge.pco.dto.UserDto
import ch.converge.pco.dto.UserRegisterDto

interface UserService {
    fun registerUser(userRegisterDto: UserRegisterDto): Boolean
    fun findUserByEmail(email: String): UserData?
    fun getUserDtoForAuthentication(email: String): UserDto?
    fun getUserFirstNameByEmail(email: String): String?
    fun createOrUpdateUserWithGoogleLogin(userData: UserData): Boolean
}