package todo.project.todo.thelist;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "list_items")
public class ListItem {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column
  private String title;

  @Column
  private Date createdAt;

  @Column
  private String content;

  @Column
  private String category;

  @Column
  private String urgency;

  @Column
  private boolean isDone;

  public ListItem() {
    super();
  }

  public int getId() {
    return this.id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public Date getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Date createdAt) {
    this.createdAt = createdAt;
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
