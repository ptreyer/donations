package de.treyer.softwareengineering.donations;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DonationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DonationsApplication.class, args);
	}
}
