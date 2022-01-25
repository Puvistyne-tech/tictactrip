-- INSERT Users
-- A small table to store users ( email, token ,wordcount)
-- every user is limited to 80000 words per day
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  _id SERIAL PRIMARY KEY,
  email VARCHAR(100),
  token VARCHAR,
  wordCount VARCHAR
);

INSERT INTO users (email, token, wordCount) VALUES ('one@one.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0eW5lQG9uZS5jb20iLCJpYXQiOjE2NDMxMzU3ODMsImV4cCI6MTY0MzIyMjE4M30.NGxFBVOk08el73zOMgw4TFvebxbT0uwAGUmdAIEACxU', '0');
INSERT INTO users (email, token, wordCount) VALUES ('two@two.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0eW5lemVAb25lLmNvbSIsImlhdCI6MTY0MzEzNjQ1NywiZXhwIjoxNjQzMjIyODU3fQ.mFdMzX_rqHFhbM3sHfLrbbeSAp0H2zkchN6bOODjaYQ', '100');


