package ch.converge.pco.model

import javax.persistence.*

@Entity(name = "user")
@Table(name = "user")
class UserModel(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,

        @Column(unique = true, nullable = false)
        var email: String,

        @Column(nullable = false)
        var firstName: String,

        @Column(nullable = false)
        var lastName: String,

        var phone: String? = null,

        var profileImage: String? = null,

        var newsletter: Boolean? = false,

        @OneToMany(mappedBy = "user", fetch = FetchType.EAGER, cascade = [CascadeType.ALL])
        var logins: MutableList<LoginModel> = mutableListOf(),
)