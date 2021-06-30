package ch.converge.pco.service.auth

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import javax.servlet.http.HttpServletRequest

fun authenticate(userDetails: UserDetails, request: HttpServletRequest) {
    val usernamePasswordAuthenticationToken =
            UsernamePasswordAuthenticationToken(userDetails.username, userDetails.password, emptyList())
    setAuthTokenDetailsAndAddToSecurityContext(usernamePasswordAuthenticationToken, request)
}

fun authenticateSocialLogin(email: String, request: HttpServletRequest) {
    val usernamePasswordAuthenticationToken = UsernamePasswordAuthenticationToken(email, null, emptyList())
    setAuthTokenDetailsAndAddToSecurityContext(usernamePasswordAuthenticationToken, request)
}

private fun setAuthTokenDetailsAndAddToSecurityContext(usernamePasswordAuthenticationToken: UsernamePasswordAuthenticationToken, request: HttpServletRequest) {
    usernamePasswordAuthenticationToken.details = WebAuthenticationDetailsSource().buildDetails(request)
    SecurityContextHolder.getContext().authentication = usernamePasswordAuthenticationToken
}