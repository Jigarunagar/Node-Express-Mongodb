const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/", createUser);   // ➕ Create
router.get("/", getUsers);      // 📄 Get All
router.get("/:id", getUser);    // 📄 Get One
router.put("/:id", updateUser); // ✏️ Update
router.delete("/:id", deleteUser); // ❌ Delete

module.exports = router;
