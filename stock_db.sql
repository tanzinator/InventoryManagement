-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2017 at 07:50 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stock_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products_info`
--

CREATE TABLE `products_info`
(
  `product_id` int
(11) NOT NULL,
  `product_name` text,
  `product_details` text,
  `unit_price` double DEFAULT '0',
  `remain_stock` double DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_in_out_data`
--

CREATE TABLE `product_in_out_data`
(
  `product_in_out_data_id` int
(11) NOT NULL,
  `product_id` int
(11) DEFAULT NULL,
  `in_qty` double DEFAULT NULL,
  `out_qty` double DEFAULT NULL,
  `in_out_type` int
(11) DEFAULT NULL COMMENT '1 for in,2 for Out',
  `in_out_unt_price` double DEFAULT NULL,
  `remarks` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products_info`
--
ALTER TABLE `products_info`
ADD PRIMARY KEY
(`product_id`);

--
-- Indexes for table `product_in_out_data`
--
ALTER TABLE `product_in_out_data`
ADD PRIMARY KEY
(`product_in_out_data_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products_info`
--
ALTER TABLE `products_info`
  MODIFY `product_id` int
(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_in_out_data`
--
ALTER TABLE `product_in_out_data`
  MODIFY `product_in_out_data_id` int
(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


--TANAY SQL'S

-- --------------------------------------------------------

--
-- Table structure for table `outlet`
--

CREATE TABLE `outlet`
(
  `outlet_id` int
(11) NOT NULL AUTO_INCREMENT,
  `outlet_name` text,
  `outlet_gstin` text,
  `outlet_shippingaddress` text,
  `outlet_phone` text,
  `outlet_email` text,
  `outlet_billingaddress` text,
   PRIMARY KEY
(`outlet_id`),
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `vendor`
--

CREATE TABLE `vendor`
(
  `vendor_id` int
(11) NOT NULL AUTO_INCREMENT,
  `vendor_name` text,
  `vendor_phone` text,
  `vendor_email` text,
  `outlet_id` int
(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY
(`vendor_id`),
  FOREIGN KEY
(`outlet_id`) REFERENCES `outlet`
(`outlet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier`
(
  `supplier_id` int
(11) NOT NULL AUTO_INCREMENT,
  `supplier_businessname` text,
  `supplier_address` text,
  `supplier_phone` text,
  `supplier_email` text,
  `supplier_contactname` text,
  `supplier_gstin` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
(`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_order`
--

CREATE TABLE `purchase_order`
(
  `purchase_transaction_id` int
(11) NOT NULL AUTO_INCREMENT,
  `purchase_quantity` double DEFAULT NULL,
  `purchase_price_per_unit_quantity` double DEFAULT NULL,
  `unit_measurement` double DEFAULT NULL,
  `outlet_id` int
(11) NOT NULL,
  `supplier_id` int
(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY
(`purchase_transaction_id`),
  FOREIGN KEY
(`outlet_id`) REFERENCES `outlet`
(`outlet_id`),
  FOREIGN KEY
(`supplier_id`) REFERENCES `supplier`
(`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `raw_material`
--

CREATE TABLE `raw_material`
(
  `raw_material_id` int
(11) NOT NULL AUTO_INCREMENT,
  `raw_material_name` text,
  `primary_unit` text,
  `secondary_unit` text,
  `outlet_name` text,
  `supplier_businessname` text,
  `raw_material_quantity` double DEFAULT NULL,
  `raw_material_price` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
(`raw_material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dispatch_info`
--

CREATE TABLE `dispatch_info`
(
  `dispatch_transaction_id` int
(11) NOT NULL AUTO_INCREMENT,
  `raw_material_name` text,
  `raw_material_quantity_dispatched` double DEFAULT NULL,
  `outlet_from` text,
  `outlet_to` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON
UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY
(`dispatch_transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




