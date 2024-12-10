
CREATE TABLE Blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO Blogs (author, url, title, likes)
VALUES ('Creador', 'ulr1.com', 'Titulo', 10);

INSERT INTO Blogs (author, url, title, likes)
VALUES ('Creador', 'ulr2.com', 'Titulo1', 20);


SELECT * FROM Blogs;

DROP TABLE Blogs;

DROP TABLE IF EXISTS "Blogs";

DROP TABLE IF EXISTS "Users";

DROP TABLE IF EXISTS "user";

