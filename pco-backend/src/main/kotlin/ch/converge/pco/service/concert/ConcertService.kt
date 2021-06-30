package ch.converge.pco.service.concert

import ch.converge.pco.data.ConcertData
import ch.converge.pco.dto.ConcertTileDto

interface ConcertService {
    fun getConcertTiles(): MutableList<ConcertTileDto>
    fun getConcertById(id: Long): ConcertData?
}
