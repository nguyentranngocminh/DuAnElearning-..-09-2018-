/**
 * Mục đích: Quản lý người dùng
 */
import * as $ from 'jquery';
import { NguoiDungService } from '../services/NguoiDungService';
import { NguoiDung } from '../models/NguoiDung';
import { TinNhan } from '../helpers/notification';
import { ThongTinDangNhap } from '../models/ThongTinDangNhap';

// Khai báo đối tượng người dùng service
let nguoiDungService = new NguoiDungService();

/**
 * Hàm xử lý khi click vào nút đăng ký
 */
export function XuLyDangKy(): void {
    let nguoiDung: NguoiDung = LayThongTinDangKy();
    nguoiDungService.DangKy(nguoiDung).done(function (response) {
        if (response) {
            TinNhan('Đăng ký thành công!', '', 'success');
            $(".btnClose").trigger("click");
        }
        else {
            TinNhan('Đăng ký thất bại!', '', 'error');
        }
    }).fail(function (err) {
        console.log(err);
    });
}


/**
 * Hàm xử lý khi click vào nút đăng nhập
 */
export function XuLyDangNhap(): void {
    let taiKhoan: ThongTinDangNhap = LayThongTinDangNhap();
    nguoiDungService.DangNhap(taiKhoan).done(function (response) {
        if (response === 'failed to login') {
            TinNhan('Sai tên đăng nhập hoặc mật khẩu!', '', 'error');
        }
        else {
            TinNhan('Đăng nhập thành công!', '', 'success');
            LuuLocalStore(<NguoiDung>response);
            KiemTraDangNhap();
            $(".btnClose").trigger("click");
        }
    }).fail(function (err) {
        console.log(err);
    });
}

/**
 * Hàm xử lý khi click vào nút đăng nhập
 */
export function XuLyDangXuat(): void {
    localStorage.removeItem('TaiKhoan');
    KiemTraDangNhap();
}

/**
 * Hàm lấy thông tin đăng ký từ người dùng
 */
export function LayThongTinDangKy(): NguoiDung {
    let taiKhoan: string = $('#dkTaiKhoan').val();
    let email: string = $('#dkEmail').val();
    let hoten: string = $('#dkHoTen').val();
    let matKhau: string = $('#dkMatKhau').val();
    let soDT: string = $('#dkSoDienThoai').val();
    let maLoaiNguoiDung = $('#dkLoaiNguoiDung').val();
    let tenLoaiNguoiDung = $('#dkLoaiNguoiDung option:selected').text();

    let nguoiDung = new NguoiDung(taiKhoan, matKhau, hoten, email, soDT, maLoaiNguoiDung, tenLoaiNguoiDung);
    return nguoiDung;
}

/**
 * Hàm lấy thông tin đăng nhập từ người dùng
 */
export function LayThongTinDangNhap(): ThongTinDangNhap {
    let taiKhoan: string = $('#dnTaiKhoan').val();
    let matKhau: string = $('#dnMatKhau').val();

    let thongTinDangNhap = new ThongTinDangNhap(taiKhoan, matKhau);
    return thongTinDangNhap;
}

/**
 * Hàm lưu thông tin đăng nhập vào localstore
 */
export function LuuLocalStore(taiKhoan: NguoiDung): void {
    let strTaiKhoan: string = JSON.stringify(taiKhoan);
    localStorage.setItem('TaiKhoan', strTaiKhoan);
}

/**
 * Hàm lấy thông tin đăng nhập từ localstore
 */
export function LayLocalStore(): NguoiDung {
    let store: string = localStorage.getItem('TaiKhoan');
    let taiKhoan = <NguoiDung>JSON.parse(store);
    if(taiKhoan) return taiKhoan[0];
    return null;
}

/**
 * Hàm lấy thông tin đăng nhập từ localstore
 */
export function KiemTraDangNhap(): void {
    let taiKhoan = LayLocalStore();
    if(taiKhoan){
        $('.dangki > ul').html(`
            <li>
                <div class="dropdown d-inline-block">
                    <a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="menu_icon">
                            <i class="fa fa-user-o"></i>
                            <span class="ml-2">${taiKhoan.HoTen}</span>
                        </div>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a class="dropdown-item" href="profile.html">Thông tin cá nhân</a>
                        <a class="dropdown-item" id="btnLogOut">Đăng xuất</a>
                    </div>
                </div>
            </li>
        `);
    }
    else{
        $('.dangki > ul').html(`
            <li>
                <a id="btnLoginModal" class="btn " data-toggle="modal">
                    <div class="menu_icon">
                        <i class="fa fa-pencil-square"></i>
                        <span>Đăng nhập</span>
                    </div>
                </a>
            </li>
            <li>
                <a id="btnRegisterModal" class="btn " data-toggle="modal">
                    <div class="menu_icon">
                        <i class="fa fa-pencil-square"></i>
                        <span>Đăng ký</span>
                    </div>
                </a>
            </li>
        `);
    }
    
}