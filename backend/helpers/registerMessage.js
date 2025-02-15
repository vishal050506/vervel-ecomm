/**
 * Generates a welcome email message for a new user.
 * @param {string} name - The recipient's name
 * @returns {string} - The HTML message content
 */
const generateWelcomeMessage = (name) => {
  return `
   <!DOCTYPE html>
<html>
<head>
    <title>Welcome to Rohit Rao E-commerce!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            text-align: center;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            display: inline-block;
            max-width: 500px;
        }
        h1 {
            color: #ff5a5f;
        }
        p {
            font-size: 16px;
            color: #333;
        }
        .button {
            display: inline-block;
            background-color: #ff5a5f;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 15px;
        }
        .social-icons {
            margin-top: 20px;
        }
        .social-icons a {
            display: inline-block;
            margin: 0 10px;
            text-decoration: none;
        }
        .social-icons img {
            width: 30px;
            height: 30px;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #ff5a5f;
            text-decoration: none;
        }
    </style>
</head>
<body>

    <div class="container">
        <h1>🎉Welcome to Rohit Rao E-commerce!🎉</h1>
        <p>Dear <b>${name}</b>,</p>
        <p>Exciting news! 🎊 You have successfully registered on our platform.</p>
        <p>We’re so excited to have you with us! Explore the latest fashion trends and amazing products just for you. 🛍️✨</p>
        
        <a href="https://rohitrao.com" class="button">Start Shopping 🛒</a>

        <div class="social-icons">
            <p>Stay connected with us:</p>
            <a href="mailto:labelrohitrao@gmail.com" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/281/281769.png" alt="Gmail">
            </a>
            <a href="https://www.instagram.com/labelrohitrao/?igsh=aXhkcmk0Ym43cnpj&utm_source=qr" target="_blank">
                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" alt="Instagram">
            </a>
        </div>

        <p class="footer">
            Need help? Contact us at 
            <a href="mailto:labelrohitrao@gmail.com">labelrohitrao@gmail.com</a> 💌
        </p>
    </div>

</body>
</html>
  `;
};

// Export the function for use in other modules
export { generateWelcomeMessage };
