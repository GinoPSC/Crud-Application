CREATE TABLE IF NOT EXISTS `movie_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `movieName` varchar(200) NOT NULL,
  `movieReview` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
