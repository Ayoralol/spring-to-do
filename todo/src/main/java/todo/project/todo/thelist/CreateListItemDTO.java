package todo.project.todo.thelist;

import jakarta.validation.constraints.NotBlank;

public class CreateListItemDTO {
	
	@NotBlank
	private String title;
	
	@NotBlank
	private String content;
	
	@NotBlank
	private String category;
	
	@NotBlank
	private String urgency;

	public String getTitle() {
		return title;
	}

	public String getContent() {
		return content;
	}

	public String getCategory() {
		return category;
	}

	public String getUrgency() {
		return urgency;
	}
	
	@Override
	public String toString() {
		return "CreateListItemDTO [title=" + title + ", content=" + content + ", category=" + category + ", status="
				+ urgency + "]";
	}
}
