package de.stullrich.securenotes.controller;

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

	@GetMapping("/rest/note")
	@ResponseStatus(HttpStatus.OK)
	public List getSecureNotes() {
		return service.getAll();
	}

	@GetMapping("/rest/note/{id}")
	@ResponseStatus(HttpStatus.OK)
	public SecureNote getSecureNote(@PathVariable() long id) {
		return service.get(id);
	}

	@PostMapping("/rest/note")
	@ResponseStatus(HttpStatus.CREATED)
	public SecureNote createSecureNote(@RequestBody SecureNote secureNote) {
		return service.createOrUpdate(null, secureNote);
	}

	@PutMapping("/rest/note/{id}")
	@ResponseStatus(HttpStatus.OK)
	public SecureNote updateSecureNote(@PathVariable() long id, @RequestBody SecureNote secureNote) {
		return service.createOrUpdate(id, secureNote);
	}

	@DeleteMapping("/rest/note/{id}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public void deleteSecureNote(@PathVariable() long id) {
		service.delete(id);
	}
}
