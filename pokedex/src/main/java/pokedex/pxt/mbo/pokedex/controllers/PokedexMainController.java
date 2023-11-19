package pokedex.pxt.mbo.pokedex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.models.Item;
import pokedex.pxt.mbo.pokedex.services.ItemService;

@RestController
public class PokedexMainController {
	
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


}
