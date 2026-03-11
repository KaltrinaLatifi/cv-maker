-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Oct 24, 2025 at 01:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cvmakerdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(150) DEFAULT NULL,
  `message` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `userId`, `name`, `email`, `subject`, `message`, `createdAt`) VALUES
(1, 1, 'Laura Berisha', 'laura@example.com', 'Help with CV layout', 'Can you check if my layout is correct?', '2025-07-28 14:04:54'),
(2, 2, 'John Doe', 'john@example.com', 'Bug Report', 'The template preview doesn’t load.', '2025-07-28 14:04:54');

-- --------------------------------------------------------

--
-- Table structure for table `cvs`
--

CREATE TABLE `cvs` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `templateId` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cvs`
--

INSERT INTO `cvs` (`id`, `userId`, `templateId`, `title`, `createdAt`, `updated_at`) VALUES
(1, 1, 1, 'Frontend Developer CV', '2025-07-28 14:04:53', NULL),
(2, 2, 2, 'Backend Developer CV', '2025-07-28 14:04:53', NULL),
(4, NULL, 1, 'Untitled CV', '2025-08-29 00:17:13', NULL),
(5, NULL, 1, 'Untitled CV', '2025-08-29 00:21:08', NULL),
(6, NULL, 1, 'Untitled CV', '2025-08-29 00:33:36', NULL),
(7, NULL, 1, 'Untitled CV', '2025-08-29 00:39:45', NULL),
(8, NULL, 1, 'Untitled CV', '2025-08-29 00:40:50', NULL),
(9, NULL, 1, 'Untitled CV', '2025-08-29 00:43:31', NULL),
(10, NULL, 1, 'Untitled CV', '2025-08-29 00:43:39', NULL),
(11, NULL, 1, 'Untitled CV', '2025-08-29 00:56:17', NULL),
(12, NULL, 1, 'Untitled CV', '2025-08-29 01:04:56', NULL),
(13, NULL, 1, 'Untitled CV', '2025-08-29 01:22:38', NULL),
(14, NULL, 1, 'Untitled CV', '2025-08-29 01:45:15', NULL),
(15, NULL, 1, 'Untitled CV', '2025-08-29 01:56:28', NULL),
(16, NULL, 1, 'Untitled CV', '2025-08-29 18:24:35', NULL),
(17, NULL, 1, 'Untitled CV', '2025-08-29 20:01:31', NULL),
(18, NULL, 1, 'Untitled CV', '2025-09-06 22:20:45', NULL),
(19, NULL, 1, 'Untitled CV', '2025-09-06 23:41:57', NULL),
(20, NULL, 1, 'Untitled CV', '2025-09-07 01:38:49', NULL),
(21, NULL, 1, 'Untitled CV', '2025-09-07 01:53:44', NULL),
(22, NULL, 1, 'Untitled CV', '2025-09-07 02:13:59', NULL),
(23, NULL, 1, 'Untitled CV', '2025-09-07 02:29:34', NULL),
(24, NULL, 1, 'Untitled CV', '2025-09-29 12:44:58', NULL),
(25, NULL, 1, 'Untitled CV', '2025-09-29 13:11:46', NULL),
(26, NULL, 1, 'Untitled CV', '2025-09-29 13:41:09', NULL),
(27, NULL, 1, 'Untitled CV', '2025-09-29 13:43:37', NULL),
(28, NULL, 1, 'Untitled CV', '2025-09-29 14:14:37', NULL),
(29, NULL, 1, 'Untitled CV', '2025-09-29 15:36:36', NULL),
(30, NULL, 1, 'Untitled CV', '2025-09-29 16:24:20', NULL),
(31, NULL, 1, 'Untitled CV', '2025-09-29 16:24:34', NULL),
(32, NULL, 1, 'Untitled CV', '2025-09-30 07:41:32', NULL),
(33, NULL, 1, 'Untitled CV', '2025-09-30 08:06:21', NULL),
(34, NULL, 1, 'Untitled CV', '2025-09-30 09:02:00', NULL),
(35, NULL, 1, 'Untitled CV', '2025-09-30 09:10:12', NULL),
(36, NULL, 1, 'Untitled CV', '2025-09-30 09:22:34', NULL),
(37, NULL, 1, 'Untitled CV', '2025-09-30 09:33:33', NULL),
(38, NULL, 1, 'Untitled CV', '2025-09-30 09:41:08', NULL),
(39, NULL, 1, 'Untitled CV', '2025-09-30 09:51:29', NULL),
(40, NULL, 1, 'Untitled CV', '2025-09-30 11:32:11', NULL),
(41, NULL, 1, 'Untitled CV', '2025-09-30 12:25:22', NULL),
(42, NULL, 1, 'Untitled CV', '2025-09-30 12:37:12', NULL),
(43, NULL, 1, 'Untitled CV', '2025-09-30 12:47:42', NULL),
(44, NULL, 1, 'Untitled CV', '2025-09-30 12:48:55', NULL),
(45, NULL, 1, 'Untitled CV', '2025-10-01 07:05:43', NULL),
(46, NULL, 1, 'Untitled CV', '2025-10-22 21:27:59', NULL),
(47, NULL, 1, 'Untitled CV', '2025-10-24 11:38:53', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `education`
--

CREATE TABLE `education` (
  `id` int(11) NOT NULL,
  `cvId` int(11) NOT NULL,
  `school` varchar(100) DEFAULT NULL,
  `degree` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `education`
--

INSERT INTO `education` (`id`, `cvId`, `school`, `degree`, `city`, `startDate`, `endDate`, `description`, `created_at`, `updated_at`) VALUES
(10, 1, 'UP', 'BSc', 'Peje', NULL, NULL, '', '2025-08-29 00:50:23', NULL),
(11, 1, 'UP', 'BSc', 'Prishtine', '2018-10-01', '2021-10-01', '', '2025-08-29 00:59:44', NULL),
(12, 12, 'UP', 'BSc', 'Prishtine', '2019-10-01', '2021-10-01', '', '2025-08-29 01:21:14', NULL),
(13, 17, 'Oxford University', 'MSc', '', '2020-11-01', '2023-11-01', '', '2025-08-29 20:09:58', NULL),
(14, 21, 'UP', 'BSc', 'Prishtine', '2022-11-01', '2025-11-01', '', '2025-09-07 01:55:08', NULL),
(15, 44, 'ubt', 'BSc', 'Prishtine', '2020-10-01', '2023-10-01', '', '2025-09-30 12:49:59', NULL),
(16, 45, 'ubt', '', 'Prishtine', NULL, NULL, '', '2025-10-01 07:07:15', NULL),
(17, 46, 'University of Prishtina', 'BSc', 'Prishtina', '2020-10-01', '2023-10-01', '', '2025-10-22 21:31:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` int(11) NOT NULL,
  `cvId` int(11) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `cvId`, `company`, `position`, `city`, `startDate`, `endDate`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'TechSoft', 'Frontend Intern', 'Prishtina', '2022-01-01', '2022-06-30', 'Worked on UI components with React.', '2025-08-20 17:14:58', NULL),
