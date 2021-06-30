package ch.converge.pco

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class PcoApplication

fun main(args: Array<String>) {
	runApplication<PcoApplication>(*args)
}
