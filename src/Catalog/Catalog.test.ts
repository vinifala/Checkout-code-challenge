import { Catalog } from "./Catalog"
import { Item } from "../Item"

const ipd = new Item({
  sku: "ipd",
  name: "Super iPad",
  price: 549.99,
})
const mbp = new Item({
  sku: "mbp",
  name: "MacBook Pro",
  price: 1399.99,
})
const atv = new Item({
  sku: "atv",
  name: "Apple TV",
  price: 109.5,
})
const vga = new Item({
  sku: "vga",
  name: "VGA adapter",
  price: 30.0,
})

describe("Catalog", () => {
  it("should transform the list of items into an object", () => {
    const catalog = new Catalog([mbp, atv, vga, ipd])

    expect(catalog.items).toMatchObject({
      mbp: { ...mbp },
      atv: { ...atv },
      vga: { ...vga },
      ipd: { ...ipd },
    })
  })
})
