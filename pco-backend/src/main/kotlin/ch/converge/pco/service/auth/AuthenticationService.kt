package ch.converge.pco.service.auth

import ch.converge.pco.dto.UserLoginDto
import ch.converge.pco.enums.LoginType
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

interface AuthenticationService {
    fun authenticateUserAndSetJwtCookie(userLoginDto: UserLoginDto, response: HttpServletResponse): Boolean

    fun authenticateUserWithGoogleAndSetJwtCookie(userLoginDto: UserLoginDto,
                                                  request: HttpServletRequest,
                                                  response: HttpServletResponse
    ): Boolean

    fun authenticateSocialLoginGenerateJWTAndSetCookie(userEmail: String,
                                                       loginType: LoginType,
                                                       request: HttpServletRequest,
                                                       response: HttpServletResponse
    )
}