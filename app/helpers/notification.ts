import swal, { SweetAlertType } from 'sweetalert2';

export function TinNhan(title:string, text?: string, icon?: SweetAlertType): void {
    swal(title, text, icon);
}

export function ThongBao(text: string, stype?: SweetAlertType): any{
    return swal({
        title: text,
        text: 'Thông báo!',
        type:  stype ? stype : 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      });
}