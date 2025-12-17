# AMIS Recruitment Application

Ứng dụng quản lý tuyển dụng được xây dựng bằng HTML, CSS và JavaScript thuần.

## Tính năng chính

### Quản lý ứng viên
- Thêm mới ứng viên với đầy đủ thông tin cá nhân
- Chỉnh sửa thông tin ứng viên
- Xóa ứng viên (đơn lẻ hoặc hàng loạt)
- Hiển thị danh sách ứng viên dạng bảng

### Tìm kiếm và lọc
- Tìm kiếm nhanh theo từ khóa
- Lọc ứng viên theo nhiều tiêu chí
- Phân trang với tùy chọn số bản ghi trên trang

### Giao diện
- Thiết kế responsive, tương thích nhiều thiết bị
- Checkbox hỗ trợ chọn nhiều ứng viên
- Highlight hàng khi được chọn
- Toast notification cho các thao tác

### Lưu trữ
- Sử dụng LocalStorage để lưu trữ dữ liệu
- Dữ liệu mẫu tự động khởi tạo lần đầu

## Cấu trúc thư mục

```
├── assets/
│   ├── css/
│   │   ├── common.css      # CSS chung
│   │   ├── icons.css       # CSS cho icons
│   │   ├── style.css       # CSS chính
│   │   └── main.css        # CSS bổ sung
│   ├── js/
│   │   ├── components/     # Các component UI
│   │   ├── controllers/    # Controllers
│   │   ├── data/          # Dữ liệu mẫu
│   │   ├── modules/       # Business modules
│   │   ├── services/      # Services
│   │   ├── utils/         # Utilities
│   │   └── main.js        # Entry point
│   ├── images/            # Hình ảnh
│   └── ICONS/             # Icon sprites
├── index.html             # Trang chính
└── README.md
```

## Hướng dẫn sử dụng

### Cài đặt

1. Clone repository
2. Mở file index.html bằng trình duyệt web

Không cần cài đặt thêm dependencies vì dự án sử dụng HTML/CSS/JS thuần.

### Sử dụng

#### Thêm ứng viên mới
1. Click nút "Thêm" ở góc trên bên phải
2. Điền thông tin ứng viên vào form
3. Click "Lưu" để lưu ứng viên

#### Chỉnh sửa ứng viên
1. Double-click vào hàng ứng viên cần sửa
2. Cập nhật thông tin trong form
3. Click "Lưu" để cập nhật

#### Xóa ứng viên
- Xóa đơn lẻ: Click icon xóa trên hàng ứng viên
- Xóa hàng loạt:
  1. Tích checkbox các ứng viên cần xóa
  2. Click nút "Xóa" xuất hiện ở thanh filter
  3. Xác nhận xóa

#### Tìm kiếm và lọc
- Tìm kiếm: Nhập từ khóa vào ô tìm kiếm
- Lọc: Click icon lọc, chọn điều kiện lọc và áp dụng
- Phân trang: Chọn số bản ghi/trang và điều hướng giữa các trang

## Công nghệ sử dụng

- HTML5
- CSS3 (với CSS Variables, Flexbox, Grid)
- JavaScript ES6+
- LocalStorage API
- No frameworks, no build tools

## Tính năng nổi bật

- Module pattern để tổ chức code
- Component-based architecture
- Event-driven programming
- Responsive design
- Form validation
- Toast notifications
- Popup modals
- Checkbox selection với highlight
- Bulk delete operations
- Client-side pagination
- Real-time search

## Trình duyệt hỗ trợ

- Chrome (recommended)
- Firefox
- Edge
- Safari

## Tác giả

MISA Training Project

## Giấy phép

Private - For training purposes only
