package ch.converge.pco.dao.repository

import ch.converge.pco.model.ConcertModel
import org.springframework.data.repository.CrudRepository

interface ConcertRepository : CrudRepository<ConcertModel, Long> {

}