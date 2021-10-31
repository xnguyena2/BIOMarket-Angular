import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productStatus'
})
export class ProductStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'PRE_ORDER':
        return 'Chuẩn Bị Đặt';

      case 'ORDER':
        return 'Đang Đặt';

      case 'SENDING':
        return 'Đang Gửi';

      case 'CANCEL':
        return 'Đã Hủy';

      case 'DONE':
        return 'Thành Công';

      default:
        return '';
    }
  }

}
