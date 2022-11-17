package de.stullrich.securenotes.service;

import de.stullrich.securenotes.model.SecureNote;
import de.stullrich.securenotes.repository.SecureNotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class SecureNotesService {

	@Autowired
	private SecureNotesRepository repository;

	private static final AtomicLong atomicLong = new AtomicLong(10);

	public List<String> getTitles() {
		List<String> titles = new ArrayList<>();
		getNotes().stream().forEach(note -> titles.add(note.getTitle()));
		return titles;
	}

	public List<SecureNote> getNotes() {
		List<SecureNote> secureNotes = repository.findAll();
		return secureNotes;
	}

	public SecureNote get(String title) {
		SecureNote secureNote = null;
		Optional<SecureNote> optional = getNotes().stream().filter(note -> note.getTitle().equals(title)).findFirst();
		if (optional.isPresent()) {
			secureNote = optional.get();
		}
		return secureNote;
	}

	public SecureNote createOrUpdate(Long id, SecureNote secureNote) {
		SecureNote createdOrUpdated = null;
		if (id == null && secureNote.getId() == null) {
			Long newId = atomicLong.getAndIncrement();
			secureNote.setId(newId);
			createdOrUpdated = repository.save(secureNote);
		} else {
			if (id.equals(secureNote.getId())) {
				createdOrUpdated = repository.save(secureNote);
			} else {
				// throw exception
			}
		}
		return createdOrUpdated;
	}

	public void delete(Long id) {
		Optional<SecureNote> secureNote = repository.findById(id);
		if (secureNote.isPresent()) {
			repository.delete(secureNote.get());
		}
	}

	public static Long getId() {
		return atomicLong.getAndIncrement();
	}
}
