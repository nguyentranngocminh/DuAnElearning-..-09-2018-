import { NguoiDung } from "./NguoiDung";

export class DanhSachNguoiDung {
    private DSNguoiDung: NguoiDung[];
    constructor(){
        this.DSNguoiDung = [];
    }

    public ThemNguoiDung(nguoiDung: NguoiDung): void {
        this.DSNguoiDung.push(nguoiDung);
    }

    public SuaNguoiDung(nguoiDung: NguoiDung): void {
        let entity = this.LayNguoiDung(nguoiDung.TaiKhoan);
        if(entity){
            entity.MatKhau = nguoiDung.MatKhau;
            entity.HoTen = nguoiDung.HoTen;
            entity.Email = nguoiDung.Email;
            entity.SoDT = nguoiDung.SoDT;
            entity.MaLoaiNguoiDung = nguoiDung.MaLoaiNguoiDung;
        }
    }

    public LayNguoiDung(taiKhoan: string): NguoiDung{
        for(let item of this.DSNguoiDung){
            if(item.TaiKhoan === taiKhoan){
                return item;
            }
        }
    }

    public XoaNguoiDung(taiKhoan: string): void{
        this.DSNguoiDung = this.DSNguoiDung.filter(x => x.TaiKhoan !== taiKhoan);
    }

    public TimKiemNguoiDung(tuKhoa: string): NguoiDung[] {
        if(!tuKhoa) return this.DSNguoiDung;
        return this.DSNguoiDung.filter(x => 
            x.TaiKhoan.toLowerCase().indexOf(tuKhoa.toLowerCase()) > -1 ||
            x.Email.toLowerCase().indexOf(tuKhoa.toLowerCase()) > -1 ||
            x.HoTen.toLowerCase().indexOf(tuKhoa.toLowerCase()) > -1 ||
            x.SoDT.toLowerCase().indexOf(tuKhoa.toLowerCase()) > -1
        );
    }
}