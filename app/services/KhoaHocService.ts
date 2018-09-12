import * as $ from 'jquery';

export class KhoaHocService {

    constructor(){}
    
    public LayDanhSachKhoaHoc(){
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/DanhSachKhoaHoc",
            type: "GET",
            dataType: "JSON"
        });
    }

    public GhiDanhKhoaHoc(maKhoaHoc: string, taiKhoan: string){
        let model = JSON.stringify({MaKhoaHoc: maKhoaHoc, TaiKhoan: taiKhoan});
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/GhiDanhKhoaHoc",
            type: "POST",
            dataType: "JSON",
            contentType: 'application/json',
            data: model
        });
    }

    public async LayKhoaHocDaGhiDanh(taiKhoan: string){
        return await $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/LayThongtinKhoaHoc?taikhoan=" + taiKhoan,
            type: "GET",
            dataType: "JSON"
        });
    }

    public LayChiTietKhoaHoc(maKhoaHoc: string){
        return $.ajax({
            url: "http://sv.myclass.vn/api/QuanLyTrungTam/ChiTietKhoaHoc/" + maKhoaHoc,
            type: "GET",
            dataType: "JSON"
        });
    }
}