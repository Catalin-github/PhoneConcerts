package ch.converge.pco.dto

import ch.converge.pco.enums.LoginType

data class TokenData(
        var email: String,
        var loginType: LoginType = LoginType.BASIC
)
