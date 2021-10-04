export const AppConfig = {
  BaseUrl : '/',//"http://localhost:5000/",
  FilterDrop: [{
    value: 'default',
    title: 'Nổi Bật'
  },
  {
    value: 'price_asc',
    title: 'Giá: Tăng Dần'
  },
  {
    value: 'price_desc',
    title: 'Giá: Giảm Dần'
  },
  {
    value: 'name_asc',
    title: 'Tên: A-Z'
  },
  {
    value: 'name_desc',
    title: 'Tên: Z-A'
  },
  {
    value: 'create_desc',
    title: 'Cũ Nhất'
  },
  {
    value: 'create_asc',
    title: 'Mới Nhất'
  },
  {
    value: 'sold_num',
    title: 'Bán Chạy Nhất'
  }],
  CatetoryDrop: [{
    value: 'crab',
    title: 'Cua'
  },
  {
    value: 'shrimp',
    title: 'Tôm'
  },
  {
    value: 'squid',
    title: 'Mực'
  },
  {
    value: 'holothurian',
    title: 'Hải Sâm'
  },
  {
    value: 'haliotis',
    title: 'Bào Ngư'
  },
  {
    value: 'oyster',
    title: 'Hàu'
  },
  {
    value: 'fish',
    title: 'Cá'
  }],
  GHN: {
    weigitExchange: 0.0002,
    listPackagePriceDetail: [{
      reciverLocation: "INSIDE_REGION",
      maxWeight: 3,
      priceMaxWeight: 22000,
      nextWeight: 0.5,
      priceNextWeight: 4000
    },
    {
      reciverLocation: "OUTSIDE_REGION_TYPE1",
      maxWeight: 3,
      priceMaxWeight: 35000,
      nextWeight: 0.5,
      priceNextWeight: 6600
    },
    {
      reciverLocation: "OUTSIDE_REGION_TYPE2",
      maxWeight: 3,
      priceMaxWeight: 35000,
      nextWeight: 0.5,
      priceNextWeight: 6600
    },
    {
      reciverLocation: "INSIDE_GREGION",
      maxWeight: 1,
      priceMaxWeight: 37000,
      nextWeight: 0.5,
      priceNextWeight: 7700
    },
    {
      reciverLocation: "DIFFIRENT_GPREGION",
      maxWeight: 1,
      priceMaxWeight: 37000,
      nextWeight: 0.5,
      priceNextWeight: 7700
    }
    ]
  }
}
export function removeVietnameseTones(str:string):string {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}
