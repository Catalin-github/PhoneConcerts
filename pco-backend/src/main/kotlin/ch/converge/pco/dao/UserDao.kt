package ch.converge.pco.dao

import ch.converge.pco.model.UserModel

interface UserDao {
    fun findUserByEmail(email: String): UserModel?
    fun userExistsByEmail(email: String): Boolean
    fun save(userModel: UserModel): UserModel
    fun getUserFirstNameByEmail(email: String): String?
}