import React, { useState, useEffect } from "react";
import { Button, Card, Checkbox, Select, Spin } from "antd";

const { Option } = Select;

const CategoryCardCreator = ({ categories,selectedCategories,setSelectedCategories, cards, setCards, usedCategories, setUsedCategories,isLoading }) => {
  
  useEffect(() => {
    // Initialize the list of used categories
    setUsedCategories([]);
  }, []);

  const updateAvailableCategories = () => {
    const selectedCategories = cards.map((card) => card.selectedCategory);
    const availableCategories = categories.filter(
      (category) => !usedCategories.includes(category.name) && !selectedCategories.includes(category.name)
    );
    return availableCategories;
  };


  const handleAddCard = () => {
    const availableCategories = updateAvailableCategories();

    if (availableCategories.length === 0) {
      return; // Disable adding new cards when all parent categories are selected
    }

    const newCard = {
      id: new Date().getTime(),
      selectedCategory: null,
      selectedSubcategories: [], // Initialize selected subcategories as an empty array
      subcategoryDetails: {}, // Store subcategory details
    };

    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (id) => {
    const deletedCard = cards.find((card) => card.id === id);
    if (deletedCard && deletedCard.selectedCategory) {
      // If the deleted card had a selected category, mark it as unused
      setUsedCategories(
        usedCategories.filter((category) => category !== deletedCard.selectedCategory)
      );
    }
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const handleCategoryChange = (id, value) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return {
          ...card,
          selectedCategory: value,
          selectedSubcategories: [],
          subcategoryDetails: {},
        };
      }
      return card;
    });

    setCards(updatedCards);
    setUsedCategories([...usedCategories, value]);
  };


  const handleSubcategoryChange = (id, subcategoryName) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        const selectedSubcategories = [...card.selectedSubcategories];
        if (selectedSubcategories.includes(subcategoryName)) {
          // If the subcategory is already selected, remove it
          selectedSubcategories.splice(selectedSubcategories.indexOf(subcategoryName), 1);
        } else {
          // Otherwise, add it
          selectedSubcategories.push(subcategoryName);
        }
  
        // Update subcategory details
        const subcategoryDetails = { ...card.subcategoryDetails };
        subcategoryDetails[subcategoryName] = selectedSubcategories.includes(subcategoryName);
  
        return { ...card, selectedSubcategories, subcategoryDetails };
      }
      return card;
    });
  
    setCards(updatedCards);
  
    // Update selectedCategories with the desired format
    const updatedSelectedCategories = updatedCards.map((card) => {
      const categoryObject = {
        name: card.selectedCategory,
        subcategories: [],
      };
  
      // Function to recursively add subcategories
      const addSubcategories = (subcategoryName, subcategoriesArray) => {
        const subcategory = {
          name: subcategoryName,
          subcategories: [],
        };
  
        const selectedSubcategories = card.selectedSubcategories.filter(
          (sub) => sub.startsWith(`${subcategoryName}-`)
        );
  
        for (const sub of selectedSubcategories) {
          const subsubcategoryName = sub.substring(subcategoryName.length + 1);
          addSubcategories(subsubcategoryName, subcategory.subcategories);
        }
  
        subcategoriesArray.push(subcategory);
      };
  
      card.selectedSubcategories.forEach((subcategoryName) => {
        if (!subcategoryName.includes('-')) {
          // If it's a top-level subcategory
          categoryObject.subcategories.push({
            name: subcategoryName,
            subcategories: [],
          });
        } else {
          // If it's a nested subcategory, recursively add it
          addSubcategories(subcategoryName, categoryObject.subcategories);
        }
      });
  
      return categoryObject;
    });
  
    setSelectedCategories(updatedSelectedCategories);
  };
  
  

  const renderSubcategoryDetails = (card) => {
    if (!card.selectedCategory || !card.subcategoryDetails) {
      return null;
    }

    const selectedCategory = categories.find((category) => category.name === card.selectedCategory);

    if (!selectedCategory || !selectedCategory.subcategories) {
      return null;
    }

    const selectedSubcategories = selectedCategory.subcategories.filter((subcategory) =>
      card.selectedSubcategories.includes(subcategory.name)
    );

    if (selectedSubcategories.length === 0) {
      return null; // No selected subcategories, return null
    }

    return (
      <div>
        {selectedSubcategories.map((selectedSubcategory) => (
          selectedSubcategory.subcategories && selectedSubcategory.subcategories.length > 0 && (
            <div key={selectedSubcategory.name} className="w-full p-2 borderd mt-10 border">
              <strong className="text-center w-full">{selectedSubcategory.name}</strong>
              <div className="flex p-4 w-full items-center space-x-6">
                {selectedSubcategory.subcategories?.map((subsubcategory) => (
                  <Checkbox
                    key={subsubcategory.name}
                    onChange={() => handleSubcategoryChange(card.id, subsubcategory.name)}
                    checked={card.selectedSubcategories.includes(subsubcategory.name)}
                  >
                    {subsubcategory.name}
                  </Checkbox>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    );
  };










  const renderSubcategories = (card) => {
    if (!card.selectedCategory) {
      return null;
    }

    const selectedCategory = categories.find((category) => category.name === card.selectedCategory);

    if (!selectedCategory || !selectedCategory.subcategories) {
      return null;
    }

    return (
      <div>
        {selectedCategory.subcategories.map((subcategory) => (
          <Checkbox
            key={subcategory.name}
            onChange={() => handleSubcategoryChange(card.id, subcategory.name)}
            checked={card.selectedSubcategories.includes(subcategory.name)}
            style={{ marginRight: 8 }}
          >
            {subcategory.name}
          </Checkbox>
        ))}
      </div>
    );
  };

  return (
    <Spin spinning={isLoading}>
      <div className="flex justify-end">
      <Button onClick={handleAddCard} disabled={updateAvailableCategories().length === 0}>
        Add New
      </Button>
      </div>
      {cards.map((card) => (
        <Card
          className="mt-5"
          key={card.id}
          title={
            card.selectedCategory
              ? `${card.selectedCategory}`
              : "Select Category"
          }

          extra={
            <div>
              <Button onClick={() => handleDeleteCard(card.id)} style={{ marginRight: 8 }}>
                Delete
              </Button>
              <Select
                placeholder="Select a Category"
                style={{ width: 200 }}
                onChange={(value) => handleCategoryChange(card.id, value)}
                value={card.selectedCategory}
              >
                {updateAvailableCategories().map((category) => (
                  <Option key={category.name} value={category.name}>
                    {category.name}
                  </Option>
                ))}
              </Select>
            </div>
          }
        >
          {renderSubcategories(card)}
          {renderSubcategoryDetails(card)}
        </Card>
      ))}
    </Spin>
  );
};

export default CategoryCardCreator;
