package ch.converge.pco.controller

import ch.converge.pco.controller.utils.JWT_COOKIE_NAME
import ch.converge.pco.controller.utils.buildLoginResponseDto
import ch.converge.pco.controller.utils.deleteCookie
import ch.converge.pco.data.UserData
import ch.converge.pco.dto.*
import ch.converge.pco.service.auth.AuthenticationService
import ch.converge.pco.service.user.UserService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@RestController
@RequestMapping("/api/user")
class UserController {

    val logger: Logger = LoggerFactory.getLogger(UserController::class.java)

    @Autowired
    lateinit var authenticationService: AuthenticationService

    @Autowired
    lateinit var userService: UserService

    @PostMapping("/register")
    fun register(@RequestBody userRegisterDto: UserRegisterDto, response: HttpServletResponse): LoginResponseDto {
        logger.info("Trying to register user ${userRegisterDto.email}")
        var authenticated = false

        // todo validate user data (email, password etc)

        val registered: Boolean = userService.registerUser(userRegisterDto)
        if (registered) {
            val userLoginDto = UserLoginDto(userRegisterDto.email, userRegisterDto.password)
            authenticated = authenticationService.authenticateUserAndSetJwtCookie(userLoginDto, response)
        }

        val userDto = UserDto(userRegisterDto.email, userRegisterDto.firstName)
        return buildLoginResponseDto(authenticated, registered, userDto)
    }

    @PostMapping("/login")
    fun login(@RequestBody userLoginDto: UserLoginDto, response: HttpServletResponse): LoginResponseDto {

        val email = userLoginDto.email
        logger.info("Trying to login user $email")

        // todo validate user data.

        val authenticated: Boolean =
                authenticationService.authenticateUserAndSetJwtCookie(userLoginDto, response)

        return buildLoginResponseDto(authenticated, email)
    }

    private fun buildLoginResponseDto(authenticated: Boolean, email: String): LoginResponseDto {
        val userDto = if (authenticated) userService.getUserDtoForAuthentication(email) else null
        return buildLoginResponseDto(authenticated, userDto)
    }

    @PostMapping("/auth/google")
    fun loginWithGoogle(@RequestBody userLoginDto: UserLoginDto, request: HttpServletRequest, response: HttpServletResponse
    authenticationToken: UsernamePasswordAuthenticationToken): LoginResponseDto {
        val email = userLoginDto.email
        logger.info("Trying to authenticate user $email with google.")

        var authenticated = false
        if (userLoginDto.token?.isNotEmpty() == true && email.isNotEmpty()) {
            authenticated = authenticationService
                    .authenticateUserWithGoogleAndSetJwtCookie(userLoginDto, request, response)
        }
        return buildLoginResponseDto(authenticated, email)
    }

    @GetMapping("/isAuthenticated")
    fun isAuthenticated(request: HttpServletRequest, response: HttpServletResponse): AuthenticatedDto {
        var isAuthenticated = false
        var userDto: UserDto? = null

        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication is UsernamePasswordAuthenticationToken && authentication.isAuthenticated) {
            isAuthenticated = true
            userDto = userService.getUserDtoForAuthentication(authentication.principal as String)
        }

        return AuthenticatedDto(isAuthenticated, userDto)
    }

    @GetMapping("/account")
    fun getUserData(@RequestParam email: String): UserData? {
        logger.info("Retrieving account info for user $email")

        return userService.findUserByEmail(email)
    }

    @PostMapping("/logout")
    fun logout(httpServletRequest: HttpServletRequest, httpServletResponse: HttpServletResponse) {
        logger.info("Logging out...")
        deleteCookie(httpServletRequest, httpServletResponse, JWT_COOKIE_NAME)
    }
}