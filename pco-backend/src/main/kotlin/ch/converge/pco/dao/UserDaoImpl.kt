package ch.converge.pco.dao

import ch.converge.pco.dao.repository.UserRepository
import ch.converge.pco.dao.repository.projections.UserFirstName
import ch.converge.pco.model.UserModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class UserDaoImpl : UserDao {

    @Autowired
    lateinit var userRepository: UserRepository

    override fun findUserByEmail(email: String): UserModel? {
        return userRepository.findByEmail(email)
    }

    override fun getUserFirstNameByEmail(email: String): String? {
        return userRepository.findByEmail<UserFirstName>(email, UserFirstName::class.java)?.getFirstName()
    }

    override fun userExistsByEmail(email: String): Boolean {
        return findUserByEmail(email) != null
    }

    override fun save(userModel: UserModel): UserModel {
        return userRepository.save(userModel)
    }
}