package ch.converge.pco.service.auth

import ch.converge.pco.dao.LoginDao
import ch.converge.pco.dao.UserDao
import ch.converge.pco.enums.LoginType
import ch.converge.pco.model.LoginModel
import ch.converge.pco.model.UserModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class UserDetailsServiceImpl : UserDetailsService {

    @Autowired
    lateinit var loginDao: LoginDao

    @Autowired
    lateinit var userDao: UserDao

    override fun loadUserByUsername(username: String?): UserDetails {
        if (username != null) {
            val userModel: UserModel? = userDao.findUserByEmail(username)
            if (userModel != null) {
                val login: LoginModel? = userModel.logins.find { login -> login.loginType == LoginType.BASIC }
                return User(username, login?.userPassword, emptyList())
            }
        }

        throw UsernameNotFoundException("No username found with id $username")
    }
}