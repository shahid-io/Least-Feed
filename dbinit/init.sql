CREATE DATABASE IF NOT EXISTS least_feed;
USE least_feed;
DROP TABLE IF EXISTS least_feed;
CREATE TABLE Users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(255) DEFAULT NULL,
    last_name VARCHAR(255) DEFAULT NULL,
    username VARCHAR(255) DEFAULT NULL,
    email VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    status VARCHAR(30) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
) AUTO_INCREMENT = 1;

DELIMITER // CREATE PROCEDURE create_and_return (
    IN first_name VARCHAR(255),
    IN last_name VARCHAR(255),
    IN username VARCHAR(255),
    IN email VARCHAR(255),
    IN password VARCHAR(255),
) BEGIN
INSERT INTO users (
        first_name,
        last_name,
        username,
        email,
        password
    )
VALUES (first_name, last_name, username, email, password);
SET @USER_ID = LAST_INSERT_ID();
SELECT *
FROM users
WHERE id = @USER_ID;
END // DELIMITER;


CREATE TABLE Feed (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    author VARCHAR(255) DEFAULT NULL,
    meta_title VARCHAR(255) DEFAULT NULL,
    meta_desc VARCHAR(255) DEFAULT NULL,
    title VARCHAR(255) DEFAULT NULL,
    description VARCHAR(255) DEFAULT NULL,
    status VARCHAR(30) DEFAULT 1,
    image_url VARCHAR(255) created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
) AUTO_INCREMENT = 1;
