
// src/components/FeedbackDialog.js
import React, { useEffect, useState } from 'react';

const FeedbackDialog = ({ food, onClose }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Close on Escape key for better UX
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = () => {
    // Handle form submission logic here
    // For CI: avoid console noise; uncomment for local debugging.
    // console.log('Submitted Feedback:', { food, rating, feedback });

    // TODO: If you plan to persist feedback, POST to your API here.
    // Example:
    // axios.post('http://127.0.0.1:5000/feedback', {
    //   food_name: food?.food_name,
    //   donor_phone: food?.donor_phone,
    //   rating,
    //   feedback,
    // });

    onClose?.(); // Close the dialog after submission
  };

  // Prevent submit when there is no rating and no feedback entered
  const isSubmitDisabled = rating <= 0 && feedback.trim() === '';

  // Handle overlay click to close
  const handleOverlayClick = (e) => {
    // Close when clicking outside the dialog-content
    if (e.target.classList.contains('dialog-overlay')) {
      onClose?.();
    }
  };

  // Defensive: handle missing food gracefully
  const foodName = food?.food_name || 'this item';

  return (
    <div
      className="dialog-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
      onClick={handleOverlayClick}
    >
      <div className="dialog-content" role="document">
        <h2 id="feedback-title">Feedback for {foodName}</h2>

        <div className="star-rating" aria-label="Star rating">
          {[...Array(5)].map((_, index) => {
            const starNumber = index + 1;
            const filled = rating >= starNumber;
            return (
              <button
                key={index}
                type="button"
                className={`star ${filled ? 'filled' : ''}`}
                aria-pressed={filled}
                aria-label={`Rate ${starNumber} star${starNumber > 1 ? 's' : ''}`}
                onClick={() => setRating(starNumber)}
              >
                ★
              </button>
            );
          })}
        </div>

        <label htmlFor="feedback-textarea" className="sr-only">
          Feedback
        </label>
        <textarea
          id="feedback-textarea"
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="dialog-actions">
          <button onClick={handleSubmit} disabled={isSubmitDisabled}>
            Submit
          </button>
          <button onClick={onClose}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDialog;
