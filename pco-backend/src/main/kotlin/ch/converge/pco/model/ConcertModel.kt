package ch.converge.pco.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity(name = "concert")
@Table(name = "concert")
class ConcertModel(

        @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,

        @Column(nullable = false)
        var name: String,

        @Column(nullable = false)
        var startTime: LocalDateTime,

        @Column(nullable = false)
        var endTime: LocalDateTime,

        @Column(nullable = false)
        var location: String,

        @Column(nullable = false)
        var iFrame: String,

        @Column(nullable = false)
        var description: String,

        var thumbnail: String?

)
