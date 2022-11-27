package de.stullrich.securenotes.repository;

import de.stullrich.securenotes.model.KeyPair;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KeyPairRepository extends JpaRepository<KeyPair, Long> {
}
