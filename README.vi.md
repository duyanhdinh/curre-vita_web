# CurreVita — CV Builder

**Choose your language / Chọn ngôn ngữ:** [English](README.md) · [Tiếng Việt](README.vi.md)

Nuxt 2 · Vue 2 · JavaScript · Composition API · Vuex · Tailwind CSS

## Giới thiệu

CurreVita là ứng dụng web giúp người dùng tìm mẫu CV, chỉnh sửa nội dung và xuất kết quả thành PDF. Repository này chứa phần frontend, được giới thiệu như một dự án portfolio thể hiện khả năng thiết kế component, quản lý state phản ứng, đa ngôn ngữ và dựng tài liệu ngay trên trình duyệt.

## Tính năng

- **Tìm mẫu CV:** tìm kiếm theo tên, lọc theo màu sắc và phong cách, xem trước mẫu trước khi chỉnh sửa.
- **Chỉnh sửa CV trực tiếp:** sửa văn bản ngay trên tài liệu; thêm, xóa và đổi thứ tự các khối nội dung; cập nhật bố cục qua nhiều trang.
- **Cá nhân hóa:** đổi màu, font chữ, tải ảnh đại diện và cắt ảnh theo khung của mẫu.
- **Xem trước và tải PDF:** chụp tài liệu đã render bằng `dom-to-image`, sau đó tạo PDF nhiều trang bằng `jsPDF`.
- **Giao diện Anh–Việt:** dịch nội dung giao diện, dữ liệu mẫu và các tùy chọn tìm kiếm.
- **Tích hợp tài khoản:** form đăng nhập, đăng ký, tích hợp xác thực Google/GitHub và gọi API để tải, lưu CV.

Mẫu editor đã được triển khai là **British Shorthair**, tại `/resume/british-shorthair`. Editor yêu cầu đăng nhập và hiện hỗ trợ màn hình desktop (breakpoint `lg` trở lên).

## Công nghệ sử dụng

| Nhóm | Công nghệ | Vai trò trong dự án |
| --- | --- | --- |
| Nền tảng ứng dụng | Nuxt 2, Vue 2, JavaScript | Render phía server, định tuyến theo file, layout và Vue single-file component |
| Logic component | `@nuxtjs/composition-api` | State phản ứng, computed, lifecycle hook và context dùng chung |
| Quản lý state | Vuex | Các module riêng cho xác thực, chỉnh sửa CV, tìm kiếm, màu sắc, từ điển và modal |
| Giao diện | Tailwind CSS, CSS tùy chỉnh | Dựng layout bằng utility class, tùy biến theme và định dạng tài liệu |
| Nội dung nội bộ | `@nuxt/content` | Danh mục mẫu từ JSON, dữ liệu tìm kiếm/bộ lọc và từ điển đa ngôn ngữ |
| Đa ngôn ngữ | `@nuxtjs/i18n` | Chuyển ngôn ngữ Anh–Việt và tải bản dịch theo nhu cầu |
| API và xác thực | `@nuxtjs/axios`, `vue-authenticate`, `cookie-universal-nuxt` | Gọi backend, tích hợp OAuth và quản lý trạng thái xác thực qua cookie |
| Form và tương tác | VeeValidate, reCAPTCHA v3, `vue-js-modal`, `v-tooltip`, Epic Spinners | Kiểm tra dữ liệu, tích hợp xác minh, modal, tooltip và trạng thái loading |
| Xử lý ảnh và PDF | Cropper.js, `dom-to-image`, `jsPDF` | Cắt ảnh đại diện, chụp DOM và tạo PDF trên trình duyệt |
| Công cụ phát triển | Jest, Vue Test Utils, ESLint, Prettier | Kiểm thử component, lint và công cụ định dạng code |
| Đóng gói | Docker, Yarn | Build container nhiều giai đoạn và cài dependency theo lockfile |

## Kiến trúc frontend

