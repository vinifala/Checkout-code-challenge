# Checkout code challenge

## Pricing rules
The checkout pricing rules can be found in [src/pricingRules.json](https://github.com/vinifala/Checkout-code-challenge/blob/master/src/pricingRules.json).
It takes two options at the top level: 
* **items** (required)
* **deals** (optional)

### Items
Items requires an array of objects with the properties `sku: string, name: string, price: number`.
These will compose the product catalog of the shop.

### Deals
There are three kinds of deals: `bulkDiscount`, `bundleDiscount`, `xForThePriceOfY`. Each requires an array of objects with specific properties.
These are the discount deals available at the checkout.

#### bulkDiscount
This discount applies a new unit price when the customer buys more than `requiredQuantity` of the same item
Example:
```
// for Item({ sku: "ipd", name: "Super iPad" , price: 549.99 })
// Apply a unit price of $499.99 when purchased more than 4 Super iPads

"deals": {
  "bulkDiscount": [{
    "discountedUnitPrice": 499.99,
    "requiredQuantity": 5,
    "sku": "ipd"
  }]
}
```

#### bundleDiscount
This discount gives an item for free whenever the customer purchases a set quantity of another item
Example:
```
// for items:
// Item({ sku: "mbp", name: "MacBook Pro", price: 1399.99 })
// Item({ sku: "vga", name: "VGA Adapter", price: 30 })
// Give discount of 100% on a VGA Adapter for every MacBook Pro purchased

"deals": {
  "bundleDiscount": [{
    "requiredItems": {
      "sku": "mbp",
      "quantity": 1
    },
    "freeItem": {
      "sku": "vga"
    }
  }]
}
```

#### xForThePriceOfY
This is a discount deal that, to apply, requires the customer to purchase at least `x` items with sku `sku`. If applied, the customer will take `x` items and only pay for `y`
Takes an array of `{ sku: string, x: number, y: number }`
Example:
```
// for Item({ sku: "atv", name: "Apple TV", price: 109.50 })
// To have a deal of 3 Apple TVs for the price of 2

"deals": {
  "xForThePriceOfY": [{
    "sku": "atv",
    "x": 3,
    "y": 2
  }]
}
```

## Setup
`npm install`

## Tests
Tests use the Jest framework and can be run using the command `npm test`

## Other commands
Build: `npm run build`
Lint: `npm run lint`
Prettier: `npm run prettier` 
Run: `npm run exec`
