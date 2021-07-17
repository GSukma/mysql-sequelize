const express = require("express");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//routes
const goodsRouter = require("./routes/goods");
// const suppliersRouter = require("./routes/supplier");
// const customersRouter = require("./routes/customers");

app.use("/good", goodsRouter);
// app.use("/suppliers", suppliersRouter);
// app.use("/customers", customersRouter);

app.use(errorHandler);

const port = 5000;
app.listen(port, () => console.log(`Server run on port : ${port}`));