(2, 2, 'CodeZone', 'Backend Developer', 'Gjakova', '2021-03-01', '2023-03-01', 'Developed REST APIs using Node.js.', '2025-08-20 17:14:58', NULL),
(24, 1, 'HJR', 'Programmer', 'Prizren', '2021-11-01', '2023-08-01', '', '2025-08-29 00:59:44', NULL),
(25, 1, 'TRV', 'Project Manager', 'Prishtine', '2023-12-01', '2024-09-01', '', '2025-08-29 00:59:44', NULL),
(26, 12, 'KJH', 'Model', 'NYC', '2022-09-01', '2023-10-01', '', '2025-08-29 01:21:14', NULL),
(27, 13, '', 'Doctor', 'Peje', '2023-09-01', NULL, '', '2025-08-29 01:25:01', NULL),
(28, 17, 'SDF', 'Psycholog', 'Boston, NYC', '2018-08-01', '2022-11-01', '', '2025-08-29 20:09:58', NULL),
(29, 17, 'TRQ', 'Teacher', 'LA', '2022-11-01', '2023-08-01', '', '2025-08-29 20:09:58', NULL),
(30, 18, '', 'Lawyer', '', '2023-02-01', '2024-06-01', '', '2025-09-06 22:22:15', NULL),
(31, 19, '', 'doctor', '', NULL, NULL, '', '2025-09-06 23:42:34', NULL),
(32, 20, 'ZTR', 'Pictor', 'Paris', '2022-11-01', '2024-11-01', '', '2025-09-07 01:39:42', NULL),
(33, 22, 'Tara Beauty', 'Nail Artist', 'Prishtine', '2023-09-01', NULL, '', '2025-09-07 02:14:59', NULL),
(34, 41, 'Tara Beauty', 'Nail Artist', 'Prishtine', '2020-11-01', '2022-11-01', '', '2025-09-30 12:27:03', NULL),
(35, 42, 'Auto Service Meti', 'Mechanic', 'Prishtine', '2022-10-01', '2024-11-01', '', '2025-09-30 12:38:39', NULL),
(36, 44, 'Tara Beauty', 'Nail Artist', 'Prishtine', NULL, NULL, '', '2025-09-30 12:49:59', NULL),
(37, 45, 'Tara Beauty', 'Nail Artist', 'Prishtine', '2024-11-01', NULL, '', '2025-10-01 07:07:15', NULL),
(38, 46, 'DFG', 'Web Developer', 'Prishtine', '2021-06-01', '2023-06-01', '', '2025-10-22 21:31:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `interests`
--

CREATE TABLE `interests` (
  `id` int(11) NOT NULL,
  `cvId` int(11) NOT NULL,
  `hobby` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `interests`
--

INSERT INTO `interests` (`id`, `cvId`, `hobby`, `created_at`) VALUES
(1, 1, 'Drawing, Reading, Coding', '2025-08-20 17:15:25'),
(2, 2, 'Gaming, Chess, Traveling', '2025-08-20 17:15:25'),
(10, 1, 'Researching', '2025-08-29 00:59:44'),
(11, 12, 'Photography', '2025-08-29 01:21:14'),
(12, 16, 'hiking', '2025-08-29 18:43:04'),
(13, 16, 'hiking', '2025-08-29 18:47:01'),
(14, 17, 'Solving problems', '2025-08-29 20:09:58'),
(15, 17, 'Solving problems', '2025-08-29 20:11:58'),
(16, 45, 'hiking', '2025-10-01 07:07:36'),
(17, 45, 'hiking', '2025-10-01 07:07:53'),
(18, 45, 'hiking', '2025-10-01 07:10:25'),
(19, 45, 'hiking', '2025-10-01 09:25:38'),
(20, 45, 'hiking', '2025-10-01 10:23:03'),
(21, 45, 'hiking', '2025-10-01 10:23:16'),
(22, 45, 'hiking', '2025-10-01 10:23:31'),
(23, 45, 'hiking', '2025-10-01 10:24:08'),
(24, 45, 'hiking', '2025-10-01 10:24:20'),
(25, 45, 'hiking', '2025-10-01 10:28:26'),
(26, 45, 'hiking', '2025-10-01 10:28:58'),
(27, 45, 'hiking', '2025-10-01 10:30:06'),
(28, 45, 'hiking', '2025-10-01 12:35:33'),
(29, 45, 'hiking', '2025-10-01 12:45:20'),
(30, 45, 'hiking', '2025-10-01 13:51:38'),
(31, 45, 'hiking', '2025-10-01 14:27:25'),
(32, 45, 'hiking', '2025-10-01 14:27:38'),
(33, 45, 'hiking', '2025-10-01 14:51:39'),
(34, 45, 'hiking', '2025-10-01 15:18:06'),
(35, 46, 'Photography', '2025-10-22 21:31:09'),
(36, 46, 'Photography', '2025-10-22 23:46:18');

-- --------------------------------------------------------

--
-- Table structure for table `personaldetails`
--

CREATE TABLE `personaldetails` (
  `id` int(11) NOT NULL,
  `cvId` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personaldetails`
--

INSERT INTO `personaldetails` (`id`, `cvId`, `first_name`, `last_name`, `email`, `phone_number`, `address`, `zip_code`, `city`, `created_at`, `updated_at`) VALUES
(1234, 1, 'Ari', 'Berisha', 'ariberisha@gmail.com', '0456988060', 'Lidhja e Prizrenit', '10000', 'Prishtine', '2025-08-20 17:15:40', '2025-08-29 01:23:22'),
(1236, 2, 'Kaltrina', 'Latifi', 'kaltrina@example.com', '12345678', 'Some Street', '10000', 'Prishtina', '2025-08-21 14:04:34', NULL),
(1240, 16, 'Kaltrina', 'Latifi', 'kaltrinalatifi2004@gmail.com', '04478653', 'Lidhja e Prizrenit', '10000', 'Prishtine', '2025-08-29 18:42:52', NULL),
(1241, 17, 'Beneta', 'Balaj', 'benetebalaj@gmail.com', '044567122', 'Sylejman Safiu', '10000', 'Prishtine', '2025-08-29 20:03:26', NULL),
(1242, 18, 'Beneta', 'Balaj', 'benetebalaj@gmail.com', '04478653', 'Sylejman Safiu', '10000', 'Prishtine', '2025-09-06 22:21:02', NULL),
(1243, 19, 'Muhamed', 'Latifi', 'muhamedlatifi@gmail.com', '04478653', 'Ahmet Haxhiu', '10000', '', '2025-09-06 23:42:23', NULL),
(1244, 20, 'Muhamed', 'Latifi', 'muhamedlatifi@gmail.com', '04478653', 'Ahmet Haxhiu', '10000', 'Prishtine', '2025-09-07 01:38:57', NULL),
(1245, 21, 'Tara', 'Sopi', 'tarasopi@gmail.com', '045675423', 'Antigona Fazliu', '10000', 'Peje', '2025-09-07 01:54:29', NULL),
(1246, 22, 'Tara', 'Sopi', 'tarasopi@gmail.com', '04478653', 'Antigona Fazliu', '10000', 'Peje', '2025-09-07 02:14:08', NULL),
(1247, 40, 'Melika', 'Latifi', 'melikalatifi@gmail.com', '45489153', 'Sulejman Vokshi', '10000', 'Prishtine', '2025-09-30 11:33:28', NULL),
(1254, 41, 'Elsa ', 'Sahiti', 'elsasahiti@gmail.com', '2334567891', 'Sulejman Vokshi', '10000', 'Prishtine', '2025-09-30 12:25:49', NULL),
(1257, 42, 'Muhamed', 'Latifi', 'muhamedlatifi@gmail.com', '456723451', 'Ahmet Haxhiu', '10000', 'Prishtine', '2025-09-30 12:37:42', NULL),
(1263, 44, 'Anesa', 'Gashi', 'anesagashi@gmail.com', '2334567891', 'Ahmet Haxhiu', '10000', 'Prishtine', '2025-09-30 12:49:26', NULL),
(1266, 45, 'Benita', 'Krasniqi', 'benitakrasniqi@gmail.com', '345876123', 'Antigona Fazliu', '10000', 'Prishtine', '2025-10-01 07:06:32', NULL),
(1288, 46, 'Eda ', 'Zeka', 'edazeka@gmail.com', '044587341', 'Aleksander Jahu', '10000', 'Prishtine', '2025-10-22 21:28:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `refreshtokens`
--

CREATE TABLE `refreshtokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` int(11) NOT NULL,
  `tokenHash` char(64) NOT NULL,
  `expiresAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `revokedAt` datetime DEFAULT NULL,
  `replacedByTokenHash` char(64) DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `userAgent` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resumes`
--

CREATE TABLE `resumes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `template_id` int(11) DEFAULT NULL,
  `title` varchar(191) NOT NULL DEFAULT 'My Resume',
  `data_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data_json`)),
  `schema_version` int(11) NOT NULL DEFAULT 1,
  `last_rendered_pdf_url` varchar(512) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resumes`
--

INSERT INTO `resumes` (`id`, `user_id`, `template_id`, `title`, `data_json`, `schema_version`, `last_rendered_pdf_url`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, '', '{\"basics\":{\"name\":\"Muhamed Latifi\",\"email\":\"muhamedlatifi@gmail.com\",\"phone\":\"456723451\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Auto Service Meti\",\"position\":\"Mechanic\",\"city\":\"Prishtine\",\"startDate\":\"2022-10-01\",\"endDate\":\"2024-11-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"\",\"area\":\"\",\"degree\":\"\",\"city\":\"\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"\",\"level\":\"Beginner\",\"keywords\":[]}],\"interests\":[{\"name\":\"\"}],\"objective\":\"\"}', 1, NULL, '2025-09-30 12:40:12', '2025-09-30 12:40:25'),
(2, 1, NULL, '', '{\"basics\":{\"name\":\"Muhamed Latifi\",\"email\":\"muhamedlatifi@gmail.com\",\"phone\":\"456723451\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Auto Service Meti\",\"position\":\"Mechanic\",\"city\":\"Prishtine\",\"startDate\":\"2022-10-01\",\"endDate\":\"2024-11-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"\",\"area\":\"\",\"degree\":\"\",\"city\":\"\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"\",\"level\":\"Beginner\",\"keywords\":[]}],\"interests\":[{\"name\":\"\"}],\"objective\":\"\"}', 1, NULL, '2025-09-30 12:40:29', '2025-09-30 12:40:48'),
(3, 1, NULL, '', '{\"basics\":{\"name\":\"Muhamed Latifi\",\"email\":\"muhamedlatifi@gmail.com\",\"phone\":\"456723451\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Auto Service Meti\",\"position\":\"Mechanic\",\"city\":\"Prishtine\",\"startDate\":\"2022-10-01\",\"endDate\":\"2024-11-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"\",\"area\":\"\",\"degree\":\"\",\"city\":\"\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"\",\"level\":\"Beginner\",\"keywords\":[]}],\"interests\":[{\"name\":\"\"}],\"objective\":\"\"}', 1, NULL, '2025-09-30 12:40:52', '2025-09-30 12:40:53'),
(4, 1, NULL, '', '{\"basics\":{\"name\":\"Muhamed Latifi\",\"email\":\"muhamedlatifi@gmail.com\",\"phone\":\"456723451\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Auto Service Meti\",\"position\":\"Mechanic\",\"city\":\"Prishtine\",\"startDate\":\"2022-10-01\",\"endDate\":\"2024-11-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"\",\"area\":\"\",\"degree\":\"\",\"city\":\"\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"\",\"level\":\"Beginner\",\"keywords\":[]}],\"interests\":[{\"name\":\"\"}],\"objective\":\"\"}', 1, NULL, '2025-09-30 12:40:55', '2025-09-30 12:40:56'),
(5, 1, NULL, '', '{\"basics\":{\"name\":\"Muhamed Latifi\",\"email\":\"muhamedlatifi@gmail.com\",\"phone\":\"456723451\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Auto Service Meti\",\"position\":\"Mechanic\",\"city\":\"Prishtine\",\"startDate\":\"2022-10-01\",\"endDate\":\"2024-11-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"\",\"area\":\"\",\"degree\":\"\",\"city\":\"\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"\",\"level\":\"Beginner\",\"keywords\":[]}],\"interests\":[{\"name\":\"\"}],\"objective\":\"\"}', 1, NULL, '2025-09-30 12:40:58', '2025-09-30 12:41:01'),
(6, 1, NULL, '42', '{\"basics\":{},\"work\":[],\"education\":[],\"skills\":[]}', 1, NULL, '2025-09-30 12:41:03', '2025-09-30 12:41:03'),
(7, 1, NULL, '', '{\"basics\":{\"name\":\"Anesa Gashi\",\"email\":\"anesagashi@gmail.com\",\"phone\":\"2334567891\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtine\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"\"}],\"objective\":\"\"}', 1, NULL, '2025-09-30 12:53:02', '2025-09-30 12:53:09'),
(8, 1, NULL, '', '{\"basics\":{\"name\":\"Anesa Gashi\",\"email\":\"anesagashi@gmail.com\",\"phone\":\"2334567891\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtine\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"\"}],\"objective\":\"\"}', 1, NULL, '2025-09-30 12:53:10', '2025-09-30 12:53:20'),
(9, 1, NULL, '44', '{\"basics\":{},\"work\":[],\"education\":[],\"skills\":[]}', 1, NULL, '2025-09-30 12:53:31', '2025-09-30 12:53:31'),
(10, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 07:07:16', '2025-10-01 07:10:31'),
(11, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 07:10:45', '2025-10-01 07:10:46'),
(12, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 07:10:50', '2025-10-01 07:43:41'),
(13, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 07:43:44', '2025-10-01 07:51:55'),
(14, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 07:51:58', '2025-10-01 07:56:15'),
(15, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 07:56:20', '2025-10-01 08:04:34'),
(16, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 08:04:43', '2025-10-01 08:32:55'),
(17, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 08:32:57', '2025-10-01 08:32:59'),
(18, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 08:33:03', '2025-10-01 08:33:05'),
(19, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 08:33:07', '2025-10-01 08:33:25'),
(20, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 09:15:00', '2025-10-01 09:15:06'),
(21, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 09:15:09', '2025-10-01 09:15:09'),
(22, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 09:15:12', '2025-10-01 09:15:13'),
(23, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 09:15:16', '2025-10-01 09:19:21'),
(24, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 09:19:23', '2025-10-01 09:25:40'),
(25, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 09:25:42', '2025-10-01 09:27:04'),
(26, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:02:55', '2025-10-01 10:02:55'),
(27, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:02:57', '2025-10-01 10:02:59'),
(28, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:08:13', '2025-10-01 10:10:28'),
(29, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:10:35', '2025-10-01 10:11:16'),
(30, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:11:24', '2025-10-01 10:11:27'),
(31, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:12:54', '2025-10-01 10:23:32'),
(32, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:23:34', '2025-10-01 10:23:35'),
(33, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 10:23:39', '2025-10-01 12:37:25'),
(34, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 12:38:20', '2025-10-01 12:39:06'),
(35, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 12:39:08', '2025-10-01 12:44:47'),
(36, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 12:44:50', '2025-10-01 12:45:15'),
(37, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 12:45:20', '2025-10-01 12:45:21'),
(38, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 12:51:41', '2025-10-01 12:57:15'),
(39, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:01:58', '2025-10-01 13:12:26'),
(40, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:14:08', '2025-10-01 13:14:12'),
(41, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:16:42', '2025-10-01 13:16:44'),
(42, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:21:06', '2025-10-01 13:34:02'),
(43, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:36:26', '2025-10-01 13:43:11'),
(44, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:47:21', '2025-10-01 13:50:01'),
(45, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:51:00', '2025-10-01 13:51:24'),
(46, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:51:38', '2025-10-01 13:51:39'),
(47, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 13:52:31', '2025-10-01 14:00:03'),
(48, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:00:11', '2025-10-01 14:00:15'),
(49, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:00:30', '2025-10-01 14:00:36'),
(50, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:01:35', '2025-10-01 14:04:32'),
(51, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:04:51', '2025-10-01 14:05:11'),
(52, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:05:17', '2025-10-01 14:05:29'),
(53, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:17:06', '2025-10-01 14:17:09'),
(54, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:17:17', '2025-10-01 14:17:19'),
(55, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:19:06', '2025-10-01 14:19:09'),
(56, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:22:01', '2025-10-01 14:27:41'),
(57, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:29:10', '2025-10-01 14:33:33'),
(58, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:36:45', '2025-10-01 14:51:43'),
(59, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 14:54:07', '2025-10-01 14:56:33'),
(60, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:01:58', '2025-10-01 15:02:14'),
(61, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:03:00', '2025-10-01 15:04:05'),
(62, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:04:14', '2025-10-01 15:05:19'),
(63, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:05:26', '2025-10-01 15:05:29'),
(64, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:05:41', '2025-10-01 15:08:42'),
(65, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:09:42', '2025-10-01 15:10:35'),
(66, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:16:19', '2025-10-01 15:16:22'),
(67, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:17:27', '2025-10-01 15:17:29'),
(68, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:17:40', '2025-10-01 15:17:44'),
(69, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:17:56', '2025-10-01 15:17:59'),
(70, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:18:06', '2025-10-01 15:18:08'),
(71, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:18:36', '2025-10-01 15:18:52');
INSERT INTO `resumes` (`id`, `user_id`, `template_id`, `title`, `data_json`, `schema_version`, `last_rendered_pdf_url`, `created_at`, `updated_at`) VALUES
(72, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:19:05', '2025-10-01 15:19:07'),
(73, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:19:21', '2025-10-01 15:19:25'),
(74, 1, NULL, '', '{\"basics\":{\"name\":\"Benita Krasniqi\",\"email\":\"benitakrasniqi@gmail.com\",\"phone\":\"345876123\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"Tara Beauty\",\"position\":\"Nail Artist\",\"city\":\"Prishtine\",\"startDate\":\"2024-11-01\",\"endDate\":null,\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"ubt\",\"area\":\"\",\"degree\":\"\",\"city\":\"Prishtine\",\"startDate\":null,\"endDate\":null,\"summary\":\"\"}],\"skills\":[{\"name\":\"js\",\"level\":\"\",\"keywords\":[]}],\"interests\":[{\"name\":\"hiking\"}],\"objective\":\"\"}', 1, NULL, '2025-10-01 15:20:32', '2025-10-01 15:20:46'),
(75, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 21:31:09', '2025-10-22 21:31:23'),
(76, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 21:46:26', '2025-10-22 21:46:28'),
(77, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 21:55:00', '2025-10-22 21:55:01'),
(78, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:16:50', '2025-10-22 22:16:51'),
(79, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:17:04', '2025-10-22 22:17:05'),
(80, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:17:08', '2025-10-22 22:17:09'),
(81, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:27:17', '2025-10-22 22:27:28'),
(82, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:30:28', '2025-10-22 22:30:30'),
(83, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:45:06', '2025-10-22 22:45:08'),
(84, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:45:27', '2025-10-22 22:45:29'),
(85, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:45:41', '2025-10-22 22:45:42'),
(86, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:45:48', '2025-10-22 22:45:49'),
(87, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:45:56', '2025-10-22 22:45:59'),
(88, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:46:18', '2025-10-22 22:46:20'),
(89, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:46:22', '2025-10-22 22:46:24'),
(90, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:46:30', '2025-10-22 22:46:33'),
(91, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:47:18', '2025-10-22 22:47:21'),
(92, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:47:50', '2025-10-22 22:47:51'),
(93, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 22:52:44', '2025-10-22 22:52:45'),
(94, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:05:15', '2025-10-22 23:30:51'),
(95, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:35:03', '2025-10-22 23:35:04'),
(96, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:38:32', '2025-10-22 23:38:39'),
(97, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:40:23', '2025-10-22 23:40:24'),
(98, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:40:29', '2025-10-22 23:40:33'),
(99, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:42:29', '2025-10-22 23:42:30'),
(100, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:42:36', '2025-10-22 23:42:38'),
(101, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:43:10', '2025-10-22 23:43:12'),
(102, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:44:17', '2025-10-22 23:44:19'),
(103, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:44:35', '2025-10-22 23:44:36'),
(104, 1, NULL, '', '{\"basics\":{\"name\":\"Eda  Zeka\",\"email\":\"edazeka@gmail.com\",\"phone\":\"044587341\",\"website\":\"\",\"label\":\"\",\"location\":{\"city\":\"Prishtine\",\"countryCode\":\"\"}},\"work\":[{\"company\":\"DFG\",\"position\":\"Web Developer\",\"city\":\"Prishtine\",\"startDate\":\"2021-06-01\",\"endDate\":\"2023-06-01\",\"summary\":\"\",\"highlights\":[]}],\"education\":[{\"institution\":\"University of Prishtina\",\"area\":\"\",\"degree\":\"BSc\",\"city\":\"Prishtina\",\"startDate\":\"2020-10-01\",\"endDate\":\"2023-10-01\",\"summary\":\"\"}],\"skills\":[{\"name\":\"Programing\",\"level\":\"Intermediate\",\"keywords\":[]}],\"interests\":[{\"name\":\"Photography\"}],\"objective\":\"eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee\"}', 1, NULL, '2025-10-22 23:46:18', '2025-10-22 23:46:20');

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `cvId` int(11) NOT NULL,
  `skillName` varchar(100) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `cvId`, `skillName`, `level`, `created_at`, `updated_at`) VALUES
(1, 1, 'HTML/CSS', 'Advanced', '2025-08-20 17:15:11', NULL),
(3, 2, 'Node.js', 'Advanced', '2025-08-20 17:15:11', NULL),
(13, 1, 'JavaScript', 'Advanced', '2025-08-29 00:59:44', NULL),
(14, 1, 'Python', 'Advanced', '2025-08-29 00:59:44', NULL),
(15, 12, 'Painting', 'Intermediate', '2025-08-29 01:21:14', NULL),
(16, 17, 'Comunication', 'Advanced', '2025-08-29 20:09:58', NULL),
(17, 41, 'JS', 'Beginner', '2025-09-30 12:36:24', NULL),
(18, 42, '', 'Beginner', '2025-09-30 12:38:39', '2025-09-30 12:40:12'),
(19, 44, 'js', 'Intermediate', '2025-09-30 12:53:01', NULL),
(20, 45, 'js', '', '2025-10-01 07:07:15', NULL),
(21, 45, 'js', '', '2025-10-01 07:07:36', NULL),
(22, 46, 'Programing', 'Intermediate', '2025-10-22 21:31:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE `templates` (
  `id` int(11) NOT NULL,
  `templateName` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `preview_image_url` varchar(512) DEFAULT NULL,
  `style_tokens` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`style_tokens`)),
  `layout_version` int(11) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`id`, `templateName`, `description`, `createdAt`, `preview_image_url`, `style_tokens`, `layout_version`, `is_active`) VALUES
(1, 'Classic', 'A clean and simple CV layout', '2025-07-28 14:04:53', NULL, NULL, 1, 1),
(2, 'Modern', 'A stylish CV with bold colors', '2025-07-28 14:04:53', NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwordHash` varchar(72) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `passwordHash`, `createdAt`) VALUES
(1, 'Laura Berisha', 'laura@example.com', 'hashedpassword123', '2025-07-28 14:04:53'),
(2, 'John Doe', 'john@example.com', 'hashedpassword456', '2025-07-28 14:04:53'),
(3, 'Rinesa Gashi', 'rinesagashi@gmail.com', '$2b$10$uRqUju58TNuZU5dIKQNUqO0VyQO1OtSGGqUIJSfRLNyDwSkQs.KBe', '2025-09-03 15:43:49'),
(4, 'Aron Krasniqi', 'aronkrasniqi@gmail.com', '$2b$10$8fOtrq/DgtyQDB6M2GdkYO.qbb7A./xMyS8Ie/2DGSFuDCTEZjmuu', '2025-09-03 15:59:59'),
(5, 'Era Aliasi', 'eraera@gmail.com', '$2b$10$Iah.EDWDkRTg52r.26hlqu8pB4fciE7Ui3fhCQ8W7jAJqI3GtWG6q', '2025-09-03 16:06:10'),
(6, 'Albi Pira', 'albipira@gmail.com', '$2b$10$f.HwVJIRvlkFsl6zmiSdguoUJyvm9ZlcV8AvUsXHgOOB3nw4uSIja', '2025-09-03 16:11:23'),
(7, 'Erina Veliu', 'erinaveliu@gmail.com', '$2b$10$ViuInCsTv7Ovnzotlgbi3OocCWiySfmTHCQJAlr6Ay840wlrvRqUG', '2025-09-03 16:14:39'),
(8, 'Olti Gashi', 'oltigashi@gmail.com', '$2b$10$ft4NQW2Yx8O6n0COn9QQpOgawqGmFC1neMnWxr/b3Z9H1i1toYj8e', '2025-09-03 16:54:23'),
(9, 'Sara Ahmeti', 'saraahmeti@gmail.com', '$2b$10$zxKFTsO.JK4fMfU7pqLGHeZ3JW03PeAfWCzodDFiV2qrKkhUUPoX.', '2025-09-03 17:11:48'),
(10, 'Ria Kastrati', 'riakastrati@gmail.com', '$2b$10$ZATP28OIcv3TDGsTftgJZOqU6gc8/tXxkPR7ZKnXvnNsvlTcRUtlu', '2025-09-03 17:14:20'),
(11, 'Erza Braina', 'erzabraina@gmail.com', '$2b$10$QbaDf37fkKuH0tnr.MCauux/UQUcXbtzyPmHbMCEUja70V4XcLX0a', '2025-09-03 17:31:14'),
(12, 'Doresa Sopi', 'doresasopi@gmail.com', '$2b$10$NW1mbQXFYU6KoANM.G17Ju3iGvASyXHnG2tZgTO94BZxW3Lc17SUC', '2025-09-03 17:48:58'),
(13, 'Nora Gashi', 'noragashi@gmail.com', '$2b$10$YhUrlpsQXTYwAR6je4dl1u/dlnHisFSIs2OwSQiasEUW2unlygTvW', '2025-09-03 17:56:40'),
(14, 'Dafina Mehmeti', 'dafinamehmeti@gmail.com', '$2b$10$iyXv3umYCcP044EveM/dJu2HmzBBNKhsDbDNnETGkqg2K2lLDJfYq', '2025-09-03 18:02:53'),
(15, 'Eda Zeka', 'edazeka@gmail.com', '$2b$10$4uk1y1wgUZHA/tEp0YsvNuuCjLGyB5bvl94f9n2A6F6t2LKFDabk2', '2025-09-03 18:14:40'),
(16, 'Rumejsa Gashi', 'rumejsagashi@gmail.com', '$2b$10$n23tOBg6ZE98.yWMSi5Q7O9f0eMamZT4rU7z6B0sB2NZALTw08dka', '2025-09-03 18:21:04'),
(17, 'Adea Ibrahimi', 'adeaibrahimi@gmail.com', '$2b$10$y75OkGT4rbq9knOheBthWO8RcP/dQdrDAPvuBaEK6VYRym8.nihW6', '2025-09-03 20:46:31'),
(18, 'Zara Yla', 'zarayla@gmail.com', '$2b$10$3Oi.TmR6gGS0EoyN1vW91e7B4jWcRcqqR51mElpFlRN62tZYaQVQG', '2025-09-03 20:56:52'),
(19, 'Sia Werry', 'siawerry@gmail.com', '$2b$10$jboDqvYCaIU6qOcoGgK9PeQPdD5pgEnEfsSENC/ETMR4e3FdKTLjC', '2025-09-03 21:47:44'),
(20, 'Mia Kelly', 'miakelly@gmail.com', '$2b$10$t3obCB9Qyj0qiM16T1QRNOd3GUydhul6OElpw21zxI6kogp9ScYyy', '2025-09-03 21:54:01'),
(21, 'Administrator', 'admin@example.com', '$2b$10$O.jrDlDLdxzmgAQ4Q.uZk.WrvD3hBQhNU8ckFnBCEuTRK7ydVsCim', '2025-10-08 15:26:39');


