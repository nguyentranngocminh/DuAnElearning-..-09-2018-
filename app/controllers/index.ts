import * as $ from 'jquery';
import 'popper.js';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css';
import { KiemTraDangNhap, XuLyDangKy, XuLyDangNhap, XuLyDangXuat } from './taikhoan';
import { LoadThongTinNguoiDung, CapNhatThongTinNguoiDung } from './profile';
import { HienThiDanhSachKhoaHocTrangChu, LayDanhSachKhoaHocTuServer, GhiDanhKhoaHoc, LayKhoaHocDaGhiDanh, ChiTietKhoaHoc } from './khoahoc';

// Kiểm tra đăng nhập mỗi khi request
KiemTraDangNhap();

LoadThongTin();

// Mở popup đăng ký
$('body').delegate('#btnRegisterModal', 'click', function(){
    $('#RegisterModal').modal('show')
});

// Mở popup đăng nhập
$('body').delegate('#btnLoginModal', 'click', function(){
    $('#LoginModal').modal('show')
});

// Đăng ký
$('#btnRegister').click(XuLyDangKy);
// Đăng nhập
$('#btnLogin').click(XuLyDangNhap);
// Đăng xuất
$('body').delegate('#btnLogOut', 'click', XuLyDangXuat);
// Cập nhật thông tin người dùng
$('body').delegate('#btnCapNhatNguoiDung', 'click', CapNhatThongTinNguoiDung);
// Ghi danh khóa học
$('body').delegate('.btnGhiDanhKhoaHoc', 'click', function(){
    let maKhoaHoc = $(this).data('id');
    let tenKhoaHoc = $(this).data('name');
    GhiDanhKhoaHoc(maKhoaHoc, tenKhoaHoc);
});

function LoadThongTin():void{
    let requestUrl = window.location.href;
    if(requestUrl === 'http://localhost:3000/'){
        LayDanhSachKhoaHocTuServer();
    }
    else if(requestUrl === 'http://localhost:3000/profile.html'){
        LoadThongTinNguoiDung();
    }
    else if(requestUrl === 'http://localhost:3000/chi-tiet-khoa-hoc.html'){
        // ChiTietKhoaHoc();
    }
}

