package ch.converge.pco.util

import ch.converge.pco.dto.TokenData
import ch.converge.pco.enums.LoginType
import java.util.*

interface   JwtUtil {
    fun extractEmail(token: String): String?
    fun extractExpiration(token: String): Date?
    fun extractLoginType(token: String): LoginType?
    fun isTokenExpired(token: String): Boolean
    fun generateToken(tokenData: TokenData): String
    fun validateToken(token: String, tokenData: TokenData): Boolean
}