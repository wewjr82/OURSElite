function markAsRead(messageId) {
  fetch("/inbox/mark-read", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Update UI to reflect message marked as read
        // You can update the UI here without reloading the page
      } else {
        // Handle error
      }
    })
    .catch((error) => {
      console.error("Error marking message as read:", error);
    });
}

function deleteMessage(messageId) {
  fetch("/inbox/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messageId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Remove message from UI
        // You can update the UI here without reloading the page
      } else {
        // Handle error
      }
    })
    .catch((error) => {
      console.error("Error deleting message:", error);
    });
}
