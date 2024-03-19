const express = require("express");
const filesPath = require("./constants/files-path");
const cartRouter = require("./routes/cart-router");
const authRouter = require("./routes/auth-router");
const userRouter = require("./routes/user-router");
const tableRouter = require("./routes/table-router");
const orderRouter = require("./routes/order-router");
const itemRouter = require("./routes/item-router");
const addressRouter = require("./routes/address-router");
const bookingRouter = require("./routes/booking-router");

const app = express();

//Setting ejs
app.set("view engine", "ejs");
app.set("views", `${filesPath.VIEWS}`);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(authRouter); // User router for all available routes in it
app.use(userRouter);
app.use(tableRouter); // Table router for all available routes in it
app.use(cartRouter); // cart router for all available routes in it
app.use(orderRouter); // order router for all available routes in it
app.use(itemRouter); // item router for all available routes in it
app.use(addressRouter);
app.use(bookingRouter);

//Catch json syntax error
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err)
    return res.status(400).json({ code: "400", error: "Invalid JSON syntax" });
  else next(err);
});

//Listening to
try {
  const port = process.env.PORT || 6061;
  app.listen(port, "0.0.0.0", () => {
    console.log("The server is running on port:", port);
  });
} catch (e) {
  console.log(e);
}
