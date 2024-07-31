const express = require("express");
const router = express.Router();
// const Brand = require("../db/brand");
const { addBrand, getBrands, getBrand, updateBrand, deleteBrand } = require("../handlers/brand-handler");
//Create
router.post("", async (req, res)=>{
    let model = req.body;
    let result = await addBrand(model)
    res.send(result);
});
//Get List
router.get("", async (req, res)=>{
    let listBrands = await getBrands()
    res.send(listBrands);
});
//Get by Id
router.get("/:id", async (req, res)=>{
    let id = req.params['id'];
    let brand = await getBrand(id)
    res.send(brand);
});
//Update
router.put("/:id", async (req, res)=>{
    let model = req.body;
    let id = req.params['id'];
    await updateBrand(id, model)
    res.send({ message: "Cập nhật thành công"});
});
//Delete
router.delete("/:id", async(req, res) => {
    let id = req.params['id'];
    await deleteBrand(id);
    res.send({ message: "Deleted!"})
})


module.exports = router;