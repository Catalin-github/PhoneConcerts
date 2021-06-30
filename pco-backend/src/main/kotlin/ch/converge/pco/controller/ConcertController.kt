package ch.converge.pco.controller

import ch.converge.pco.data.ConcertData
import ch.converge.pco.dto.ConcertListDto
import ch.converge.pco.dto.ConcertTileDto
import ch.converge.pco.service.concert.ConcertService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class ConcertController {

    @Autowired
    private lateinit var concertService: ConcertService

    @GetMapping("/concerts")
    fun getConcerts(): ConcertListDto {
        val concertTiles: MutableList<ConcertTileDto> = concertService.getConcertTiles()
        return ConcertListDto(concertTiles)
    }

    @GetMapping("/concert")
    fun getConcert(@RequestParam id: Long): ConcertData? {
        return concertService.getConcertById(id)
    }
}