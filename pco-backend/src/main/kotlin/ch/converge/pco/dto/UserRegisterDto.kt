package ch.converge.pco.dto

data class UserRegisterDto(
        var email: String,
        var firstName: String,
        var lastName: String,
        var password: String,
        var phone: String?,
        var newsletter: Boolean? = false
)