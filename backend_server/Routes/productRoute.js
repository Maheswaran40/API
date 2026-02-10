const express=require("express")
const router=express.Router()
const{addData,getData,updateData,deleteData}=require("../middleware/productController")

// API

router.post("/add", addData);
router.get("/list", getData);
router.get("/list", (req, res) => {
  res.json({ message: "LIST ROUTE WORKING" });
});

router.put("/update/:id", updateData);
router.delete("/delete/:id", deleteData);
console.log("✅ productRoute file loaded");
module.exports = router;