package de.stullrich.securenotes.repository;

import de.stullrich.securenotes.model.SecureNote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SecureNotesRepository extends JpaRepository<SecureNote, Long> {

	@Query("SELECT s from SecureNote s WHERE s.title = :title")
	public Optional<SecureNote> findByTitle(@Param("title") String title);
}
