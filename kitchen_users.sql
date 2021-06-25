-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: kitchen
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `password` varchar(400) NOT NULL,
  `subscription` varchar(600) NOT NULL,
  `address` varchar(400) NOT NULL,
  `postal` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'tanvir','$2b$10$1BcpVW5G8XBU.dRYkwI3PuHFxK0eUoMOo.urh.MdmG7cP4b.BwPuy','.\n\nMexican Kitchen \nbigMeal \n$40\n\nMexican Kitchen \nbigMeal \n$40\n\nMexican Kitchen \nnourishing \n$25\nMexican Kitchen \nbigMeal\n$16.00\nMexican Kitchen \nnourishing\n$25\nArabic Kitchen \nnourishing\n$30\nItalian Kitchen \nbigMeal\n$25\nPancake lovers \nbigMeal\n$20\nIndian Kitchen \nsnackbites\n$25\nMexican Kitchen \nsnackBites\n$20\nArabic Kitchen \nbigMeal\n$30\nItalian Kitchen \nnourishing\n$20\nItalian Kitchen \nbigMeal\n$25\nItalian Kitchen \nnourishing\n$20\nArabic Kitchen \nsnackbites\n$25\nArabic Kitchen \nbigMeal\n$30\nItalian Kitchen \nsnackbites\n$25\nArabic Kitchen \nnourishing\n$30','395 Cook Road','M3J3T4'),(2,'jimmy','$2b$10$uwv5pIplDTHjnbfLcvGgd.93D.xmB..bHY1KfxGSgooySD2b2t/Oq','.\nMexican Kitchen \nnourishing\n$25\nMexican Kitchen \nbigMeal\n$40\nMexican Kitchen \nsnackBites\n$30\nPancake lovers \nbigMeal\n$20\nArabic Kitchen \nnourishing\n$30\nItalian Kitchen \nnourishing\n$20','500 Murray Ross','M3J3T4'),(3,'manjit','$2b$10$tL5q8.8.h.udH2/Rtx5nZuLlcHZi1Dj.7D0wynGs75AIeb7lqRiVq','.\nMexican Kitchen \nbigMeal\n$40\nMexican Kitchen \nbigMeal\n$16.00','32 Maverick Crescent','L6R3E6'),(4,'sakshi','$2b$10$gZn8IRPPAa8mika7EhKObe730EGdwvkwOQoZ0B.WX.SiaDOq2rxZK','.','2 Suzy street','M3J3T4'),(5,'nfiwie','$2b$10$d5lCPaUgIGSbuStTOqQciug67jOvNf.nzeG/FY33NdX9dZ2lBHg/K','.','',''),(6,'Sam','$2b$10$UmLS.6aj0uE.vgL0DYjIDO0WEN7Gbla.CTjGtGwOZRsSWPDtv4/m6','.\nMexican Kitchen \nnourishing\n$25','32 Maverick Crescent','L6R3E6');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-25 19:57:40
