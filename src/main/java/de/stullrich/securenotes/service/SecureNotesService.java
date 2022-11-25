package de.stullrich.securenotes.service;

import de.stullrich.securenotes.model.KeyPair;
import de.stullrich.securenotes.model.SecureNote;
import de.stullrich.securenotes.repository.KeyPairRepository;
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

	@Autowired
	private KeyPairRepository keyPairRepository;

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
		Optional<SecureNote> optional = repository.findByTitle(title);
		if (optional.isPresent()) {
			secureNote = optional.get();
		}
		return secureNote;
	}

	public SecureNote createOrUpdate(Long id, SecureNote note) {
		Optional<SecureNote> optional = repository.findByTitle(note.getTitle());
		SecureNote secureNote = null;
		if (optional.isPresent()) {
			secureNote = optional.get();
		}
		if (id == null && secureNote == null) {
			// create
			note.setId(atomicLong.getAndIncrement());
			secureNote = note;
		} else {
			// update
			secureNote.setNote(note.getNote());
		}
		return repository.save(secureNote);
	}

	public boolean delete(Long id) {
		boolean result = false;
		Optional<SecureNote> secureNote = repository.findById(id);
		if (secureNote.isPresent()) {
				repository.delete(secureNote.get());
				result = true;
		}
		return result;
	}

	public static Long getId() {
		return atomicLong.getAndIncrement();
	}

	public KeyPair getKeys() {
		KeyPair keyPair = null;
		List<KeyPair> keyList = keyPairRepository.findAll();
		if (!keyList.isEmpty()) {
			keyPair = keyList.get(0);
		}
		return keyPair;
	}
}
