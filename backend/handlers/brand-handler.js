const Brand = require("../db/brand");

async function addBrand(model){
    let brand = new Brand({
        name: model.name
    });
    await brand.save();
    return brand.toObject();
}

async function getBrands(){
    let brands = await Brand.find();
    return brands.map((item) => item.toObject());
}

async function getBrand(id){
    let brand = await Brand.findById(id);
    return brand.toObject();
}

async function updateBrand(id, model){
    await Brand.findByIdAndUpdate(id, model);
    return;
}

async function deleteBrand(id){
    await Brand.findByIdAndDelete(id);
    return;
}

module.exports = { addBrand, updateBrand, deleteBrand, getBrands, getBrand }