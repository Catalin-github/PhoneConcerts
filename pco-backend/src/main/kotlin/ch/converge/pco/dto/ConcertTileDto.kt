package ch.converge.pco.dto

import java.time.LocalDateTime

data class ConcertTileDto(
        var id: Long,
        var name: String,
        var description: String,
        var location: String,
        var startTime: LocalDateTime,
        var endTime: LocalDateTime,
        var thumbnail: String?
)