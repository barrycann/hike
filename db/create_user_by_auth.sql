INSERT INTO users (username, authid, userimage)
VALUES ($1, $2, $3)
RETURNING *;