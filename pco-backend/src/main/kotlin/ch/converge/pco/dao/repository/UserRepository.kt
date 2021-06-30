package ch.converge.pco.dao.repository

import ch.converge.pco.model.UserModel
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<UserModel, Long> {
    fun findByEmail(email: String): UserModel?
    fun <T> findByEmail(email: String, type: Class<T>): T?
}