export class AppNotification {
  public device_id: string = '';
  public title: string = '';
  public msg: string = '';

  constructor(device_id: string, title: string, msg: string) {
    this.device_id = device_id;
    this.title = title;
    this.msg = msg;
  }
}
