export const AppConfig = {
  BaseUrl : "http://localhost:5000/",
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
