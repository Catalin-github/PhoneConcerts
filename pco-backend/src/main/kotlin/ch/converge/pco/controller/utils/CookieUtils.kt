package ch.converge.pco.controller.utils

import java.net.URLDecoder
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

const val JWT_COOKIE_NAME : String = "jwt"

fun getCookie(httpServletRequest: HttpServletRequest, cookieName: String): Cookie? {
    val arrayOfCookies = httpServletRequest.cookies
    return arrayOfCookies?.find { cookie -> cookieName == cookie.name }
}

fun getCookieValue(httpServletRequest: HttpServletRequest, cookieName: String): String? {
    val jwtCookie = getCookie(httpServletRequest, cookieName)
    return if (jwtCookie != null) URLDecoder.decode(jwtCookie.value, "UTF-8") else null
}

fun addCookieToResponse(httpServletResponse: HttpServletResponse, name: String, value: String) {
    val cookie = Cookie(name, value)
    cookie.isHttpOnly = true
//    cookie.secure = true // todo should be secure soon.
    cookie.maxAge = 21600
    cookie.path = "/"
    httpServletResponse.addCookie(cookie)
}

fun deleteCookie(httpServletRequest: HttpServletRequest, httpServletResponse: HttpServletResponse, cookieName: String) {
    val cookie = getCookie(httpServletRequest, cookieName)
    if (cookie != null){
        deleteCookie(httpServletResponse, cookie)
    }
}

fun deleteCookie(httpServletResponse: HttpServletResponse, cookie: Cookie) {
    cookie.maxAge = 0
    cookie.path = "/"
    httpServletResponse.addCookie(cookie)
}
