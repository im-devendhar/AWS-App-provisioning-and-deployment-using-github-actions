
// src/components/FoodTable.js
import React, { useState } from 'react';
import FeedbackDialog from './FeedBackDialog';

const FoodTable = ({ foodList, isRecipient }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  /**
   * Normalize the incoming prop:
   * - If App.js uses setJson(response.data), then foodList is the plain payload.
   * - If App.js uses setJson(response), then the payload is under foodList.data.
   * This helper ensures we always get the array safely.
   */
  const items =
    Array.isArray(foodList?.food_list)
      ? foodList.food_list // case: setJson(response.data)
      : Array.isArray(foodList?.data?.food_list)
      ? foodList.data.food_list // case: setJson(response)
      : [];

  const handleFeedbackOpen = (food) => {
    setSelectedFood(food);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFood(null);
  };

  return (
    <>
      <table className="food-table">
        <thead>
          <tr>
            <th>Phone</th>
            <th>Food Location</th>
            <th>Food Name</th>
            {!isRecipient && <th>Feedback</th>}
          </tr>
        </thead>
        <tbody>
          {/* For local debugging only; comment out in CI to avoid noise */}
          {/* {console.log('foodList', items)} */}

          {items.length === 0 ? (
            <tr>
              <td colSpan={isRecipient ? 3 : 4} style={{ textAlign: 'center' }}>
                No records found.
              </td>
            </tr>
          ) : (
            items.map((food, index) => (
              <tr key={index}>
                {/* Show appropriate phone column based on user type */}
                {isRecipient ? (
                  <td>{food.recipient_phone}</td>
                ) : (
                  <td>{food.donor_phone}</td>
                )}
                <td>{food.food_location}</td>
                <td>{food.food_name}</td>

                {!isRecipient && (
                  <td>
                    <button onClick={() => handleFeedbackOpen(food)}>Feedback</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {openDialog && <FeedbackDialog food={selectedFood} onClose={handleCloseDialog} />}
    </>
  );
};

export default FoodTable;
