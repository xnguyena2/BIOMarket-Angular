
export interface BeerUnitOrder {

  name: string;
  package_order_second_id: string;
  beer_second_id: string;
  beer_unit_second_id: string;
  number_unit: number;
  price: number;
  total_discount: number;
}

export interface BeerOrderData {
  beerUnitOrderList: BeerUnitOrder[];

  name: string;
  package_order_second_id: string;
  beer_second_id: string;
  voucher_second_id: string;
  total_price: number;
  ship_price: number;
}

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

  beerOrderList: BeerOrderData[];
}

export interface OrderSearchResult {
  count: number;
  result: PackageOrder[];
}


//corver to table

export interface OrderItem {
  id: string;
  name: string;
  unit: string;
  voucher: string;
  price: number;
  number: number;
}

export function cover(packageOrder: PackageOrder): OrderItem[] {
  let result: OrderItem[] = [];
  packageOrder.beerOrderList.forEach(productorder => {
    productorder.beerUnitOrderList.forEach(productUnit => {
      let newItem: OrderItem = {
        id: productUnit.beer_unit_second_id,
        name: productorder.name,
        number: productUnit.number_unit,
        price: productUnit.price,
        unit: productUnit.name,
        voucher: productorder.voucher_second_id
      }
      result.push(newItem);
    });
  });
  return result;
}
