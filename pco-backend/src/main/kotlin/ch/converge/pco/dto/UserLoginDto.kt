package ch.converge.pco.dto

data class UserLoginDto(
        var email: String,
        var password: String? = null,
        var token: String? = null
)