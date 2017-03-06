SELECT name, nickname, summary, mileslong, elevationgain, difficulty, rating, latitude, longitude, feature, hikephoto FROM hikes
WHERE mileslong > $1
AND mileslong < $2
AND feature like $3;