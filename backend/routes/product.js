const express = require("express");
const { addProduct, getAllProducts, getProduct, updateProduct, deleteProduct } = require("../handlers/product-handler");
const router = express.Router();
//Create
router.post("", async (req, res)=>{
    let model = req.body;
    let product = await addProduct(model)
    res.send(product);
});
//Get List
router.get("", async (req, res)=>{
    let products = await getAllProducts()
    res.send(products);
});
//Get by Id
router.get("/:id", async (req, res)=>{
    let id = req.params['id'];
    let result = await getProduct(id)
    res.send(result);
});
//Update
router.put("/:id", async (req, res)=>{
    let model = req.body;
    let id = req.params['id'];
    await updateProduct(id, model)
    res.send({ message: "Cập nhật thành công"});
});
//Delete
router.delete("/:id", async(req, res) => {
    let id = req.params['id'];
    await deleteProduct(id);
    res.send({ message: "Deleted!"})
})

module.exports = router;