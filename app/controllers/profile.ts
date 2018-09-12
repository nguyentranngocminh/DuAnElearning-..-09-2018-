/**
 * Mục đích: Quản lý thông tin cá nhân
 */
import * as $ from 'jquery';
import { LayLocalStore, LuuLocalStore } from './taikhoan';
import { NguoiDung } from '../models/NguoiDung';
import { NguoiDungService } from '../services/NguoiDungService';
import { TinNhan } from '../helpers/notification';
import { LayKhoaHocDaGhiDanh } from './khoahoc';

// Khai báo đối tượng người dùng service
let nguoiDungService = new NguoiDungService();

export function CapNhatThongTinNguoiDung() {
    let nguoiDung: NguoiDung = LayThongTinNguoiDung();
    nguoiDungService.CapNhatNguoiDung(nguoiDung).done(function (response) {
        if (response) {
            TinNhan('Cập nhật thông tin cá nhân thành công!', '', 'success');
            $(".btnClose").trigger("click");
            LuuLocalStore(nguoiDung);
            LoadThongTinNguoiDung();
        }
        else {
            TinNhan('Cập nhật thông tin cá nhân thất bại!', '', 'error');
        }
    }).fail(function (err) {
        console.log(err);
    });
}

/**
 * Hàm load thông tin người dùng từ local store ra form thông tin cá nhân
 */
export function LoadThongTinNguoiDung(): void {
    let nguoiDung: NguoiDung = LayLocalStore();
    if (nguoiDung) {
        $('#proTaiKhoan').val(nguoiDung.TaiKhoan);
        $('#proEmail').val(nguoiDung.Email);
        $('#proHoTen').val(nguoiDung.HoTen);
        $('#proDienThoai').val(nguoiDung.SoDT);
        $('#proLoaiNguoiDung').val(nguoiDung.MaLoaiNguoiDung);
        $('#proTitleName').html(nguoiDung.HoTen);

        LayKhoaHocDaGhiDanh(nguoiDung.TaiKhoan);
    }
    else {
        // Kiểm tra nếu chưa đăng nhập thì chuyển về trang chủ
        location.href = '/';
    }
}

/**
 * Hàm lấy thông tin đăng ký từ người dùng
 */
export function LayThongTinNguoiDung(): NguoiDung {
    let taiKhoan: string = $('#proTaiKhoan').val();
    let email: string = $('#proEmail').val();
    let hoten: string = $('#proHoTen').val();
    let soDT: string = $('#proSoDienThoai').val();
    let maLoaiNguoiDung = $('#proLoaiNguoiDung').val();
    let tenLoaiNguoiDung = $('#proLoaiNguoiDung option:selected').text();

    let nguoiDung = new NguoiDung(taiKhoan, '', hoten, email, soDT, maLoaiNguoiDung, tenLoaiNguoiDung);
    return nguoiDung;
}