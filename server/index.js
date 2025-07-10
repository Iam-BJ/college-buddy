import dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});