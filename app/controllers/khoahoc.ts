/**
 * Mục đích: Quản lý khóa học
 */
import * as $ from 'jquery';
import { DanhSachKhoaHoc } from "../models/DanhSachKhoaHoc";
import { KhoaHocService } from "../services/KhoaHocService";
import { KhoaHoc } from "../models/KhoaHoc";
import { LayLocalStore } from './taikhoan';
import { ThongBao, TinNhan } from '../helpers/notification';

let dsKhoaHocs = new DanhSachKhoaHoc();
let khoaHocService = new KhoaHocService();

export function LayDanhSachKhoaHocTuServer(): void {
    khoaHocService.LayDanhSachKhoaHoc().done(function (response) {
        dsKhoaHocs.DSKhoaHoc = <KhoaHoc[]>response;
        HienThiDanhSachKhoaHocTrangChu(dsKhoaHocs.DSKhoaHoc);
    }).fail(function (err) {
        console.log(err);
    });
}

export function HienThiDanhSachKhoaHocTrangChu(mangKhoaHoc: KhoaHoc[]): void {
    let html:string = '';
    for (let item of mangKhoaHoc) {
        if(item.HinhAnh && item.HinhAnh.length > 0){
            html += `
                <div class="col-md-4 pb-3">
                    <div class="subject__item">
                        <div class="subject__img">
                            <img src="${item.HinhAnh}" alt="">
                        </div>
                        <div class="subject__text">
                            <a href="chi-tiet-khoa-hoc.html">
                                <h3 class="txtTenKhoaHoc">${item.TenKhoaHoc}</h3>
                            </a>
                            <div class="danhgia m-1">
                                <span><i class="fa fa-users"></i></span>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <div class="giangvien m-1">
                                <span>Giảng viên:</span>
                                <span id="txtTenGiangVien">${item.NguoiTao}</span>
                            </div>
                            <div class="dongia m-1">
                                <span class="mr-2">Đơn giá:</span><span class="txtGiaTien ">$99.00</span>
                            </div>
                            <div class="luotxem">
                                <span class="text-right"><i class="fa fa-eye"></i>${item.LuotXem} lượt xem</span>
                            </div>
                            <button type="button" data-id="${item.MaKhoaHoc}" data-name="${item.TenKhoaHoc}" class="btn btn-success btnGhiDanhKhoaHoc m-2">Đăng Kí</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    $('#homeDanhSachKhoaHoc').html(html);
}

export function LayKhoaHocDaGhiDanh(taikhoan: string): any{
    khoaHocService.LayKhoaHocDaGhiDanh(taikhoan)
    .then(response => {
        khoaHocService.LayDanhSachKhoaHoc().done(function (res) {
            dsKhoaHocs.DSKhoaHoc = <KhoaHoc[]>res;
            HienThiKhoaHocDaGhiDanh(dsKhoaHocs.LayKhoaHocDaGhiDanh(response));
        }).fail(function (err) {
            console.log(err);
        });
    })
    .catch(err => console.log(err));
}

export function HienThiKhoaHocDaGhiDanh(mangKhoaHoc: KhoaHoc[]): void {
    let html:string = '';
    for (let item of mangKhoaHoc) {
        if(item.HinhAnh && item.HinhAnh.length > 0){
            html += `
                <div class="col-md-4 pb-3">
                    <div class="subject__item">
                        <div class="subject__img">
                            <img src="${item.HinhAnh}" alt="">
                        </div>
                        <div class="subject__text">
                            <a href="chi-tiet-khoa-hoc.html">
                                <h3 class="txtTenKhoaHoc">${item.TenKhoaHoc}</h3>
                            </a>
                            <div class="danhgia m-1">
                                <span><i class="fa fa-users"></i></span>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <div class="giangvien m-1">
                                <span>Giảng viên:</span>
                                <span id="txtTenGiangVien">${item.NguoiTao}</span>
                            </div>
                            <div class="dongia m-1">
                                <span class="mr-2">Đơn giá:</span><span class="txtGiaTien ">$99.00</span>
                            </div>
                            <div class="luotxem">
                                <span class="text-right"><i class="fa fa-eye"></i>${item.LuotXem} lượt xem</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    $('#divKhoaHocCuaToi').html(html);
}

export function KiemTraKhoaHocDaGhiDanh(maKH:string, mangKhoaHoc: any[]){
    for(let item of mangKhoaHoc){
        if(item.MaKhoaHoc === maKH) 
        return true;
    }
    return false;
}

export function GhiDanhKhoaHoc(maKhoaHoc, tenKhoaHoc): void{
    let nguoiDung = LayLocalStore();
    if(!nguoiDung){
        ThongBao("Vui lòng đăng nhập trước khi ghi danh khóa học!").then((result) => {
            if(result.value){
                $('#LoginModal').modal('show');
            }
        });
    }
    else{
        khoaHocService.LayKhoaHocDaGhiDanh(nguoiDung.TaiKhoan)
        .then(response => {
            let result: boolean = KiemTraKhoaHocDaGhiDanh(maKhoaHoc, response);
            if(result){
                TinNhan(`Khóa học này đã được ghi danh!`, '', 'error');
            }
            else{
                ThongBao("Bạn có muốn ghi danh vào khóa học này?").then((result) => {
                    if(result.value){
                        khoaHocService.GhiDanhKhoaHoc(maKhoaHoc, nguoiDung.TaiKhoan).done(function (response) {
                            TinNhan(`Bạn đã ghi danh thành công vào khóa học ${tenKhoaHoc}!`, '', 'success');
                        }).fail(function (err) {
                            console.log(err);
                        });
                    }
                });
            }
        })
        .catch(err => console.log(err));
    }
}

export function ChiTietKhoaHoc(maKhoaHoc: string): void{
    khoaHocService.LayChiTietKhoaHoc(maKhoaHoc).done(response => {
        HienThiChiTietKhoaHoc(<KhoaHoc>response);
    }).fail(err => console.log(err));
}

export function HienThiChiTietKhoaHoc(khoaHoc: KhoaHoc): void{
    let html = '';
    html += `
    <div class="row">
        <div class="col-md-6 text-center mb-5">
            <h1 class="txtTenKhoaHoc text-success">${khoaHoc.TenKhoaHoc}</h1>
            <img src="${khoaHoc.HinhAnh}" alt="">
        </div>
        <div class="col-md-6">
            <div class="subject__info">
                <h2>Course Information</h2>
                <ul>
                    <li>Mã khóa học:
                        <span>${khoaHoc.MaKhoaHoc}</span>
                    </li>
                    <li>Giảng viên:
                        <span>${khoaHoc.NguoiTao}</span>
                    </li>
                    <li>Lượt xem:
                        <span>${khoaHoc.LuotXem}</span>
                    </li>
                    <li>Giá tiền
                        <span>$99.00</span>
                    </li>
                </ul>
                <div class="button text-center">
                    <button type="button" data-id="${khoaHoc.MaKhoaHoc}" data-name="${khoaHoc.TenKhoaHoc}" class="btn btn-success btnGhiDanhKhoaHoc">Đăng Ký</button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <div class="menuTab">
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#Skill">Chi tiết khóa học</a>
                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane container active" id="Skill">
                        <p class="pt-4">${khoaHoc.MoTa}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    $('#divChiTietKhoaHoc').html(html);
}