CREATE TABLE template_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  templateName VARCHAR(120) NOT NULL,
  description TEXT NULL,
  inspiration_file_url VARCHAR(255) NULL,
  createdBy INT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `cvs`
--
ALTER TABLE `cvs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `templateId` (`templateId`);

--
-- Indexes for table `education`
--
ALTER TABLE `education`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cvId` (`cvId`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cvId` (`cvId`);

--
-- Indexes for table `interests`
--
ALTER TABLE `interests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cvId` (`cvId`);

--
-- Indexes for table `personaldetails`
--
ALTER TABLE `personaldetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_personaldetails_cv` (`cvId`);

--
-- Indexes for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_refreshtokens_tokenHash` (`tokenHash`),
  ADD KEY `idx_refreshtokens_user_expires` (`userId`,`expiresAt`),
  ADD KEY `idx_refreshtokens_replacedBy` (`replacedByTokenHash`);

--
-- Indexes for table `resumes`
--
ALTER TABLE `resumes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_resumes_user_id` (`user_id`),
  ADD KEY `idx_resumes_template_id` (`template_id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cvId` (`cvId`);

--
-- Indexes for table `templates`
--
ALTER TABLE `templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cvs`
--
ALTER TABLE `cvs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `education`
--
ALTER TABLE `education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `interests`
--
ALTER TABLE `interests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `personaldetails`
--
ALTER TABLE `personaldetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1291;

--
-- AUTO_INCREMENT for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resumes`
--
ALTER TABLE `resumes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `templates`
--
ALTER TABLE `templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `fk_contact_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `cvs`
--
ALTER TABLE `cvs`
  ADD CONSTRAINT `fk_cvs_template` FOREIGN KEY (`templateId`) REFERENCES `templates` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cvs_user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `education`
--
ALTER TABLE `education`
  ADD CONSTRAINT `fk_education_cv` FOREIGN KEY (`cvId`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `experiences`
--
ALTER TABLE `experiences`
  ADD CONSTRAINT `fk_experiences_cv` FOREIGN KEY (`cvId`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `interests`
--
ALTER TABLE `interests`
  ADD CONSTRAINT `fk_interests_cv` FOREIGN KEY (`cvId`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `personaldetails`
--
ALTER TABLE `personaldetails`
  ADD CONSTRAINT `fk_personal_cv` FOREIGN KEY (`cvId`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `refreshtokens`
--
ALTER TABLE `refreshtokens`
  ADD CONSTRAINT `fk_refreshtokens_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `resumes`
--
ALTER TABLE `resumes`
  ADD CONSTRAINT `fk_resumes_template` FOREIGN KEY (`template_id`) REFERENCES `templates` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_resumes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `skills`
--
ALTER TABLE `skills`
  ADD CONSTRAINT `fk_skills_cv` FOREIGN KEY (`cvId`) REFERENCES `cvs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

ALTER TABLE cvs
MODIFY templateId INT NULL;

ALTER TABLE cvs
  DROP FOREIGN KEY fk_cvs_template;

ALTER TABLE cvs
  ADD CONSTRAINT fk_cvs_template
    FOREIGN KEY (templateId)
    REFERENCES templates(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

UPDATE cvs
SET templateId = NULL
WHERE templateId = 1;

ALTER TABLE users
  ADD COLUMN role ENUM('admin', 'user') NOT NULL DEFAULT 'user';

ALTER TABLE templates 
ADD templateKey VARCHAR(50) NULL;

ALTER TABLE personaldetails
  ADD COLUMN objective TEXT NULL AFTER city;

ALTER TABLE personaldetails
  ADD COLUMN photo_url VARCHAR(255) DEFAULT NULL;

/*NEW QUERY*/
ALTER TABLE cvs
  ADD COLUMN status ENUM('draft','final') NOT NULL DEFAULT 'draft',
  ADD COLUMN is_draft TINYINT NULL,
  ADD COLUMN completed_at TIMESTAMP NULL DEFAULT NULL;

UPDATE cvs
SET status='final', is_draft=NULL
WHERE status='draft' OR status IS NULL;

CREATE UNIQUE INDEX uniq_user_one_draft ON cvs(userId, is_draft);

/*NEW QUERY*/
ALTER TABLE cvs DROP INDEX uniq_user_one_draft;
ALTER TABLE cvs DROP COLUMN is_draft;
