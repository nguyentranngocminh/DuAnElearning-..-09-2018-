import { KiemTraDangNhap, LayLocalStore } from './taikhoan';
import * as $ from 'jquery';
import 'popper.js';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css';
import '../helpers/notification';
import './taikhoan';
import { NguoiDung } from '../models/NguoiDung';

// Kiểm tra đăng nhập mỗi khi request
KiemTraDangNhap();

// Mở popup đăng ký
$('body').delegate('#btnRegisterModal', 'click', function(){
    $('#RegisterModal').modal('show')
});

// Mở popup đăng nhập
$('body').delegate('#btnLoginModal', 'click', function(){
    $('#LoginModal').modal('show')
});


