import { KhoaHoc } from "./KhoaHoc";

export class DanhSachKhoaHoc {
    
    public DSKhoaHoc: KhoaHoc[];

    public constructor() {
        this.DSKhoaHoc = [];
    }

    public ThemKhoaHoc(khoaHoc: KhoaHoc): void {
        this.DSKhoaHoc.push(khoaHoc);
    }

    public SuaKhoaHoc(khoaHoc: KhoaHoc): void {
        let entity = this.LayKhoaHoc(khoaHoc.MaKhoaHoc);
        if(entity){
            entity.TenKhoaHoc = khoaHoc.TenKhoaHoc;
            entity.MoTa = khoaHoc.MoTa;
            entity.LuotXem = khoaHoc.LuotXem;
            entity.HinhAnh = khoaHoc.HinhAnh;
            entity.NguoiTao = khoaHoc.NguoiTao;
        }
    }

    public LayKhoaHoc(maKH: string): KhoaHoc{
        for(let item of this.DSKhoaHoc){
            if(item.MaKhoaHoc === maKH){
                return item;
            }
        }
    }

    public LayKhoaHocDaGhiDanh(mangKhoaHoc: any[]): KhoaHoc[]{
        let khDaGhiDanh: KhoaHoc[] = []; 
        for(let item of mangKhoaHoc){
            for(let item2 of this.DSKhoaHoc)
            {
                if(item.MaKhoaHoc == item2.MaKhoaHoc){
                    khDaGhiDanh.push(item2);
                }
            }
        }
        return khDaGhiDanh;
    }

    public XoaKhoaHoc(maKH: string): void{
        this.DSKhoaHoc = this.DSKhoaHoc.filter(x => x.MaKhoaHoc !== maKH);
    }

    public TimKiemKhoaHoc(tuKhoa: string): KhoaHoc[] {
        if(!tuKhoa) return this.DSKhoaHoc;
        return this.DSKhoaHoc.filter(
            x => x.TenKhoaHoc.toLowerCase().indexOf(tuKhoa.toLowerCase()) > -1 ||
            x.MoTa.toLowerCase().indexOf(tuKhoa.toLowerCase()) > -1
        );
    }
}