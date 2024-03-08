package todo.project.todo.thelist;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class ListItemService {
	
	@Autowired
	private ListItemRepository repo;
	
	@Autowired
	private ModelMapper mapper;

	public ListItem createListItem(CreateListItemDTO data) {
		
		ListItem newItem = mapper.map(data,  ListItem.class);
		newItem.setCreatedAt(new Date());
		return this.repo.save(newItem);
	}

	public List<ListItem> getAll() {
		return this.repo.findAll();
	}

	public Optional<ListItem> findById(Long id) {
		return this.repo.findById(id);
	}

	public Optional<ListItem> updateById(@Valid UpdateListItemDTO data, Long id) {
		Optional<ListItem> maybeItem = this.findById(id);
		if (maybeItem.isEmpty()) {
			return maybeItem;
		}
		
		ListItem foundItem = maybeItem.get();
		
		mapper.map(data, foundItem);
		
		ListItem updated = this.repo.save(foundItem);
		return Optional.of(updated);
	}

	public boolean deleteItemById(Long id) {
		Optional<ListItem> maybeItem = this.repo.findById(id);
		if(maybeItem.isEmpty()) {
			return false;
		}
		this.repo.delete(maybeItem.get());
		return true;
	}
}
