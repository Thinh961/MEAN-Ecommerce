const express = require("express");
const router = express.Router();
// const Category = require("./../db/category");
const { addCategory, updateCategory, deleteCategory, getCategories, getCategoryById } = require("../handlers/category-handler");
//Create
router.post("", async (req, res)=>{
    let model = req.body;
    let result = await addCategory(model)
    res.send(result);
});
//Get List
router.get("", async (req, res)=>{
    let result = await getCategories()
    res.send(result);
});
//Get by Id
router.get("/:id", async (req, res)=>{
    let id = req.params['id'];
    let result = await getCategoryById(id)
    res.send(result);
});
//Update
router.put("/:id", async (req, res)=>{
    let model = req.body;
    let id = req.params['id'];
    await updateCategory(id, model)
    res.send({ message: "Cập nhật thành công"});
});
//Delete
router.delete("/:id", async(req, res) => {
    let id = req.params['id'];
    await deleteCategory(id);
    res.send({ message: "Deleted!"})
})


module.exports = router;