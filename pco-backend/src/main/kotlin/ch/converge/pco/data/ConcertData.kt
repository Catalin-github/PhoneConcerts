package ch.converge.pco.data

import java.time.LocalDateTime

data class ConcertData(
        var id: Long,
        var name: String,
        var description: String,
        var location: String,
        var startTime: LocalDateTime,
        var endTime: LocalDateTime,
        var iFrame: String
)