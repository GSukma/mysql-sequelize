const express = require("express");
const fileUpload = require("express-fileupload");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* Enables req.body with form-data */
app.use(fileUpload());
app.use(express.static("public"));

//routes
const goodsRouter = require("./routes/goods");
const suppliersRouter = require("./routes/supplier");
const customersRouter = require("./routes/customers");

app.use("/goods", goodsRouter);
app.use("/suppliers", suppliersRouter);
app.use("/customers", customersRouter);

app.use(errorHandler);

const port = 5000;
app.listen(port, () => console.log(`Server run on port : ${port}`));
