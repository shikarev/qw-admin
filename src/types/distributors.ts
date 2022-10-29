export interface DistributorsOffersGrouped {
    product: DistributorsProduct,
    offersCount?: number,
    purchasePrice?: number,
    productExistence?: number,
    retailPrice?: string | number,
}

interface DistributorsProduct {
    id: string,
    name: string,
}

export interface DistributorsProductOffers {
    id: string,
    productId: string,
    cost?: number,
    oldCost?: number,
    currencyId?: string,
    currencyName?: string,
    picturePath?: string,
    startDate?: string,
    endDate?: string,
    code?: string,
    modName?: string,
    points?: number,
    condition?: string,
    status?: string,
    vendor: DistributorVendor,
    sellsYourGoods?: number,
}

interface DistributorVendor {
    id: string,
    name: string,
    description?: string,
    site?: string,
    picturePath?: string,
    vendorTypes?: string[],
}

export interface DistributorsOrders {
    id: string,
    promo?: string,
    description?: string,
    note?: string,
    name?: string,
    recipientName?: string,
    recipientEmail?: string,
    recipientPhone?: string,
    created?: string,
    orderTotalCost?: number,
    deliveryType?: string,
    orderStatus?: string,
    paymentStatus?: string,
    deliveryWayId?: string,
    deliveryWayName?: string,
    paymentMethodId?: string,
    paymentMethodName?: string,
    recipientAddressId?: string,
    recipientId?: string,
    bankCardId?: string,
    bankCardName?: string,
    orderProducts: OrderProducts[],
}

interface OrderProducts {
    id: string,
    cost: number,
    quantity?: number,
    created?: string,
    productId?: string,
    name?: string,
    rating?: number,
    feedbackCount?: number,
    picturePath?: string,
    currencyId?: string,
    currencyName?: string,
    distributorId?: string,
    distributorName?: string
}