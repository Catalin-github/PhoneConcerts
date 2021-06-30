package ch.converge.pco.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/aliveCheck")
class CheckController {

    @GetMapping
    fun aliveCheck(): AliveCheckDto {
        return AliveCheckDto()
    }

    data class AliveCheckDto(
            val message: String = "I'm alive ;)"
    )
}