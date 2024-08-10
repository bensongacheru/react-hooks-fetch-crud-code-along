// src/components/ShoppingList.js

import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Item from "./Item";
import Filter from "./Filter";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItemId) {
    setItems(items.filter(item => item.id !== deletedItemId));
  }

  const itemsToDisplay = items.filter((item) => 
    selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter category={selectedCategory} onCategoryChange={setSelectedCategory} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdateItem={handleUpdateItem} 
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
