SELECT reviews.reviewtitle, reviews.reviewtext, reviews.reviewrating, reviews.reviewtime, users.username, users.userimage FROM reviews
join users on reviews.userid = users.userid
WHERE reviews.hikeid = $1;