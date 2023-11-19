package pokedex.pxt.mbo.pokedex.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.models.Item;

@RestController
public class PokedexMainController {

	@RequestMapping("/items")
	public List<Item> getAllItems() {
		List<Item> allItems = new ArrayList<>();
		allItems.add(new Item("10001", "ネックレス", "ジュエリ"));
		return allItems;
	}
}
