const generateOrderPlacedMessage = (name) => {
  return `
    <h2>Thank You, ${name}! 🎉</h2>
    <p>Your order has been successfully placed. We will update you once it's shipped.</p>
  `;
};

const generateShippedMessage = (name) => {
  return `
    <h2>Great News, ${name}! 🚚</h2>
    <p>Your order has been shipped. It will be delivered soon.</p>
  `;
};

export { generateOrderPlacedMessage, generateShippedMessage };
