package ch.converge.pco.service.user

import ch.converge.pco.converter.createUserModelWithLogin
import ch.converge.pco.converter.createUserModelWithSocialLogin
import ch.converge.pco.dao.UserDao
import ch.converge.pco.data.UserData
import ch.converge.pco.dto.UserDto
import ch.converge.pco.dto.UserRegisterDto
import ch.converge.pco.enums.LoginType
import ch.converge.pco.model.LoginModel
import ch.converge.pco.model.UserModel
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class UserServiceImpl : UserService {

    val logger: Logger = LoggerFactory.getLogger(UserServiceImpl::class.java)

    @Autowired
    lateinit var userDao: UserDao

    @Autowired
    lateinit var passwordEncoder: PasswordEncoder

    override fun registerUser(userRegisterDto: UserRegisterDto): Boolean {
        var registered = false

        val userExists: Boolean = userDao.userExistsByEmail(userRegisterDto.email)
        if (!userExists) {
            val userModel: UserModel = createUserModelWithLogin(userRegisterDto, passwordEncoder)
            userDao.save(userModel)
            registered = true
        } else {
            logger.info("User with email ${userRegisterDto.email} already exists.")
        }

        return registered
    }

    override fun createOrUpdateUserWithGoogleLogin(userData: UserData): Boolean {
        var success = false
        if (userData.token != null) {
            val existingUser: UserModel? = userDao.findUserByEmail(userData.email)
            if (existingUser == null) {
                createUserWithGoogleLogin(userData)
            } else {
                updateUserWithGoogleLogin(existingUser, userData)
            }

            success = true
        }

        return success
    }

    private fun updateUserWithGoogleLogin(existingUser: UserModel, userData: UserData) {
        val googleLogin: LoginModel? = existingUser.logins.find { it.loginType == LoginType.GOOGLE }
        val token = userData.token!!
        if (googleLogin == null) {
            existingUser.logins.add(LoginModel(user = existingUser, loginType = LoginType.GOOGLE, tokenValue = token))
        } else {
            googleLogin.tokenValue = token
        }
        userDao.save(existingUser)
    }

    private fun createUserWithGoogleLogin(userData: UserData) {
        val userModel = createUserModelWithSocialLogin(userData, LoginType.GOOGLE, userData.token!!)
        userDao.save(userModel)
    }

    override fun findUserByEmail(email: String): UserData? {
        val userModel: UserModel? = userDao.findUserByEmail(email)
        return userModel?.let { convertUserModelToUserData(it) }
    }

    private fun convertUserModelToUserData(userModel: UserModel): UserData {
        return UserData(
                userModel.email,
                userModel.firstName,
                userModel.lastName,
                userModel.phone,
                null,
                userModel.newsletter
        )
    }

    override fun getUserDtoForAuthentication(email: String): UserDto {
        val firstName: String? = getUserFirstNameByEmail(email)
        return UserDto(email, firstName)
    }

    override fun getUserFirstNameByEmail(email: String): String? {
        return userDao.getUserFirstNameByEmail(email)
    }
}