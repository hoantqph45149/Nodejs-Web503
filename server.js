const express = require("express"); //require module express
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql");

// Khai báo sử dụng express
const app = new express();
//khai báo cổng sẽ chạy server
const port = 3000;
// kết nối với cơ sở dữ liệu MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web503Nodejs",
});
db.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    return;
  }
  console.log("Connection established");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Khai báo sử dụng ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/list", (req, res, next) => {
  db.query("select * from products", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.render("list", { pros: result });
  });
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images"); //khai báo đường dẫn thư mục lưu trữ file ảnh
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); //lưu tên file kèm theo thời điểm upload
  },
});
const upload = multer({ storage: storage });

// Thêm router để render trang tạo mới
app.get("/create", (req, res, next) => {
  res.render("create");
});
app.post("/upload", upload.single("img"), (req, res) => {
  let name = req.body.name;
  let price = req.body.price;
  let image = req.file.filename;
  db.query(
    "insert into products(name , price , image) values(?,?,?)",
    [name, price, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("Thêm sản phẩm thành công !");
      }
    }
  );
});
// app.post("/create", (req, res, next) => {
//   console.log(req.body);
//   // Giai phuong trinh bac 2
//   let a = parseFloat(req.body.a);
//   let b = parseFloat(req.body.b);
//   let c = parseFloat(req.body.c);

//   let denta = b * b - 4 * a * c;
//   let x1 = 0;
//   let x2 = 0;

//   if (a == 0) {
//     if (b == 0) {
//       if (c == 0) {
//         res.end("phuong trinh vo so nghiem");
//       } else {
//         res.end("phuong trinh vo nghiem");
//       }
//     } else {
//       x1 = -c / b;
//       res.end("phuong trinh co nghiem duy nhat x = " + x1);
//     }
//   } else {
//     if (denta > 0) {
//       x1 = (-b + Math.sqrt(denta)) / (2 * a);
//       x2 = (-b - Math.sqrt(denta)) / (2 * a);
//       res.end("phuong trinh co x1 = " + x1 + " va x2 = " + x2);
//     } else if (denta === 0) {
//       x1 = x2 = -b / (2 * a);
//       res.end("phuong trinh co nghiem kep x1 = x2 = " + x1);
//     } else {
//       res.end("phuong trinh vo nghiem");
//     }
//   }
// });
app.get("/update/:id", (req, res) => {
  let id = req.params.id;
  db.query("select * from products where id= ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result);
    res.render("update", { pros: result });
  });
});
app.post("/update", upload.single("image"), (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const image = req.file ? req.file.filename : null;

  if (image) {
    // Xóa ảnh cũ nếu có
    const getImageQuery = "SELECT image FROM products WHERE id = ?";
    db.query(getImageQuery, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err });
      }
      const oldImage = result[0].image;
      fs.unlink(`public/images/${oldImage}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

    // Update thông tin sản phẩm có cả ảnh mới
    db.query(
      "UPDATE products SET name = ?, price = ?, image = ? WHERE id = ?",
      [name, price, image, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Lỗi khi cập nhật sản phẩm");
        }
        res.send("Cập nhật thành công");
      }
    );
  } else {
    // Update thông tin sản phẩm không có ảnh mới
    db.query(
      "UPDATE products SET name = ?, price = ? WHERE id = ?",
      [name, price, id],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Lỗi khi cập nhật sản phẩm");
        }
        res.send("Cập nhật thành công");
      }
    );
  }
});
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  db.query("delete from products where id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/list");
  });
});
app.listen(port, () => {
  console.log(`Server đang chạy ở port http://localhost:3000/list`);
});
