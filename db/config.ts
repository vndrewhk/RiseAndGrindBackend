const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = {
  url: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.phiq9rb.mongodb.net/riseandgrind?retryWrites=true&w=majority
  `,
};
