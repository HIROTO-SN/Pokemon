package pokedex.pxt.mbo.pokedex.controllers.test;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.entity.test.Item;
import pokedex.pxt.mbo.pokedex.services.test.ItemService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ItemController {
	
	@Autowired
	private ItemService itemService;

	@GetMapping("/items")
	public List<Item> getAllItems() {
		return itemService.getAllItems();
	}

	@GetMapping("/items/{itemId}")
	public Item getItem(@PathVariable("itemId") String itemId){
		return itemService.getItem(itemId);
	}

	@PostMapping("/items")
	public void addItem(@RequestBody Item item) {
		itemService.addItem(item);
	}

	@PutMapping("/items/{itemId}")
	public void updateItem(@RequestBody Item item, @PathVariable("itemId") String itemId) {
		itemService.updateItem(itemId, item);
	}

	@DeleteMapping("/items/{itemId}")
	public void deleteItem(@PathVariable("itemId") String itemId) {
		itemService.deleteItem(itemId);
	}


}
