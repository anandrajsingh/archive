const { default: mongoose } = require("mongoose")
const Product = require("./models/products")
const jsonProducts = require('./products.json')

const start = async() => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecom").then(() => {
            console.log("DB connected")
        })
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log("success")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()