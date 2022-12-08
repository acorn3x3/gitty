-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS github_users CASCADE;
DROP TABLE IF EXISTS posts CASCADE; 

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR,
  password_hash VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL
);


CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  login TEXT NOT NULL, 
  email TEXT,
  avatar TEXT
  );

  CREATE TABLE posts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
  user_id BIGINT,
  title VARCHAR,
  content VARCHAR,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id)
  );

 
    
  
  