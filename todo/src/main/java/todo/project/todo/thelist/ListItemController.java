package todo.project.todo.thelist;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import todo.project.todo.thelist.exceptions.NotFoundException;

@RestController
@RequestMapping("/items")
public class ListItemController {

  @Autowired
  private ListItemService listItemService;

  @PostMapping
  public ResponseEntity<ListItem> createPost(
    @Valid @RequestBody CreateListItemDTO data
  ) {
    ListItem createdItem = this.listItemService.createListItem(data);
    return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
  }

  @GetMapping
  public ResponseEntity<List<ListItem>> getAllItems() {
    List<ListItem> allItems = this.listItemService.getAll();
    return new ResponseEntity<>(allItems, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<ListItem> getItemById(@PathVariable Long id)
    throws NotFoundException {
    Optional<ListItem> maybeItem = this.listItemService.findById(id);
    ListItem foundItem = maybeItem.orElseThrow(() ->
      new NotFoundException(ListItem.class, id)
    );
    return new ResponseEntity<>(foundItem, HttpStatus.OK);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<ListItem> updateItemById(
    @Valid @RequestBody UpdateListItemDTO data,
    @PathVariable Long id
  ) throws NotFoundException {
    Optional<ListItem> maybeUpdateItem =
      this.listItemService.updateById(data, id);
    ListItem updateItem = maybeUpdateItem.orElseThrow(() ->
      new NotFoundException(ListItem.class, id)
    );
    return new ResponseEntity<>(updateItem, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<ListItem> deleteItemById(@PathVariable Long id)
    throws NotFoundException {
    boolean deleted = this.listItemService.deleteItemById(id);
    if (!deleted) {
      throw new NotFoundException(ListItem.class, id);
    }
    return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
  }
}
