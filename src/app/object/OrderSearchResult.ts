export interface PackageOrder {
  package_order_second_id: string;
  user_device_id: string;
  reciver_address: string;

  region: string;
  district: string;
  ward: string;

  reciver_fullname: string;
  phone_number: string;
  total_price: number;
  ship_price: number;
  status: string;
}

export interface OrderSearchResult {
  count: number;
  result: PackageOrder[];
}
