package de.stullrich.securenotes.controller;

import de.stullrich.securenotes.model.KeyPair;
import de.stullrich.securenotes.model.SecureNote;
import de.stullrich.securenotes.service.SecureNotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
public class SecureNotesController {

	@Autowired
	private SecureNotesService service;

	@RequestMapping("/")
	public ModelAndView home()
	{
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.setViewName("index");
		return modelAndView;
	}

	@GetMapping("/rest/note/titles")
	@ResponseStatus(HttpStatus.OK)
	public List<String> getTitles() {
		return service.getTitles();
	}

	@GetMapping("/rest/note")
	@ResponseStatus(HttpStatus.OK)
	public List<SecureNote> getNotes() {
		return service.getNotes();
	}


	@GetMapping("/rest/note/keys")
	@ResponseStatus(HttpStatus.OK)
	public KeyPair getKeys() {
		return service.getKeys();
	}


	@GetMapping("/rest/note/{title}")
	@ResponseStatus(HttpStatus.OK)
	public SecureNote get(@PathVariable String title) {
		return service.get(title);
	}

	@PostMapping("/rest/note")
	@ResponseStatus(HttpStatus.CREATED)
	public SecureNote post(@RequestBody SecureNote secureNote) {
		return service.createOrUpdate(null, secureNote);
	}

	@PutMapping("/rest/note/{id}")
	@ResponseStatus(HttpStatus.OK)
	public SecureNote update(@PathVariable long id, @RequestBody SecureNote secureNote) {
		return service.createOrUpdate(id, secureNote);
	}

	@DeleteMapping("/rest/note/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public boolean delete(@PathVariable long id) {
		try {
			return service.delete(id);
		} catch (Exception e) {
			return false;
		}
	}
}
