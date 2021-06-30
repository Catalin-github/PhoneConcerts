package ch.converge.pco.dto

data class LoginResponseDto(
        var success: Boolean,
        var message: String,
        var user: UserDto?
)