package ch.converge.pco.dto

data class AuthenticatedDto(
        var isAuthenticated: Boolean,
        var user: UserDto?
)
