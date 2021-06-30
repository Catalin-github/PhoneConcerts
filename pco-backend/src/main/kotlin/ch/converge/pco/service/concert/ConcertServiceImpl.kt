package ch.converge.pco.service.concert

import ch.converge.pco.converter.convertConcertModelToConcertData
import ch.converge.pco.converter.convertConcertModelToConcertTileDto
import ch.converge.pco.dao.ConcertDao
import ch.converge.pco.data.ConcertData
import ch.converge.pco.dto.ConcertTileDto
import ch.converge.pco.model.ConcertModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class ConcertServiceImpl : ConcertService {

    @Autowired
    private lateinit var concertDao: ConcertDao

    override fun getConcertById(id: Long): ConcertData? {
        val concertModel: ConcertModel? = concertDao.findConcertById(id)
        return concertModel?.let { convertConcertModelToConcertData(it) }
    }

    override fun getConcertTiles(): MutableList<ConcertTileDto> {
        val concertModels = concertDao.getConcerts()
        return concertModels.asSequence()
                .map(::convertConcertModelToConcertTileDto)
                .toMutableList()

    }
}