Editor kết nối các Vue component với Vuex thông qua những service được inject như `$resume`, `$dictionary` và `$api`. Component hiển thị tài liệu và xử lý tương tác; `core/` cung cấp thao tác chỉnh sửa và các hàm gọi API; các module store quản lý state ứng dụng.

```text
pages/          Route cho danh mục mẫu và editor CV
layouts/        Layout chung và layout editor có xác thực
components/     Nội dung chỉnh sửa, các phần mẫu CV, card, form và modal
core/           Thao tác với CV và các hàm gọi backend API
store/          Module Vuex cho editor, tìm kiếm, xác thực và state giao diện
plugins/        Service được inject và tích hợp thư viện
content/        Thông tin mẫu, nội dung mẫu và từ điển Anh–Việt
assets/         CSS, script, font và tài nguyên SVG
test/           Kiểm thử component
jest/           Cấu hình, mock và helper cho kiểm thử
```

Các điểm bắt đầu phù hợp khi xem code frontend:

- [Component chỉnh sửa văn bản](components/Wrap/Text.vue): hành vi sửa nội dung trực tiếp.
- [Store của editor](store/resume/edit/): cập nhật nội dung, cá nhân hóa và state trang.
- [Thao tác chỉnh sửa trang](core/resume/common/edit/pages.js): giao diện gọi các thao tác bố cục trang.
- [Mẫu British Shorthair](pages/resume/british-shorthair.vue): bố cục tài liệu và render theo state.
- [Plugin xuất PDF](plugins/html2pdf.js): chụp DOM, tạo nhiều trang, xem trước và tải xuống.
- [Kiểm thử component](test/components/): kiểm thử nội dung chỉnh sửa, modal xác thực, card mẫu CV và giao diện dùng chung.

## Chạy trên máy local

Dockerfile của repository sử dụng **Node.js 16**. Dùng môi trường tương thích và **Yarn Classic** để tái lập dự án Nuxt 2 này.

```bash
yarn install --frozen-lockfile
```

Sao chép `.env.example` thành `.env`, sau đó điền cấu hình cho môi trường của bạn. Với PowerShell:

```powershell
Copy-Item .env.example .env
```

| Biến | Mục đích |
| --- | --- |
| `WEB_URL` | URL frontend, ví dụ `http://localhost:3000/` |
| `API_URL` | URL gốc của backend được Nuxt và các plugin API sử dụng |
| `RECAPTCHA_SITE_KEY` | Site key để tích hợp reCAPTCHA |
| `GITHUB_CLIENT_ID`, `GITHUB_CALL_BACK` | Cấu hình GitHub OAuth |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CALL_BACK` | Cấu hình Google OAuth |
| `TWITTER_AUTHOR` | Cấu hình metadata tác giả |

**Lưu ý cấu hình:** `.env.example` hiện khai báo `API_V1_URL`, trong khi ứng dụng đọc `API_URL`. Thêm `API_URL` vào `.env` local với URL backend phù hợp.

```bash
yarn dev
```

Mở `http://localhost:3000`. Danh mục mẫu sử dụng nội dung có sẵn trong repository. Đăng nhập, tải CV đã lưu và lưu chỉnh sửa cần backend tương thích được quản lý riêng. OAuth và reCAPTCHA cũng cần cấu hình dịch vụ tương ứng; editor chưa phải bản demo chạy độc lập offline.

## Các lệnh của dự án

| Lệnh | Mục đích |
| --- | --- |
| `yarn dev` | Chạy server phát triển với hot reload |
| `yarn build` | Build ứng dụng render phía server |
| `yarn start` | Chạy server production sau khi build |
| `yarn generate` | Sinh bản static; các luồng phụ thuộc backend vẫn cần API |
| `yarn test` | Chạy kiểm thử component bằng Jest và thu thập coverage |
| `yarn lint` | Chạy ESLint và tự động sửa lỗi |
