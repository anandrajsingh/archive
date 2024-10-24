const express = require("express")
const Product = require("../models/products")

const productRouter = express.Router()

productRouter.get("/", async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === 'true' ? true: false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
            queryObject[field] = { [operator]: Number(value) };
            }
        });
    }

    console.log(queryObject)

    let products = await Product.find(queryObject)
    console.log(products)
    
    if(sort){
        const sortList =sort.split(',').join(' ')
        products = products.sort(sortList)
    }else{
        products = products.sort()
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    res.json(products)
})

productRouter.post("/", async (req, res) => {
    const id = req.body.id
    const product = await Product.findOne({_id:id})
    res.json(product)
})

module.exports = productRouter