package ch.converge.pco.dao

import ch.converge.pco.model.ConcertModel

interface ConcertDao {
    fun getConcerts(): MutableList<ConcertModel>
    fun findConcertById(id: Long): ConcertModel?

}
