package de.stullrich.securenotes.model;

import lombok.Data;
import org.springframework.stereotype.Component;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Component
@Table(name = "KEY_PAIR")
public class KeyPair {

	@Id
	private Long id;
	@Column(name = "PRIVATE_KEY")
	private String privateKey;
	@Column(name = "PUBLIC_KEY")
	private String publicKey;
}
