import swal, { SweetAlertType } from 'sweetalert2';

export function TinNhan(title:string, text?: string, icon?: SweetAlertType): void {
    swal(title, text, icon);
}

export function ThongBao(text: string): boolean{
    let ketQua;
    swal({
        title: 'Thông báo!',
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý'
      }).then((result) => {
        ketQua = result;
      });

    return ketQua;
}