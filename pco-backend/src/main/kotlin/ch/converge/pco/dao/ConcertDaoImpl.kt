package ch.converge.pco.dao

import ch.converge.pco.dao.repository.ConcertRepository
import ch.converge.pco.model.ConcertModel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Repository

@Repository
class ConcertDaoImpl : ConcertDao {

    @Autowired
    private lateinit var concertRepository: ConcertRepository

    override fun getConcerts(): MutableList<ConcertModel> {
        return concertRepository.findAll() as MutableList<ConcertModel>
    }

    override fun findConcertById(id: Long): ConcertModel? {
        return concertRepository.findByIdOrNull(id)
    }
}