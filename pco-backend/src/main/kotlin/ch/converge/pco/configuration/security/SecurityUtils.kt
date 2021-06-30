package ch.converge.pco.configuration.security

val PATHS_WITH_NO_JWT_AUTHENTICATION = arrayOf("/api/user/login",
                                               "/api/user/register",
                                               "/api/user/logout",
                                               "/api/user/auth/google")

val PATHS_WITH_JWT_AUTHENTICATION = arrayOf("/api/user/isAuthenticated",
                                            "/api/user/account",
                                            "/api/concerts",
                                            "/api/concert")


const val GOOGLE_CLIENT_ID = "758308718543-8aqhjfd3l379i3v9qootvb409u3328oh.apps.googleusercontent.com"
