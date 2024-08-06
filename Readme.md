# Đề thi thử số 1 Nodejs Web 503

( Thời gian 60’ )
Yêu cầu:

## 1. Tạo router và Models Books (2đ)

### Tạo router : 1đ

    GET - /books
    POST – /books
    GET - /books /:id
    PUT - / books /:id
    DELETE - / books /:id

### Tạo models Books: 1đ

    name – String, required
    price: Number
    description: String, required
    image: String, required
    author: String, required

## 2. Tạo file phân quyền CheckPermission (1đ)

- Kiểm tra token, verify token và kiểm tra user db

## 3. Xây dựng API CRUD Books (4đ)

- Trả về danh sách sản phẩm: 0.5đ
- Trả về sản phẩm chi tiết theo Id: 0.5đ
- Cập nhật sản phẩm: check quyền: 1đ
- Tạo mới sản phẩm: check quyền 1đ
- Xóa sản phẩm: check quyền: 1đ

## 4. Xây dựng API Auth đăng ký và đăng nhập: (3đ)

### Tạo router : 0.5đ

    POST – /auth/register
    POST – /auth/login

### Tạo models User: 0.5đ

    name – String, required
    email: String, email, required
    password: String, required

### Đăng ký: (1đ)

    Validate email, password, name
    Kiểm tra email tồn tại
    Mã hóa password

### Đăng nhập: (1đ)

    Validate email, password,
    Kiểm tra email tồn tại
    So sánh password
    Tạo ra token
    Trả về token sau khi đăng nhập thành công

# Đề thi thử số 2 Nodejs Web 503

1.Tạo router (0.5đ)

- Hiển thị toàn bộ sản phẩm - /products
- Hiển thị chi tiết sản phẩm - /products/:id
- Thêm sản phẩm - /products
- Cập nhật sản phẩm - /products/:id
- Xoá sản phẩm - /products/:id
- Đăng ký - /signup
- Đăng nhập - /signin

2. Xây dựng api lấy toàn bộ sản phẩm (0.5đ)
3. Xây dựng api lấy chi tiết sản phẩm (0.5đ)
4. Xây dựng api thêm mới sản phẩm

- validate dữ liệu và hiển thị thông báo lỗi (0.5đ)
- thêm sản phẩm vào DB (1đ)
  response lại data kèm message thông báo (0.5đ)

5. Xây dựng api cập nhật sản phẩm

- validate dữ liệu và hiển thị thông báo lỗi (0.5đ)
- cập nhật sản phẩm vào DB (1đ)
- response lại data kèm message thông báo (0.5đ)

6. Xây dựng api xoá sản phẩm

- Xoá sản phẩm thành công (1đ)
- response lại sản phẩm vừa xoá kèm message thông báo (0.5đ)

7. Đăng ký (1đ)

- validate và hiển thị thông báo lỗi
- thêm thành công user vào DB
- response lại data kèm message thông báo

8. Đăng nhập (1đ)

- validate và hiển thị thông báo lỗi
- tạo token và response khi user đăng nhập thành công

9. Check quyền khi thực hiện thêm, sửa, xoá data (1đ)
