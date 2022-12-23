const express = require("express");
const router = express.Router();
const merchantController = require("../controllers/merchant.controller");
const productController = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Merchant Routes
router.get("/merchant", authMiddleware.isAuthenticate, merchantController.getMerchant);
router.get("/merchant/:id", authMiddleware.isAuthenticate, merchantController.getMerchantById);
router.put("/merchant/:id", authMiddleware.isAuthenticate, merchantController.updateMerchant);
router.delete("/merchant/:id", authMiddleware.isAuthenticate, merchantController.deleteMerchant);

// Product Routes
router.post("/merchant/product", authMiddleware.isAuthenticate, productController.addProduct);
router.get("/merchant/:merchantId/product", authMiddleware.isAuthenticate, productController.getProduct);
router.get("/merchant/:merchantId/product/:id", authMiddleware.isAuthenticate, productController.getProductById);
router.put("/merchant/:merchantId/product/:id", authMiddleware.isAuthenticate, productController.updateProduct);
router.delete("/merchant/:merchantId/product/:id", authMiddleware.isAuthenticate, productController.deleteProduct);

// Auth Routes
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;