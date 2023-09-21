# FeedMe Tech Task

This project is a solution to the FeedMe technical task. It involves processing data from a mock proprietary feed service, transforming it into a structured JSON format, storing it in a MongoDB database, and displaying it on a web interface.

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
