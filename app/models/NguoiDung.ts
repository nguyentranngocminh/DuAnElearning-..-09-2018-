export class NguoiDung {
    TaiKhoan: string;
    MatKhau: string;
    HoTen: string;
    Email: string;
    SoDT: string;
    MaLoaiNguoiDung: string;
    TenLoaiNguoiDung: string;
    constructor(taiKhoan: string, matKhau: string, hoTen: string, email: string, soDT: string,
    maLoaiNguoiDung: string, tenLoaiNguoiDung?: string){
        this.TaiKhoan = taiKhoan;
        this.MatKhau = matKhau;
        this.HoTen = hoTen;
        this.Email = email;
        this.SoDT = soDT;
        this.MaLoaiNguoiDung = maLoaiNguoiDung;
        this.TenLoaiNguoiDung = tenLoaiNguoiDung;
    }
}