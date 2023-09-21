# FeedMe Tech Task

This project is a solution to the FeedMe technical task. It involves processing data from a mock proprietary feed service, transforming it into a structured JSON format, storing it in a MongoDB database, and displaying it on a web interface.

## Technology Choices

In the development of this project, several critical technology choices were made:

1. **Node.js with Express**:
    - Given the need to handle real-time data feeds and serve a web front-end, Node.js provides an efficient, scalable, and modern platform. Express simplifies the creation of the web server and API.

2. **MongoDB**:
    - A NoSQL database was a natural choice due to the flexible nature of the feed's data. MongoDB allows for quick writes and has a flexible schema to accommodate any unexpected data changes.

3. **RabbitMQ**:
    - When processing real-time data feeds, especially in scenarios where we might experience bursts of data, having a buffer like RabbitMQ allows us to decouple the data reception from the data processing. This ensures that no data is lost, even if processing temporarily falls behind the rate of data reception.

4. **Docker & Docker-Compose**:
    - Docker allows us to package our application with all its dependencies, ensuring consistency across all environments. Docker-Compose further simplifies the setup by allowing us to define and run multi-container applications, making it easier to manage services like MongoDB and RabbitMQ.

5. **Native JavaScript for Frontend**:
    - While libraries and frameworks like React or Vue might offer more advanced features, for the scope of this project, plain JavaScript was sufficient to fetch and display the data. It also ensures fewer dependencies and a faster loading time.

6. **Jest for Testing**:
    - Jest provides a comprehensive testing solution. Its easy setup, rich matchers, and clean syntax make writing tests straightforward.

7. **Cors**:
    - Due to potential cross-origin restrictions in modern browsers, the `cors` middleware for Express ensures that our frontend can successfully fetch data from our backend API without encountering CORS policy issues.

These choices were made with scalability, maintainability, and performance in mind, ensuring that the solution is not only functional but also efficient and robust.


## Project Structure

```plaintext
/feedme-tech-test
|-- /public                - Frontend static files
|   |-- index.html         - Main frontend display
|
|-- /src
|   |-- /db                - Database related files
|   |   |-- database.js    - MongoDB connection and operations
|   |
|   |-- /tcp               - TCP client for data feed
|   |   |-- tcpClient.js   - Connects and receives data from the feed service
|   |
|   |-- /queue             - RabbitMQ related files
|   |   |-- queueConsumer.js - Consumes messages from the queue and writes to DB
|   |
|   |-- /transform        - Data transformation logic
|   |   |-- transform.js   - Transforms pipe-delimited data to JSON
|   |
|   |-- server.js         - Express server for frontend and API
|
|-- /tests                - Test files
|   |-- database.test.js  - Tests for database operations
|   |-- transform.test.js - Tests for data transformation
|
|-- docker-compose.yml    - Docker configuration for dependencies
|-- package.json          - Project dependencies and scripts
```

## Setup and Installation

1. **Dependencies**:
   - Ensure you have Node.js installed.
   - Install RabbitMQ and MongoDB or use the provided `docker-compose.yml` to set them up.

2. **Installation**:
   ```bash
   # Clone the repository
   git clone <https://github.com/OkeyEzeobele/feedme-tech-test>

   # Navigate to the project directory
   cd feedme-tech-test

   # Install dependencies
   npm install
   ```

3. **Running with Docker**:
   ```bash
   docker-compose up
   ```

4. **Start the Services**:
   ```bash
   npm start
   ```

## Usage

Once all services are up:
- Navigate to `http://localhost:3000` to view the frontend display of the processed data.
- The TCP client will connect to the mock feed service and receive data.
- Data will be transformed, sent to RabbitMQ, and then consumed and saved to MongoDB.
- The frontend fetches data from the Express server API endpoint and displays it.

## Testing

To run the tests:
```bash
npm test
```

## Contributing

For any improvements or issues, please create a new issue or submit a pull request.

## License

This project is open-source, under the MIT License.
