package ch.converge.pco.model

import ch.converge.pco.enums.LoginType
import javax.persistence.*

@Entity(name = "login")
@Table(name = "login")
class LoginModel(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,

        var loginType: LoginType = LoginType.BASIC,

        var userPassword: String? = null,

        var tokenValue: String? = null,

        @ManyToOne @JoinColumn(name = "userId")
        var user: UserModel? = null
)