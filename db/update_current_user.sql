UPDATE users
SET useremail = $2,
userbio = $3
WHERE userid = $1
RETURNING *;