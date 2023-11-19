package pokedex.pxt.mbo.pokedex.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.models.Item;

@Service
public class ItemService {

	private List<Item> allItems = new ArrayList<>(Arrays.asList(
			new Item("10001", "ネックレス", "ジュエリ"),
			new Item("10002", "パーカー", "ファッション"),
			new Item("10003", "フェイスクリーム", "ビューティ")));

	public List<Item> getAllItems() {
		return this.allItems;
	}

	public Item getItem(String itemId) {
		for (int i = 0; i < allItems.size(); i++) {
			if (allItems.get(i).getItemId().equals(itemId)) {
				return (Item)allItems.get(i);
			}
		}
		return null;
	}

	public void addItem(Item item) {
		allItems.add(item);
	}
}
