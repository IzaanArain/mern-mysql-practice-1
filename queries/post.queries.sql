
CREATE TABLE posts(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY UNIQUE,
title VARCHAR(100) NOT NULL,
body TEXT,
createdAt DATE NOT NULL
);



