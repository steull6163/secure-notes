package de.stullrich.securenotes.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.*;

@Data
@Entity
@Component
@NoArgsConstructor
@AllArgsConstructor
@Table(name="securenote")
public class SecureNote {

	@Id
	@GeneratedValue
	private Long id;
	@Column
	private String title;
	@Column
	private String note;

	public SecureNote(String title, String note) {
		this.title = title;
		this.note = note;
	}

}
