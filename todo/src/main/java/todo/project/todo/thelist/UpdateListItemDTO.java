package todo.project.todo.thelist;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class UpdateListItemDTO {

	@Pattern( regexp = "^(?=\\S).*$", message = "Title Cannot be empty")
	private String title;
	
	@Pattern( regexp = "^(?=\\S).*$", message = "Content Cannot be empty")
	private String content;
	
	@Pattern( regexp = "^(?=\\S).*$", message = "Content Cannot be empty")
	private String category;
	
	@Pattern( regexp = "^(?=\\S).*$", message = "Content Cannot be empty")
	private String urgency;
	
	@NotNull
	private Boolean isDone;
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUrgency() {
		return urgency;
	}

	public void setUrgency(String urgency) {
		this.urgency = urgency;
	}
	
	public Boolean getIsDone() {
		return isDone;
	}
	
	public void setIsDone(Boolean isDone) {
		this.isDone = isDone;
	}
}
