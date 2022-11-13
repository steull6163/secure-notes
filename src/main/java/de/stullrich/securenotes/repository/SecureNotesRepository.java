package de.stullrich.securenotes.repository;

import de.stullrich.securenotes.model.SecureNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SecureNotesRepository extends JpaRepository<SecureNote, Long> {

}
