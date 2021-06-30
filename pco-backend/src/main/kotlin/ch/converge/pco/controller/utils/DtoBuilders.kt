package ch.converge.pco.controller.utils

import ch.converge.pco.constants.USER_AUTHENTICATION_FAILURE
import ch.converge.pco.constants.USER_AUTHENTICATION_SUCCESS
import ch.converge.pco.constants.USER_REGISTRATION_FAILURE
import ch.converge.pco.dto.LoginResponseDto
import ch.converge.pco.dto.UserDto

fun buildLoginResponseDto(authenticated: Boolean, registered: Boolean, userDto: UserDto): LoginResponseDto {
    return if (registered) {
        buildLoginResponseDto(authenticated, userDto)
    } else {
        LoginResponseDto(false, USER_REGISTRATION_FAILURE, null)
    }
}

fun buildLoginResponseDto(authenticated: Boolean, userDto: UserDto?): LoginResponseDto {
    return if (authenticated) {
        LoginResponseDto(true, USER_AUTHENTICATION_SUCCESS, userDto)
    } else {
        LoginResponseDto(false, USER_AUTHENTICATION_FAILURE, null)
    }
}