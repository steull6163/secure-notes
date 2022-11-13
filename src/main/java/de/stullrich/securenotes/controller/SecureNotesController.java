package de.stullrich.securenotes.controller;

import de.stullrich.securenotes.model.SecureNote;
import de.stullrich.securenotes.service.SecureNotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
	public List getSecureNotes() {
		return service.getAll();
	}

	@GetMapping("/rest/note/{id}")
	public SecureNote getSecureNote(@PathVariable() long id) {
		return service.get(id);
	}
}
