const expores = require("express");
const mongoose = require("mongoose");
const app = expores();
const port = 3000;
// const cors = require("cors")
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware");

// app.use(cors);

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.sendStatus(204); // No Content
    } else {
        // Pass to next layer of middleware
        next();
    }
});



app.use(expores.json());
app.get("/", (req, res) => {
    res.send("Server running");
})
app.use("/category", verifyToken, isAdmin, categoryRoutes);
app.use("/brand", verifyToken, isAdmin, brandRoutes);
app.use("/product", verifyToken, isAdmin, productRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth", authRoutes);

async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017", {
        dbName: "e-comm-store-db",
    });
    console.log("MongoDb connected");
}

connectDb().catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log("Server running on port", port);
});