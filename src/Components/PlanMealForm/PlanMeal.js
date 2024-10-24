import React, { useState, useEffect } from 'react';
import './PlanMeal.css';

const PlanMeal = () => {
  const [mealModalOpen, setMealModalOpen] = useState(false);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [hasChildren, setHasChildren] = useState(false);
  const [mealSearch, setMealSearch] = useState('');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [meals] = useState([
    { id: 1, name: 'Phở', price: 50000, calories: 600 },
    { id: 2, name: 'Cơm Tấm', price: 40000, calories: 700 },
    { id: 3, name: 'Bún Chả', price: 60000, calories: 500 }
  ]);

  // Calculate calories based on people and children counts
  const adultCalories = 667;
  const childCalories = 400;
  const totalCalories = (peopleCount - childrenCount) * adultCalories + childrenCount * childCalories;

  const handleMealSelection = (meal) => {
    setSelectedMeal(meal);
    setTotalCost(meal.price);
  };

  const handleSaveMeal = () => {
    const summaryContent = `
      Số người lớn: ${peopleCount - childrenCount}, Trẻ em: ${childrenCount},
      Món ăn: ${selectedMeal?.name || ''}, Tổng chi phí: ${totalCost} VNĐ
    `;
    if (currentMeal) {
      currentMeal.innerHTML = summaryContent;
    }
    setMealModalOpen(false);
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
          {/* Bữa sáng */}
          {['Bữa sáng', 'Bữa trưa', 'Bữa chiều'].map((mealTime) => (
            <tr key={mealTime}>
              <td>{mealTime}</td>
              {Array.from({ length: 7 }).map((_, dayIndex) => (
                <td key={dayIndex}>
                  <div className="meal-cell">
                    <button
                      className="open-modal-btn"
                      onClick={(e) => {
                        setMealModalOpen(true);
                        setCurrentMeal(e.target.closest('.meal-cell'));
                      }}
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

      {/* Meal Modal */}
      {mealModalOpen && (
        <div id="meal-modal" className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-btn" onClick={() => setMealModalOpen(false)}>&times;</span>
            <h2>Nhập thông tin cho bữa ăn</h2>

            <form id="meal-form">
              <label htmlFor="people-count">Số người ăn:</label>
              <div className="quantity-control">
                <button type="button" onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))}>-</button>
                <span>{peopleCount}</span>
                <button type="button" onClick={() => setPeopleCount(peopleCount + 1)}>+</button>
              </div>

              <label htmlFor="has-children">Có trẻ em?</label>
              <input
                type="checkbox"
                checked={hasChildren}
                onChange={() => setHasChildren(!hasChildren)}
              />
              {hasChildren && (
                <div className="quantity-control">
                  <button type="button" onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}>-</button>
                  <span>{childrenCount}</span>
                  <button type="button" onClick={() => setChildrenCount(Math.min(childrenCount + 1, peopleCount))}>+</button>
                </div>
              )}

              <label htmlFor="meal-search">Chọn món ăn:</label>
              <input
                type="text"
                id="meal-search"
                value={mealSearch}
                onChange={(e) => setMealSearch(e.target.value)}
                placeholder="Nhập tên món ăn"
              />
              <div id="meal-suggestions">
                {meals
                  .filter((meal) =>
                    meal.name.toLowerCase().includes(mealSearch.toLowerCase())
                  )
                  .map((meal) => (
                    <div key={meal.id} onClick={() => handleMealSelection(meal)}>
                      {meal.name} - {meal.calories} calo - Giá: {meal.price} VNĐ
                    </div>
                  ))}
              </div>

              {selectedMeal && (
                <div>
                  <p>Tên món: {selectedMeal.name}</p>
                  <p>Calo: {selectedMeal.calories}</p>
                  <p>Giá: {selectedMeal.price} VNĐ</p>
                </div>
              )}

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
