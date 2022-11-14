package de.stullrich.securenotes;

import de.stullrich.securenotes.service.SecureNotesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

@EnableAutoConfiguration
@EntityScan("de.stullrich.securenotes.model")
@SpringBootApplication(scanBasePackages = {"de.stullrich.securenotes.*"})
public class SecureNotesApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(SecureNotesApplication.class);

	@Autowired
	JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {

		ApplicationContext applicationContext =
				SpringApplication.run(SecureNotesApplication.class, args);

		for (String name : applicationContext.getBeanDefinitionNames()) {
			System.out.println(name);
		}
	}

	/**
	 * Create initial test data
	 */
	@Override
	public void run(String... args) throws Exception {
		logger.info("Creating table");
		String title = "note";
		String note = "ENCRYPTED_kjadsfpgdfOIGIHJß98ad9rghugaß9UHüoiuhnBNEWFIUHFiaefögoihja";

		jdbcTemplate.execute("DROP TABLE securenote IF EXISTS");
		jdbcTemplate.execute("CREATE TABLE securenote(id SERIAL, title VARCHAR(128), note VARCHAR(1024))");
		for (int i = 1; i < 4; i++) {
			Long id = SecureNotesService.getId();
			jdbcTemplate.update("INSERT INTO securenote(id, title, note) VALUES ('" + id + "', '" + (title + i) + "', '" + (note + i) + "')");
		}
	}
}
