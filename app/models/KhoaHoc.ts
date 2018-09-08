export class KhoaHoc {
    MaKhoaHoc: string;
    TenKhoaHoc: string;
    MoTa: string;
    HinhAnh: string;
    LuotXem: number;
    NguoiTao: string;
    constructor(maKH: string, tenKH: string, moTa: string,
    hinhAnh: string, luotXem: number, nguoiTao: string){
        this.MaKhoaHoc = maKH;
        this.TenKhoaHoc = tenKH;
        this.MoTa = moTa;
        this.HinhAnh = hinhAnh;
        this.LuotXem = luotXem;
        this.NguoiTao = nguoiTao;
    }
}