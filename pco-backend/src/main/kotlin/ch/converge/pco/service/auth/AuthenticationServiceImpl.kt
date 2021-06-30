package ch.converge.pco.service.auth

import ch.converge.pco.configuration.security.GOOGLE_CLIENT_ID
import ch.converge.pco.controller.utils.JWT_COOKIE_NAME
import ch.converge.pco.controller.utils.addCookieToResponse
import ch.converge.pco.data.UserData
import ch.converge.pco.dto.TokenData
import ch.converge.pco.dto.UserLoginDto
import ch.converge.pco.enums.LoginType
import ch.converge.pco.service.user.UserService
import ch.converge.pco.util.JwtUtil
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier
import com.google.api.client.googleapis.util.Utils
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.stereotype.Service
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class AuthenticationServiceImpl : AuthenticationService {

    val logger: Logger = LoggerFactory.getLogger(AuthenticationServiceImpl::class.java)

    @Autowired
    lateinit var jwtUtil: JwtUtil

    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var userService: UserService

    override fun authenticateUserAndSetJwtCookie(userLoginDto: UserLoginDto, response: HttpServletResponse): Boolean {
        var authenticated = false
        try {
            authenticationManager
                    .authenticate(UsernamePasswordAuthenticationToken(userLoginDto.email, userLoginDto.password))
            generateJwtAndSetCookie(userLoginDto.email, LoginType.BASIC, response)
            authenticated = true
            logger.info("User ${userLoginDto.email} authenticated successfully.")
        } catch (e: AuthenticationException) { // todo create and catch a more specific exception
            logger.warn("Incorrect username or password ${userLoginDto.email}")
        }
        return authenticated
    }

    override fun authenticateUserWithGoogleAndSetJwtCookie(userLoginDto: UserLoginDto,
                                                           request: HttpServletRequest,
                                                           response: HttpServletResponse
    ): Boolean {
        var authenticated = false

        val userData = getUserDataFromGoogle(userLoginDto)
        if (userData != null) {
            val createdOrUpdated = userService.createOrUpdateUserWithGoogleLogin(userData)
            if (createdOrUpdated) {
                authenticateSocialLoginGenerateJWTAndSetCookie(userLoginDto.email, LoginType.GOOGLE, request, response)
                authenticated = true
            }
        }

        return authenticated
    }

    private fun getUserDataFromGoogle(userLoginDto: UserLoginDto) = try {
        verifyTokenAndGetData(userLoginDto)
    } catch (e: Exception) {
        logger.error(e.message, e)
        null
    }

    override fun authenticateSocialLoginGenerateJWTAndSetCookie(userEmail: String,
                                                                loginType: LoginType,
                                                                request: HttpServletRequest,
                                                                response: HttpServletResponse
    ) {
        authenticateSocialLogin(userEmail, request)
        generateJwtAndSetCookie(userEmail, loginType, response)
    }

    private fun generateJwtAndSetCookie(userEmail: String, loginType: LoginType, response: HttpServletResponse) {
        val jwt: String = jwtUtil.generateToken(TokenData(userEmail, loginType))
        addCookieToResponse(response, JWT_COOKIE_NAME, jwt)
    }

    private fun verifyTokenAndGetData(userLoginDto: UserLoginDto): UserData? {
        val verifier: GoogleIdTokenVerifier =
                GoogleIdTokenVerifier.Builder(Utils.getDefaultTransport(), Utils.getDefaultJsonFactory())
                        .setAudience(mutableListOf(GOOGLE_CLIENT_ID))
                        .build()

        val payload: GoogleIdToken.Payload? = verifier.verify(userLoginDto.token)?.payload

        if (payload != null && payload.email == userLoginDto.email) {
            return UserData(payload.email,
                            payload["given_name"] as String,
                            payload["family_name"] as String,
                            token = userLoginDto.token)
        }

        return null
    }
}