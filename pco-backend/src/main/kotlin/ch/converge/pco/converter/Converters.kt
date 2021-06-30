package ch.converge.pco.converter

import ch.converge.pco.data.ConcertData
import ch.converge.pco.dto.ConcertTileDto
import ch.converge.pco.model.ConcertModel

fun convertConcertModelToConcertTileDto(concertModel: ConcertModel): ConcertTileDto {
    return ConcertTileDto(
            concertModel.id,
            concertModel.name,
            concertModel.description,
            concertModel.location,
            concertModel.startTime,
            concertModel.endTime,
            concertModel.thumbnail
    )
}

fun convertConcertModelToConcertData(concertModel: ConcertModel) : ConcertData{
    return ConcertData(
            concertModel.id,
            concertModel.name,
            concertModel.description,
            concertModel.location,
            concertModel.startTime,
            concertModel.endTime,
            concertModel.iFrame
    )
}