package ch.converge.pco.filters

import ch.converge.pco.configuration.security.PATHS_WITH_JWT_AUTHENTICATION
import ch.converge.pco.controller.utils.JWT_COOKIE_NAME
import ch.converge.pco.controller.utils.addCookieToResponse
import ch.converge.pco.controller.utils.getCookie
import ch.converge.pco.dto.TokenData
import ch.converge.pco.enums.LoginType
import ch.converge.pco.service.auth.AuthenticationService
import ch.converge.pco.service.auth.authenticate
import ch.converge.pco.util.JwtUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class JwtRequestFilter : OncePerRequestFilter() {

    @Autowired
    lateinit var jwtUtil: JwtUtil

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    lateinit var userDetailsService: UserDetailsService

    @Autowired
    lateinit var authenticationService: AuthenticationService

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, filterChain: FilterChain) {
        if (shouldBeFiltered(request)) {
            val jwtCookie: Cookie? = getCookie(request, JWT_COOKIE_NAME)
            if (jwtCookie != null && jwtCookie.maxAge != 0) {
                try {
                    validateJwtAuthenticateAndSetCookie(jwtCookie, request, response)
                } catch (e: Exception) {
                    logger.error(e.message, e)
                }
            }
        }

        filterChain.doFilter(request, response)
    }

    private fun shouldBeFiltered(request: HttpServletRequest) =
            request.servletPath in PATHS_WITH_JWT_AUTHENTICATION

    private fun validateJwtAuthenticateAndSetCookie(cookie: Cookie,
                                                    request: HttpServletRequest,
                                                    response: HttpServletResponse
    ) {
        val token = cookie.value
        val email: String? = jwtUtil.extractEmail(token)
        val loginType = jwtUtil.extractLoginType(token)

        if (email != null && SecurityContextHolder.getContext().authentication == null) {
            when (loginType) {
                LoginType.BASIC    -> handleBasicLogin(email, token, request, response)
                LoginType.GOOGLE   -> handleGoogleLogin(token, email, request, response)
                LoginType.FACEBOOK -> TODO()
            }
        }
    }

    private fun handleBasicLogin(email: String?, token: String, request: HttpServletRequest, response: HttpServletResponse) {
        val userDetails: UserDetails = userDetailsService.loadUserByUsername(email)
        if (jwtUtil.validateToken(token, TokenData(userDetails.username, LoginType.BASIC))) {
            // todo renew token.
            authenticate(userDetails, request)
            addCookieToResponse(response, JWT_COOKIE_NAME, token)
        }
    }

    private fun handleGoogleLogin(token: String, email: String, request: HttpServletRequest, response: HttpServletResponse) {
        if (jwtUtil.validateToken(token, TokenData(email, LoginType.GOOGLE))) {
            authenticationService
                    .authenticateSocialLoginGenerateJWTAndSetCookie(email, LoginType.GOOGLE, request, response)
        }
    }
}