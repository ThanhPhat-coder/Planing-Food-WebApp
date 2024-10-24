import React, { useState } from 'react';
import './PlanMeal.css';

const PlanMeal = () => {
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [hasChildren, setHasChildren] = useState(false);
  const [mealSearches, setMealSearches] = useState(['']);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [showWarning, setShowWarning] = useState(false); // Biến kiểm tra việc nhắc nhở người dùng
  const [meals] = useState([
    {
      id: 1,
      name: 'Phở',
      price: 50000,
      calories: 600,
      ingredients: [
        { id: 1, name: 'Bánh phở', gram: 200 },
        { id: 2, name: 'Thịt bò', gram: 100 },
        { id: 3, name: 'Hành lá', gram: 50 }
      ]
    },
    {
      id: 2,
      name: 'Cơm Tấm',
      price: 40000,
      calories: 700,
      ingredients: [
        { id: 4, name: 'Cơm', gram: 300 },
        { id: 5, name: 'Sườn heo', gram: 150 },
        { id: 6, name: 'Dưa chua', gram: 50 }
      ]
    },
    {
      id: 3,
      name: 'Bún Chả',
      price: 60000,
      calories: 500,
      ingredients: [
        { id: 7, name: 'Bún', gram: 200 },
        { id: 8, name: 'Thịt lợn nướng', gram: 100 },
        { id: 9, name: 'Rau sống', gram: 50 }
      ]
    }
  ]);

  const adultCalories = 667;
  const childCalories = 400;
  const totalCalories = (peopleCount - childrenCount) * adultCalories + childrenCount * childCalories;

  const handleMealSelection = (meal, index) => {
    const updatedMeals = [...selectedMeals];
    updatedMeals[index] = { ...meal, quantity: updatedMeals[index]?.quantity || 1 };
    setSelectedMeals(updatedMeals);

    const updatedSearches = [...mealSearches];
    updatedSearches[index] = meal.name;  // Cập nhật ô tìm kiếm với tên món ăn
    setMealSearches(updatedSearches);

    updateTotalCost(updatedMeals);
  };

  const updateTotalCost = (meals) => {
    const cost = meals
      .filter(meal => meal !== null) // Kiểm tra món ăn không phải là null
      .reduce((total, meal) => total + meal.price * meal.quantity, 0);
    setTotalCost(cost);
  };

  const increaseQuantity = (index) => {
    const updatedMeals = [...selectedMeals];
    updatedMeals[index].quantity += 1;
    setSelectedMeals(updatedMeals);
    updateTotalCost(updatedMeals);
  };

  const decreaseQuantity = (index) => {
    const updatedMeals = [...selectedMeals];
    if (updatedMeals[index].quantity > 1) {
      updatedMeals[index].quantity -= 1;
      setSelectedMeals(updatedMeals);
      updateTotalCost(updatedMeals);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedMeals = [...selectedMeals];
    updatedMeals[index].quantity = newQuantity > 0 ? newQuantity : 1;
    setSelectedMeals(updatedMeals);
    updateTotalCost(updatedMeals);
  };

  const addNewMeal = () => {
    setSelectedMeals([...selectedMeals, null]);
    setMealSearches([...mealSearches, '']);
  };

  const handleSaveMeal = () => {
    if (selectedMeals.every((meal) => meal === null)) {
      // Nếu chưa chọn món nào, hiển thị thông báo
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    if (selectedMeals.length > 0) {
      const summaryContent = `
        Số người lớn: ${peopleCount - childrenCount}, Trẻ em: ${childrenCount},
        Món ăn: ${selectedMeals.map(meal => meal?.name).join(', ')}, Tổng chi phí: ${totalCost} VNĐ
      `;
      const ingredientsContent = selectedMeals.map(meal => `
        <h4>${meal.name} (x${meal.quantity})</h4>
        <ul class="ingredient-list">
          ${meal.ingredients.map(ingredient => `
            <li>${ingredient.name} - ${ingredient.gram * meal.quantity} gram</li>
          `).join('')}
        </ul>
      `).join('');

      if (currentMeal) {
        currentMeal.innerHTML = `
          ${summaryContent}
          <h4>Nguyên liệu cần mua:</h4>
          ${ingredientsContent}
        `;

        const resetButton = document.createElement('button');
        resetButton.innerHTML = 'x';
        resetButton.className = 'reset-btn';
        resetButton.onclick = () => {
          currentMeal.innerHTML = '<button class="open-modal-btn">Thêm</button>';
          currentMeal.querySelector('button').onclick = openModalForNewMeal;
        };
        currentMeal.appendChild(resetButton);
      }
    }
    setMealModalOpen(false);
  };

  const openModalForNewMeal = (e) => {
    setPeopleCount(1);
    setChildrenCount(0);
    setHasChildren(false);
    setMealSearches(['']);
    setSelectedMeals([null]);
    setTotalCost(0);
    setCurrentMeal(e.target.closest('.meal-cell'));
    setMealModalOpen(true);
  };

  const handleChildrenCountChange = (newChildrenCount) => {
    if (newChildrenCount <= peopleCount) {
      setChildrenCount(newChildrenCount);
    }
  };

  return (
    <div className='main'>
      <h1>Lịch ăn uống trong tuần</h1>

      <div className="date-range">
        <label htmlFor="start-date">Từ ngày:</label>
        <input type="date" id="start-date" />

        <label htmlFor="end-date">Đến ngày:</label>
        <input type="date" id="end-date" />
      </div>

      <table id="meal-plan">
        <thead>
          <tr>
            <th>Bữa / Ngày</th>
            <th>Thứ Hai</th>
            <th>Thứ Ba</th>
            <th>Thứ Tư</th>
            <th>Thứ Năm</th>
            <th>Thứ Sáu</th>
            <th>Thứ Bảy</th>
            <th>Chủ Nhật</th>
          </tr>
        </thead>
        <tbody>
          {['Bữa sáng', 'Bữa trưa', 'Bữa chiều'].map((mealTime) => (
            <tr key={mealTime}>
              <td>{mealTime}</td>
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <td key={dayIndex}>
                  <div className="meal-cell">
                    <button
                      className="open-modal-btn"
                      onClick={openModalForNewMeal}
                    >
                      Thêm
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {mealModalOpen && (
        <div id="meal-modal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
            <span className="close-btn" onClick={() => setMealModalOpen(false)}>&times;</span>
            <h2>Nhập thông tin cho bữa ăn</h2>

            <form id="meal-form">
              <label htmlFor="people-count">Số người ăn:</label>
              <div className="quantity-control">
                <button type="button" onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}>-</button>
                <input
                  type="number"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value, 10)))}
                  min="1"
                />
                <button type="button" onClick={() => setPeopleCount(peopleCount + 1)}>+</button>
              </div>

              <label htmlFor="has-children">
                <input
                  type="checkbox"
                  id="has-children"
                  checked={hasChildren}
                  onChange={() => setHasChildren(!hasChildren)}
                />
                Có trẻ em?
              </label>

              {hasChildren && (
                <div className="children-count">
                  <label htmlFor="children-count">Số lượng trẻ em:</label>
                  <div className="quantity-control">
                    <button
                      type="button"
                      onClick={() => handleChildrenCountChange(Math.max(0, childrenCount - 1))}
                    >-</button>
                    <input
                      type="number"
                      value={childrenCount}
                      onChange={(e) => handleChildrenCountChange(Math.max(0, parseInt(e.target.value, 10)))}
                      min="0"
                    />
                    <button
                      type="button"
                      onClick={() => handleChildrenCountChange(childrenCount + 1)}
                    >+</button>
                  </div>
                </div>
              )}

              {mealSearches.map((search, index) => (
                <div key={index} className="meal-selection">
                  <input
                    type="text"
                    value={mealSearches[index]}
                    onChange={(e) => {
                      const newSearches = [...mealSearches];
                      newSearches[index] = e.target.value;
                      setMealSearches(newSearches);
                    }}
                    placeholder="Nhập tên món ăn"
                  />
                  <div id="meal-suggestions">
                    {meals
                      .filter((meal) =>
                        meal.name.toLowerCase().includes(mealSearches[index].toLowerCase())
                      )
                      .map((meal) => (
                        <div key={meal.id} onClick={() => handleMealSelection(meal, index)}>
                          {meal.name} - {meal.calories} cal - {meal.price}đ
                        </div>
                      ))}
                  </div>

                  {selectedMeals[index] && (
                    <div>
                      <h4>Nguyên liệu:</h4>
                      <ul className="ingredient-list">
                        {selectedMeals[index].ingredients.map(ingredient => (
                          <li key={ingredient.id}>
                            {ingredient.name} - {ingredient.gram * selectedMeals[index].quantity} gram
                          </li>
                        ))}
                      </ul>
                      <div className="quantity-control">
                        <button type="button" onClick={() => decreaseQuantity(index)}>-</button>
                        <input
                          type="number"
                          value={selectedMeals[index].quantity}
                          onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
                          min="1"
                        />
                        <button type="button" onClick={() => increaseQuantity(index)}>+</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {showWarning && (
                <p className="warning-message" style={{ backgroundColor: 'lightcoral', padding: '10px' }}>
                  Bạn cần chọn ít nhất một món ăn trước khi lưu!
                </p>
              )}

              <button type="button" onClick={addNewMeal}>+ Thêm món ăn</button>

              <p>Tổng calo cần cho bữa ăn: {totalCalories}</p>
              <button type="button" onClick={handleSaveMeal}>Lưu</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanMeal;
