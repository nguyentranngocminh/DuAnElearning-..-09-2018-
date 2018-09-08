import { NguoiDung } from "../models/NguoiDung";
import * as $ from 'jquery';
import { ThongTinDangNhap } from "../models/ThongTinDangNhap";

export class NguoiDungService {
    constructor(){}
    
    public DangKy(nguoiDung: NguoiDung) {
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/DangKy",
            type: "POST",
            dataType: "JSON",
            data: nguoiDung
        });
    }

    public DangNhap(taiKhoan: ThongTinDangNhap){
        return $.ajax({
            url: `http://sv.myclass.vn/api/QuanLyTrungTam/DangNhap?taikhoan=${taiKhoan.TaiKhoan}&matkhau=${taiKhoan.MatKhau}`,
            type: "GET",
            dataType: "JSON"
        });
    }

    public LayDanhSachNguoiDung(){
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung",
            type: "GET",
            dataType: "JSON"
        });
    }

    public XoaNguoiDung(taiKhoan: string){
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/" + taiKhoan,
            type: "DELETE",
            dataType: "JSON"
        });
    }
}