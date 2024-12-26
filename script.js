(() => {
  const storageKey = 'countdownDeadline'; // Key for storing the deadline in localStorage

  // Function to calculate a new deadline date (15 days from now)
  const calculateNewDeadline = () => {
    const now = new Date();
    now.setDate(now.getDate() + 15); // Add 15 days
    return now.getTime();
  };

  // Function to initialize the countdown
  const initializeCountdown = (deadlineDate) => {
    const countdownDays = document.querySelector('.countdown__days .number');
    const countdownHours = document.querySelector('.countdown__hours .number');
    const countdownMinutes = document.querySelector('.countdown__minutes .number');
    const countdownSeconds = document.querySelector('.countdown__seconds .number');

    // Update the countdown every second
    const timerInterval = setInterval(() => {
      const currentDate = new Date().getTime();
      const distance = deadlineDate - currentDate;

      if (distance < 0) {
        // If the deadline has passed, clear the interval and reset the countdown
        clearInterval(timerInterval);
        const newDeadline = calculateNewDeadline();
        localStorage.setItem(storageKey, newDeadline); // Save the new deadline
        initializeCountdown(newDeadline);
        return;
      }

      // Calculate remaining time
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the countdown display
      countdownDays.innerHTML = days;
      countdownHours.innerHTML = hours;
      countdownMinutes.innerHTML = minutes;
      countdownSeconds.innerHTML = seconds;
    }, 1000);
  };

  // Retrieve the deadline from localStorage or calculate a new one
  let deadlineDate = localStorage.getItem(storageKey);
  if (!deadlineDate || new Date().getTime() > parseInt(deadlineDate, 10)) {
    // If no deadline is stored or it has passed, calculate a new one
    deadlineDate = calculateNewDeadline();
    localStorage.setItem(storageKey, deadlineDate); // Save the new deadline
  }

  // Initialize the countdown with the retrieved or newly calculated deadline
  initializeCountdown(parseInt(deadlineDate, 10));
})();
