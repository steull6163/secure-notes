package de.stullrich.securenotes;

import de.stullrich.securenotes.util.DatabaseTestData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContext;

@EnableAutoConfiguration
@EntityScan("de.stullrich.securenotes.model")
@SpringBootApplication(scanBasePackages = {"de.stullrich.securenotes.*"})
public class SecureNotesApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(SecureNotesApplication.class);

	@Autowired
	private DatabaseTestData databaseTestData;

	public static void main(String[] args) {
		ApplicationContext applicationContext =
				SpringApplication.run(SecureNotesApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		databaseTestData.createDatabase();
	}
}
