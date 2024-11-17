
# Contact Management System

## Steps to Run the Project

1. Clone the Repository:
   ```bash
   git clone https://github.com/TanmayUdupa/contact-management
   cd contact-management
   ```

2. Run the following command to install the required Node.js modules:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```env
   MONGO_URI=your-mongodb-uri-here
   ```

4. Run the server:
   ```bash
   npm start
   ```
5. Navigate to the Client Directory:
   ```bash
   cd client
   ```

6. Run the following command to install the required Node.js modules:
   ```bash
   npm install
   ```

7. Run the following command to start the React development server:
   ```bash
   npm start
   ```

8. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Database Schema

```typescript
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const contactSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    minLength: [10, "no should have minimum 10 digits"],
    maxLength: [10, "no should have maximum 10 digits"],
    match: [/\d{10}/, "no should only have digits"]
  },
  company: String,
  jobTitle: String
});

const Contact = model('Contact', contactSchema);
export default Contact;
```

---

### Chosen Database: MongoDB
I selected MongoDB because I wanted to implement a MERN Stack application. It also provides good tools for CRUD operations.

The reason why it fits this project is that this project requires a and scalable database for storing and retrieving contact information efficiently. MongoDB’s document-oriented structure aligns well with this requirement. Contact management is an evolving data structure hence MongoDB's schema less nature is useful.

---

## Challenges

1. Handling MongoDB Validation Errors
   - **Challenge**: While setting up the database and backend, it was difficult for me to find out the errors thrown by mongoose.
   - **How I resolved**: Used `try-catch` blocks for detecting and handling the errors.

2. Setting up MongoDB Atlas and connecting to the MongoDB Database
   - **Challenge**: I had used MongoDB in my system but I wanted to try using MongoDB Atlas which I had no prior experience working with. It was initially difficult to connect to the database.
   - **Solution**: I signed up for MongoDB Atlas, created a cluster, and set up a database user. Then, I added the connection string in my .env file. I then realized I had to add the name of the database as well in the link. After which I was able to successfully connect.

3. Pagination and Sorting
    -  **Challenge**: I did not know how to implement pagination and sorting.
    -  **Solution**: Looked into Material-UI's docs and GFG from which I learnt how to use TableSortLabel and TablePagination.
