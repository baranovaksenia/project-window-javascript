const modals = () => {
	// Binds a modal window to a specific trigger
	function bindModal(triggerSelector, modalSelector, closeSelector) {
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelector(closeSelector);

		// Add event listeners to each trigger element
		trigger.forEach((item) => {
			item.addEventListener('click', (e) => {
				// Check if the clicked element is a link and prevent browser reload
				if (e.target) {
					e.preventDefault();
				}
				// Show the modal window and hide the page scroll
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden';
			});
		});

		close.addEventListener('click', () => {
			// Hide the modal window and restore the page scroll
			modal.style.display = 'none';
			document.body.style.overflow = '';
			// Remove Bootstrap class (if applicable)
			// document.body.classList.remove('modal-open')
		});

		// Close the modal window when clicking on the overlay
		modal.addEventListener('click', (event) => {
			// Check if the clicked element is the modal window itself
			// When clicking inside the modal window, e.target refers to other elements
			if (event.target === modal) {
				// Hide the modal window and restore the page scroll
				modal.style.display = 'none';
				document.body.style.overflow = '';
			}
		});
	}

	// Show modal if the user has been on the page for more than a certain time (in milliseconds)
	function showModalByTime(selector, time) {
		setTimeout(function () {
			// Show the modal window and hide the page scroll after the specified time
			document.querySelector(selector).style.display = 'block';
			document.body.style.overflow = 'hidden';
		}, time);
	}

	// Bind modal windows to specific triggers
	bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
	bindModal('.phone_link', '.popup', '.popup .popup_close');

	// Show the modal window after 60 seconds on the page
	showModalByTime('.popup', 60000);
};

export default modals;
