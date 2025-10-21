CREATE DATABASE  IF NOT EXISTS `merceariagemeos` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `merceariagemeos`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: merceariagemeos
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `Id_Adm` int NOT NULL AUTO_INCREMENT,
  `Login` varchar(100) NOT NULL,
  `Senha` varchar(100) NOT NULL,
  `Refresh_Jwt_Key` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id_Adm`),
  UNIQUE KEY `Login` (`Login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'admin','$2b$10$8PQhFyrw7AZq6rJy59rjaeiUAQZzeEGOLfMjQmahT0naEQQAUrRNm','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9BZG0iOjEsIkxvZ2luIjoiYWRtaW4iLCJpYXQiOjE2NTYwMDM5MDcsImV4cCI6MTY1NjE3NjcwN30.5NdVsQZU-332h8wl4c-iRZ2g31N9NqxH4tA0L1e1awM');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `Id_Banner` int NOT NULL AUTO_INCREMENT,
  `Nome` varchar(30) NOT NULL,
  `Descricao` varchar(50) NOT NULL,
  `Link_Banner_Imagem` varchar(150) NOT NULL,
  `Status_Banner` int NOT NULL,
  PRIMARY KEY (`Id_Banner`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES (1,'Salgadinhos e Chocolates','salgadinhos e chocolates','https://i.ibb.co/7b43pqb/banner2.jpg',0),(2,'Unilever','Unilever','https://i.ibb.co/tHsj0dj/banner9.jpg',1),(3,'frios Embalados','frios Embalados','https://i.ibb.co/F0Kqpjm/banner1.jpg',0),(16,'35% off Sadia','Promoção nos frangos Sadia','https://i.imgur.com/fQxvcNC.png',1),(17,'Cervejas 35%OFF','Cervejas Com  Denconto de 35%','https://i.imgur.com/eMcDBDX.png',1),(18,'Pizzas Com Frete Grátis','Pizzas Sem Frete','https://i.imgur.com/jYyRszU.png',0),(19,'Leve 4 page 3 Ambev','promoção ambev','https://i.imgur.com/Z0VRSwT.png',1),(20,'Nestle Sem Frete','Frete Grátis nos Produtos Nestle','https://i.imgur.com/OTnRNGl.png',0),(21,'Refrigerantes  sem Frete','Refrigerantes  Ambev sem frete','https://i.imgur.com/Nk9a3SJ.png',0);
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `Id_Categoria` int NOT NULL AUTO_INCREMENT,
  `Nome_Categoria` varchar(20) NOT NULL,
  `Em_Destaque` int NOT NULL,
  `Status_Categoria` int NOT NULL,
  PRIMARY KEY (`Id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Nenhuma',0,0),(2,'Doce',1,1),(3,'Salgados',1,1),(4,'Bebidas',1,1),(5,'Veganos',0,1),(6,'Grãos',1,1),(7,'Padaria',1,1),(8,'Carnes',0,1),(9,'Higiene',0,1),(10,'Limpeza',0,1),(11,'Frutas',0,1),(12,'Massas',0,1),(13,'Condimentos',1,1);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `Id_Cli` int NOT NULL AUTO_INCREMENT,
  `Cpf_Cli` varchar(14) NOT NULL,
  `Nome` varchar(30) NOT NULL,
  `Sobrenome` varchar(30) NOT NULL,
  `Endereco` varchar(50) DEFAULT NULL,
  `Bairro` varchar(50) NOT NULL,
  `Cidade` varchar(30) NOT NULL,
  `CEP` varchar(9) NOT NULL,
  `UF` char(2) NOT NULL,
  `Celular` varchar(14) NOT NULL,
  `Email` varchar(40) NOT NULL,
  `Senha` varchar(100) NOT NULL,
  `Refresh_Jwt_Key` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id_Cli`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'123.123.123-12','Vitor','Oliveira','Rua Oliveira 12','Paulistano','São Paulo','12345-123','SP','(11)31231-2123','vitor@gmail.com','$2b$10$5Vy1frF2uo9nYx9q/V3vKOS7pzlc2TldrNmrbAGHeVB3on/l4VPw6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjEsIkVtYWlsIjoidml0b3JAZ21haWwuY29tIiwiaWF0IjoxNjU1NDk5NTA4LCJleHAiOjE2NTU2NzIzMDh9.V2sl6S8cwOlC2bVBc6hnPR6xI7F4WaqiJ2AT7HRxyRI'),(2,'111.222.332-22','Gabriel','Carlos','Rua das Pedras 12','Paulistano','São Paulo','2201-2121','SP','(11)92341-7654','gabriel@gmail.com','$2b$10$za1maGIDNmGYxUDo6L3Vc.fbiEyDLauIe3ChMSXzprZ3tm48Z9hP6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjIsIkVtYWlsIjoiZ2FicmllbEBnbWFpbC5jb20iLCJpYXQiOjE2NTUzMzM1MTcsImV4cCI6MTY1NTUwNjMxN30.w6JGoCxhbZ7dCvsZx1avbi3DWZK1rx-yW4_XIKmB9Es'),(3,'222.456.123-98','Igor','Gabriel','Rua Dos Coqueiros 11','Paulistano','São Paulo','2296-4545','SP','(11)95467-1234','Igor@gmail.com','$2b$10$O5EL.b0yNhK0JwL1IFGAj.duG2PfxJOR1OfGykAVI5JiXtrO6ndKO','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjMsIkVtYWlsIjoiSWdvckBnbWFpbC5jb20iLCJpYXQiOjE2NTUzMzU2NTMsImV4cCI6MTY1NTUwODQ1M30.Wk9bKv3AJbTZEBTaIsgVGNRsCVUxDAYjMQBHPoJgT9k'),(4,'456.223.907-76','Mark','Spector','Rua Dos Triangulos','Brasilandia','São Paulo','02268-453','SP','(11)95642-3456','mark@gmail.com','$2b$10$9qPr65UM.kN0xvTs3TfRkOeAuZelCv/b6mEbTqzSOnskdq/nc1IZe','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjQsIkVtYWlsIjoibWFya0BnbWFpbC5jb20iLCJpYXQiOjE2NTU3NDI5NDEsImV4cCI6MTY1NTkxNTc0MX0.zZ6FPUkt-cs2uSIuqrMXT6zA_EBy2wLECjSBe673iCE'),(5,'231.244.563-23','Steven','Grant','Rua Andrade, 23','Osasco','São Paulo','45123-151','SP','(11)95642-3423','steven@gmail.com','$2b$10$Jif/nCHe0yCHkuUFa..9y.2EZy5c/vi50isHSnvEmK14UFSiXDGVu','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjUsIkVtYWlsIjoic3RldmVuQGdtYWlsLmNvbSIsImlhdCI6MTY1NTc0MzUxNiwiZXhwIjoxNjU1OTE2MzE2fQ.8ecchAgzAgvwlGhxwHEMyiuD8in3k6R0l904xb3YZR8'),(6,'321.656.742-34','Felipe','Oliveira','Rua Camargo, 3','Terezinha','São Paulo','22058-343','SP','(11)95633-2354','felipe@gmail.com','$2b$10$61tUgvx0PMpqnfBnevE57.7aNdvwOBID65Zxwewr8hAQm5ewT03li','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjYsIkVtYWlsIjoiZmVsaXBlQGdtYWlsLmNvbSIsImlhdCI6MTY1NTc0MzcyOSwiZXhwIjoxNjU1OTE2NTI5fQ.91gb4WTPB0anffHGDCYZBWb10hjA8PMF3KUGL7KqI_g'),(7,'335.873.144-12','Camila','Andrade','rua arvoredo, 77','Barra Funda','São Paulo','22321-234','SP','(11)95678-4321','camila@gmail.com','$2b$10$fNIepNiGC.5IVlQ0urjBLu1v3B1zVSTmAjpSBkAdNEuDBnsfUyHSS','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjcsIkVtYWlsIjoiY2FtaWxhQGdtYWlsLmNvbSIsImlhdCI6MTY1NTc0NDAyMSwiZXhwIjoxNjU1OTE2ODIxfQ.LoEMV16z9jyD1XKb8ezrS2tLc7QRaZAvxjNyRtO2AmM'),(8,'123.654.987-99','Genivaldo','Lacerda','Av Paulista, 2000','Cerqueira César','São Paulo','01310-200','SP','(11)99999-9999','genival.lacerda@gmail.com','$2b$10$KVPV4STuYXI2CklkoWl1JOQSdK.BDhDK.gUIjqjGKSZ2IHItMytBK','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjgsIkVtYWlsIjoiZ2VuaXZhbC5sYWNlcmRhQGdtYWlsLmNvbSIsImlhdCI6MTY1NTkzNjY2MywiZXhwIjoxNjU2MTA5NDYzfQ.CWqdlCsDd81gLLJFhfzgooUP1LsmwIoX4rqARBO78GE'),(9,'076.167.555-76','Daniela','Aquino','Rua Imperial, 367','Vila Buenos Aires','São Paulo','03737-010','SP','(11)95544-3322','nogueira.aquino20@gmail.com','$2b$10$OrmL/pzkjaG/1RuXTOrlLurH.w6mgsywr1uGPXy2CK/.X3HpC2Ru6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZF9DbGkiOjksIkVtYWlsIjoibm9ndWVpcmEuYXF1aW5vMjBAZ21haWwuY29tIiwiaWF0IjoxNjU1OTM2Njg0LCJleHAiOjE2NTYxMDk0ODR9.R2O9CYqMs1FOHGTU6GTzlX8LGh56TjAVVrvcgq7HwNI');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itempedido`
--

DROP TABLE IF EXISTS `itempedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itempedido` (
  `Id_ItemPedido` int NOT NULL AUTO_INCREMENT,
  `Id_Pedido` int NOT NULL,
  `Id_Produto` int NOT NULL,
  `Valor` decimal(6,2) NOT NULL,
  `Prod_Quantidade` int NOT NULL,
  PRIMARY KEY (`Id_ItemPedido`),
  KEY `Id_Pedido` (`Id_Pedido`),
  KEY `Id_Produto` (`Id_Produto`),
  CONSTRAINT `ItemPedido_ibfk_1` FOREIGN KEY (`Id_Pedido`) REFERENCES `pedido` (`Id_Pedido`),
  CONSTRAINT `ItemPedido_ibfk_2` FOREIGN KEY (`Id_Produto`) REFERENCES `produto` (`Id_Produto`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itempedido`
--

LOCK TABLES `itempedido` WRITE;
/*!40000 ALTER TABLE `itempedido` DISABLE KEYS */;
INSERT INTO `itempedido` VALUES (1,1,1,4.99,1),(2,1,3,2.63,1),(3,1,6,4.99,1),(4,1,5,9.19,1),(5,2,1,4.99,3),(6,3,7,25.47,1),(7,3,11,12.42,1),(8,3,4,13.99,1),(9,3,9,2.41,1),(10,3,3,2.63,1),(11,3,16,6.99,1),(12,4,39,6.04,1),(13,4,34,17.49,1),(14,4,40,5.80,1),(15,5,11,12.42,2),(16,6,23,3.29,3),(18,7,8,16.49,2),(19,7,11,12.42,1),(20,7,4,13.99,2),(21,7,3,2.63,2),(22,7,7,25.47,2),(23,8,22,3.75,2),(24,8,23,3.29,1),(25,8,2,2.99,1),(26,8,17,21.15,3),(27,9,33,17.11,2),(28,9,34,17.49,1),(29,10,7,25.47,1),(30,10,11,12.42,2),(31,10,12,3.51,1),(32,11,4,13.99,2),(33,12,27,20.67,1),(34,12,28,17.59,3),(35,12,30,10.98,1),(36,12,5,9.19,1),(37,13,6,4.99,1),(38,13,26,3.80,1),(39,14,1,4.99,5),(40,14,19,6.92,1),(41,14,13,3.51,1),(42,14,20,5.27,1),(43,14,15,3.39,1),(44,14,14,3.39,1),(45,14,12,3.51,1),(46,15,9,2.41,3),(47,15,37,4.39,1),(48,16,3,2.63,6),(49,16,33,17.11,2),(50,16,34,17.49,1),(51,16,30,10.98,1),(52,17,10,11.34,2),(53,17,26,3.80,2),(54,17,28,17.59,1),(55,18,36,14.14,1),(56,18,39,6.04,2),(57,18,40,5.80,1),(58,19,25,2.49,1),(59,19,16,6.99,3),(60,19,21,6.92,4),(61,19,19,6.92,3),(62,19,13,3.51,4),(63,19,12,3.51,2),(64,19,17,21.15,2),(65,19,18,3.95,3),(66,20,2,2.99,1),(67,20,4,13.99,1),(68,20,7,25.47,1),(69,20,3,2.63,2),(70,20,11,12.42,2),(71,20,20,5.27,2),(72,20,8,16.49,1),(73,20,1,4.99,2),(74,20,5,9.19,1),(75,20,13,3.51,1),(76,20,19,6.92,1),(77,20,6,4.99,1),(78,20,25,2.49,1),(79,20,36,14.14,1),(80,20,30,10.98,1),(81,20,39,6.04,1),(82,21,3,2.63,30),(83,21,5,9.19,5),(84,21,1,4.99,3),(85,21,23,3.29,5),(86,21,9,2.41,5),(87,21,2,2.99,7),(88,21,8,16.49,4),(89,22,31,4.46,3),(90,22,6,4.99,2),(91,22,32,8.46,2),(92,23,17,21.15,1),(93,23,15,3.39,1),(94,23,16,6.99,1),(95,24,4,13.99,1),(96,24,3,2.63,1),(97,24,7,25.47,1),(98,25,25,2.49,1),(99,25,31,4.46,1),(100,25,32,8.46,1),(101,25,39,6.04,1),(102,25,40,5.80,2),(103,25,34,17.49,1);
/*!40000 ALTER TABLE `itempedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `Id_Pedido` int NOT NULL AUTO_INCREMENT,
  `Id_Cli` int NOT NULL,
  `Data_Pedido` date DEFAULT NULL,
  `FormaPagamento` varchar(30) NOT NULL,
  `Status_pedido` int NOT NULL,
  `Data_Cancelamento` date DEFAULT NULL,
  `Motivo_Cancelamento` varchar(200) DEFAULT NULL,
  `Observacao` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Id_Pedido`),
  KEY `Id_Cli` (`Id_Cli`),
  CONSTRAINT `Pedido_ibfk_1` FOREIGN KEY (`Id_Cli`) REFERENCES `cliente` (`Id_Cli`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,1,'2022-05-23','Cartão',2,NULL,NULL,'cachorro bravo'),(2,1,'2022-06-01','Pix',3,'2022-06-01','rua fechada',''),(3,2,'2022-06-15','Pix',2,NULL,NULL,'2ª Campainha'),(4,2,'2022-06-15','Dinheiro',3,'2022-06-20','Cliente Solicitou o Cancelamento',' '),(5,2,'2022-06-15','Pix',3,'2022-06-15','Cliente não quer mais os produtos.',' '),(6,3,'2022-06-15','Dinheiro',3,'2022-06-15','falta de morador na residência\n',' '),(7,3,'2022-06-15','Cartão',2,NULL,NULL,'nenhuma'),(8,4,'2022-06-20','Dinheiro',2,NULL,NULL,'Apartamento 3'),(9,4,'2022-06-20','Dinheiro',2,NULL,NULL,'Apartamento 2'),(10,4,'2022-06-20','Dinheiro',2,NULL,NULL,'Apartamento 2'),(11,5,'2022-06-15','Cartão',2,NULL,NULL,'Campainha não funcionando'),(12,5,'2022-06-17','Cartão',2,NULL,NULL,'Campainha não funciona'),(13,5,'2022-06-20','Cartão',2,NULL,NULL,' '),(14,6,'2022-06-10','Pix',2,NULL,NULL,' '),(15,6,'2022-06-19','Dinheiro',2,NULL,NULL,' '),(16,6,'2022-06-20','Cartão',2,NULL,NULL,' '),(17,7,'2022-06-16','Pix',2,NULL,NULL,'3ª Campainha'),(18,7,'2022-06-18','Pix',2,NULL,NULL,'3ª Campainha'),(19,7,'2022-06-20','Pix',2,NULL,NULL,'3ª Campainha'),(20,9,'2022-06-22','Pix',2,NULL,NULL,' '),(21,8,'2022-06-22','Pix',2,NULL,NULL,'Entregue rápido, preciso revender na porta do estádio.'),(22,9,'2022-06-22','Cartão',2,NULL,NULL,' '),(23,8,'2022-06-22','Cartão',2,NULL,NULL,'Trazer maquininha'),(24,9,'2022-06-22','Dinheiro',3,'2022-06-22','Cliente Solicitou o cancelamento',' '),(25,8,'2022-06-22','Dinheiro',1,NULL,NULL,'Casa dos fundos');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `Id_Produto` int NOT NULL AUTO_INCREMENT,
  `Id_Categoria` int NOT NULL,
  `Nome_Produto` varchar(30) NOT NULL,
  `Descricao` varchar(50) DEFAULT NULL,
  `Valor` decimal(6,2) NOT NULL,
  `Status_Produto` int NOT NULL,
  `Em_Oferta` int NOT NULL,
  `Link_Imagem_Produto` varchar(255) DEFAULT NULL,
  `Em_Estoque` int NOT NULL,
  PRIMARY KEY (`Id_Produto`),
  KEY `Id_Categoria` (`Id_Categoria`),
  CONSTRAINT `Produto_ibfk_1` FOREIGN KEY (`Id_Categoria`) REFERENCES `categoria` (`Id_Categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,2,'Chocolate Ovomaltine','87g',4.99,1,1,'https://images-americanas.b2w.io/produtos/50983211/imagens/tablete-de-chocolate-ao-leite-com-ovomaltine-87g-hersheys/50983209_1_large.jpg',1),(2,3,'Cheetos Requeijão','45g',2.99,1,0,'https://http2.mlstatic.com/D_NQ_NP_2X_742710-MLA45772062587_042021-V.webp',1),(3,4,'Coca-Cola Lata','350ml',2.63,1,1,'https://mfresh.s3.amazonaws.com/uploads/product/sku/3222/image/d8e7fdde-33a7-4835-b20c-d95bdbe3dcc2.png',1),(4,5,'Pizza Vegana Seara','380g',13.99,1,1,'https://www.seara.com.br/media/uploads/posts/41f6ab8c2eb6e3e59eb40491644deaa2.png',1),(5,6,'Arroz Branco Camil','1kg',9.19,1,0,'https://http2.mlstatic.com/D_Q_NP_665136-MLA46806282233_072021-O.webp',1),(6,7,'Pão de Forma Pullman','480g',4.99,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/169471/530/7896002360326_2.jpg',1),(7,8,'Coxão Duro','500g',25.47,1,1,'https://www.sondadelivery.com.br/img.aspx/sku/1457675/530/1457675.jpg',1),(8,9,'Papel Higiênico','12un',16.49,1,1,'https://www.sondadelivery.com.br/img.aspx/sku/1697099/530/1000033614.jpg',1),(9,10,'Detergente Limpol','500ml',2.41,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/19127/530/7891022640007-(1).jpg',1),(10,11,'Maçãs Gala','4un',11.34,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1515721/530/NovoProjeto-90-.jpg',1),(11,2,'Bombons Lacta','250g',12.42,1,1,'https://www.sondadelivery.com.br/img.aspx/sku/1653652/530/7622210596413_99_6_1200_72_RGB.jpg',1),(12,2,'KitKat ','41,5g',3.51,1,1,'https://www.sondadelivery.com.br/img.aspx/sku/1592670/530/7891000248768-(1).jpg',1),(13,2,'KitKat Branco','41,5g',3.51,1,1,'https://www.sondadelivery.com.br/img.aspx/sku/1592963/530/7891000249239-(1).jpg',1),(14,2,'Bis Xtra','45g',3.39,1,0,'https://images-americanas.b2w.io/produtos/01/00/img/89818/4/89818428_1GG.jpg',1),(15,2,'Bis Xtra Oreo','45g',3.39,1,0,'https://images-americanas.b2w.io/produtos/01/00/img/1560691/0/1560691057_1GG.jpg',1),(16,2,'Barra Nestle Classic','90g',6.99,1,0,'https://images-americanas.b2w.io/produtos/01/00/img/104978/2/104978297_1GG.jpg',1),(17,2,'Doce De Leite','200g',21.15,1,1,'https://images-americanas.b2w.io/produtos/3529892310/imagens/doce-de-leite-pedaco-200-gr-portao-de-cambui/3529892310_1_large.jpg',1),(18,2,'Bala Yogurte','150g',3.95,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/929328/270/929328.jpg',1),(19,2,'Fini Tubes Morango','80g',6.92,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1135139/270/1000004970.jpg',1),(20,2,'Bala de Goma','200g',5.27,1,1,'https://www.sondadelivery.com.br/img.aspx/sku/741591/270/7896058502404.jpg',1),(21,2,'Fini Minhoca','100g',6.92,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/450863/270/450863.jpg',1),(22,3,'Torradas Bauducco','142g',3.75,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1657259/270/7891962053189-(1).jpg',1),(23,3,'Bolacha Sal Bauducco','200g',3.29,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/347698/270/7891962014982-(1).jpg',1),(25,4,'Pepsi Lata','350ml',2.49,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/706612/270/7892840800079-(1).jpg',1),(26,4,'Água de coco','330ml',3.80,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1589482/270/1589482.jpg',1),(27,5,'Salsicha Vegetal','300g',20.67,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/3191/270/3191.jpg',1),(28,5,'Carne Vegetal','400g',17.59,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/12718/270/12718.jpg',1),(29,6,'Grão de bico','500g',9.79,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1626388/270/1626388.jpg',1),(30,6,'Feijão Carioca Camil','1Kg',10.98,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/21776/270/7896006744115-(1).jpg',1),(31,7,'Ana Maria Chocolate','70g',4.46,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/473294/270/7896002362436_0.jpg',1),(32,7,'Bisnaguinhas Panco','300g',8.46,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/172979/270/1000009061.jpg',1),(33,8,'Bacon Fatias','250g',17.11,1,0,'https://static.paodeacucar.com/img/uploads/1/208/661208.jpg',1),(34,8,'Carne Moída','500g',17.49,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000036484/270/1000036484.jpg',1),(35,9,'Creme Dental','90g',3.61,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/109380/270/1093807.jpg',1),(36,9,'Escovas de Dente','2Un',14.14,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1575350/270/7702010631207_6.jpg',1),(37,10,'Água Sanitária','1L',4.39,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/412023/270/Sem-Titulo-1.jpg',1),(38,10,'Sabão em Pó Omo','800g',11.49,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1660624/270/7891150064317-(2).jpg',1),(39,11,'Abacate','550g',6.04,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/525561/270/525561.jpg',1),(40,11,'Abacaxi','1Un',5.80,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/201065/270/AbacaxiPerolaUnidade.jpg',1),(41,12,'Macarrão Renata','500g',16.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000040855/270/NovoProjeto-2021-12-27T154324-575.jpg',1),(42,12,'Mini Pizzas massa','300g',7.81,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1664166/270/bubu.jpg',1),(43,12,'Massa de Pastel','500g',8.50,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/470074/270/1000011823.jpg',1),(44,9,'Rexona Invisible','150ml',11.40,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1553348/270/7791293032481-(0).jpg',1),(45,9,'Sabonete Lux','85g',1.60,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1624903/270/1624903.jpg',1),(46,8,'Sobrecoxas de frango','800g',18.50,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1447271/270/1000013275.jpg',1),(47,8,'Frango de padaria','1.3 Kg',21.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000041009/270/46028_2.jpg',1),(48,8,'Frango a passarinho','1Kg',12.00,1,0,'https://cdn-veloxcode.s3.sa-east-1.amazonaws.com/banco-de-imagens/8svkDSz0njmNYvpll7JDAcj6IipP1TXqtVa9ltsE.png',1),(49,4,'Cerveja Heineken','350ml',5.20,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/217395/270/7896045523412_1.jpg',1),(50,4,'Budweiser','269ml',1.50,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1507648/270/7891991011877-(1).jpg',1),(51,4,'Cerveja Spaten ','350ml',3.70,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000039001/270/7891991297424-(1).jpg',1),(52,4,'Skoll Beats Mint','269ml',6.40,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000040260/270/7891991300865-(1).jpg',1),(53,4,'Skol Gin & Tônica','269ml',7.50,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000040761/270/7891991301114_99_3_1200_72_RGB.jpg',1),(54,4,'Skol Beats Senses','269ml',6.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000040763/270/7891991301138-(1).jpg',1),(55,4,'Skol Senses Lata','269ml',6.00,1,0,'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSLGrZIpdPRl3pzC4HDBQTvxCUKCY27Nml7GpkWQPB4VzY3SJoV7KGttDDj-NhsKrmVf3Qq1ijYCiSQvZY4mZwuPX9WucbibtyIpVxmomPbSykN4BTe2nT5sEMy&usqp=CAE',1),(56,4,'Skol Beats GT (lata)','269ml',6.00,1,0,'https://static.clubeextra.com.br/img/uploads/1/560/13432560.jpeg',1),(57,13,'Maionese Hellmans','335g',7.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1430947/530/7891150027800_0.jpg',1),(58,13,'Maionese Verde','Hellmans 335g',7.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000038601/530/7891150079892_0.jpg',1),(59,13,'Maionese Vegana','Hellmans 335g',8.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000036174/270/7891150078185_0.jpg',1),(60,13,'Ketchup Hellmans','380g',9.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1420640/530/7891150027848-(0).jpg',1),(61,13,'Mostarda Hellmans','170g',6.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1446053/530/7891150027794_0.jpg',1),(62,13,'Molho de alho Kenko','150ml',3.50,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/403032/530/1000002502.jpg',1),(63,1,'Molho TABASCO','60ml',25.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1353489/270/NovoProjeto-2022-03-04T125243-773.jpg',1),(64,1,'Sabonete Lux','85g',1.50,0,0,'https://www.sondadelivery.com.br/img.aspx/sku/1624903/270/1624903.jpg',1),(65,10,'Sabão em pó','Brilhante 150g',20.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000041357/530/7891150086425_99_1_1200_72_RGB.jpg',1),(66,3,'Salgadinho Torcida','Pimenta Mexicana 45g',2.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1672835/270/7892840815134_0.jpg',1),(67,3,'Salgadinho Pringles','Churrasco 120g',14.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000038315/270/7896004006956-(1).jpg',1),(68,3,'Salgadinho Fandangos','milho 45g',2.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000034436/270/7892840816438_0.jpg',1),(69,3,'Salgadinho Cebolitos','Cebola 190g',17.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1671855/270/1000031146_1.jpg',1),(70,3,'Salgadinho Cheetos','Queijo Cheddar 45g',2.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000039075/270/7892840818111-1.jpg',1),(71,6,'Arroz Prato Fino','Integral 1kg',6.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1136739/530/1136739.jpg',1),(72,6,'Aveia Quaker','Flocos finos 165g',5.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000033778/270/7892840815769_0.jpg',1),(73,6,'Cereal Nescau','Integral duo 210g',10.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1662341/270/7891000258613-(1).jpg',1),(74,6,'Farinha de mandioca ','500g',4.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000037305/270/1000037305.jpg',1),(75,6,'Farofa KiSabor','Carne Seca 250g',5.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1222511/270/Sem-Titulo-1.jpg',1),(76,7,'Biscoito Doce Uga','100g',3.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1585533/270/1000000274.jpg',1),(77,7,'Bolinho Bauducco ','roll cake 34g',1.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1243446/270/7891962051574.jpg',1),(78,7,'Bolinho Seven Boys','Laranja 35g',1.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1613430/270/1000023776.jpg',1),(79,1,'Pão Briochi Paderri','400g',12.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1000035982/270/1000035982.jpg',1),(80,6,'Farinha de Milho ','Yoki 500g',7.20,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/107093/270/NovoProjeto-2022-03-03T090222-984.jpg',1),(81,6,'Quinoa','250g',18.00,1,0,'https://www.sondadelivery.com.br/img.aspx/sku/1479466/270/7896496912520.jpg',1);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-23 16:05:09
