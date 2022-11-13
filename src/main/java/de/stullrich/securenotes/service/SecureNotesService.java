package de.stullrich.securenotes.service;

import de.stullrich.securenotes.model.SecureNote;
import de.stullrich.securenotes.repository.SecureNotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SecureNotesService {

	@Autowired
	private SecureNotesRepository repository;

	public List<SecureNote> getAll() {
		return repository.findAll();
	}

	public SecureNote get(long id) {
		SecureNote secureNote = null;
		Optional<SecureNote> optional = repository.findById(id);
		if (optional.isPresent()) {
			secureNote = optional.get();
		}
		return secureNote;
	}
}
