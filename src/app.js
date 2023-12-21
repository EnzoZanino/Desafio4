import express from "express";
import handlebars from "express-handlebars";
import __dirname from './dirname.js'

import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
// import productsRouter from "./routes/ZZZ products.router.js";
// import cartsRouter from "./routes/ZZZ carts.router.js";

import ProductManager from "./dao/fs/productManager.js";
import CartManager from "./dao/fs/cartManager.js";
// import { ProductManager } from "./dao/ZZZZZZZZZZZZZ ManagersCartProdANT/productManager.js";
// import { CartManager } from "./dao/ZZZZZZZZZZZZZ ManagersCartProdANT/cartManager.js";

import productsViewsRouter from "./routes/views.router.js"
// import viewRouter from "./routes/ZZZ views.router.js";

import path from "path";
import { Server } from "socket.io";
import mongoose from "mongoose";

import mongoProductsRouter from "./routes/mongoProducts.js";
import chatRouter from "./routes/chat.router.js";
import ChatManager from "./dao/mongo/chatManager.js"
//! ----------------------------------------------------------------------------------------

const app = express();
const PORT = 5000;

	mongoose
		.connect("mongodb://127.0.0.1:27017/ecommerce")
		.then(() => console.log("DB connected"))
		.catch((err) => console.log(err));

// * EN CONJUNTO [httpServer] *
const httpServer = app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
const socketServer = new Server(httpServer);
// * EN CONJUNTO [httpServer] *

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//TODO ----------------------------------------------------------------------------------------
app.engine(
	"hbs",
	handlebars.engine({
		extname: "hbs",
		defaultLayout: "main",
	})
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
//TODO ----------------------------------------------------------------------------------------

app.use(express.static(`${__dirname}/public`));

// * ------------------------------------------------------------------------------------------
app.use((req, res, next) => { req.io = io; next(); });
// // app.use('/api/products', productsRouter)
// // app.use('/api/carts', cartRouter)
app.use('/products', productsViewsRouter)
app.use('/mongo', mongoProductsRouter)
app.use('/chat', chatRouter)
app.use("/", productsViewsRouter);
// app.use("/", viewRouter);
// * ------------------------------------------------------------------------------------------

// const prodManager = new ProductManager("./Productos.json");
// const cartManager = new CartManager("./Carritos.json", prodManager);
// const prodManager = new ProductManager("./db/products.json");
// const cartManager = new CartManager("./db/carts.json");

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
// app.use("/api/products", productsRouter(prodManager));
// app.use("/api/carts", cartsRouter(cartManager, prodManager));

const manager = new ChatManager()

socketServer.on('connection', async socket => {
    console.log(`Cliente ${socket.id} conectado`)
    socket.on('enviarMsg', async msg => {
        await manager.sendMsg(msg)
        socket.broadcast.emit('recibirMsg', msg)
    })
})

// // socketServer.on("connection", (socketServer) => {
// // 	socketServer.on("message", (data) => {
// // 		console.log("Cliente Conectado: ", data);
// // 	});
// // 	socketServer.on("deleteProduct", (productId) => {
// // 		prodManager.deleteProduct(productId);

// // 		socketServer.emit("productDeleted", {
// // 			productId,
// // 		});
// // 	});
// // 	socketServer.on("addProduct", (newProduct) => {
// // 		prodManager.addProduct(newProduct);
// // 		socketServer.emit("productAdded", { newProduct });
// // 	});
// // });

export { socketServer };