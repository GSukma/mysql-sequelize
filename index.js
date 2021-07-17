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
// const goodsRouter = require("./routes/good");
// const suppliersRouter = require("./routes/supplier");
const customers = require("./routes/customers");

// app.use("/goods", goodsRouter);
// app.use("/suppliers", suppliersRouter);
app.use("/customers", customers);

app.use(errorHandler);

const port = 4500;
app.listen(port, () => console.log(`Server run on port : ${port}`));
