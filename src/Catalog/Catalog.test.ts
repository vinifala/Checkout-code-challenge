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

    expect(catalog).toMatchObject({
      mbp: { ...mbp },
      atv: { ...atv },
      vga: { ...vga },
      ipd: { ...ipd },
    })
  })

  it("should not be possible to change the value of an item in the Catalog", () => {
    const catalog = new Catalog([mbp, atv])

    expect(() => {
      catalog["atv"] = vga
    }).toThrow()
  })

  it("should not be possible to remove an item from the catalog", () => {
    const catalog = new Catalog([mbp, atv])

    expect(() => {
      delete catalog.atv
    }).toThrow()
  })

  it("should not be possible to add an item to the catalog", () => {
    const catalog = new Catalog([mbp, atv])

    expect(() => {
      catalog["ipd"] = ipd
    }).toThrow()
  })
})
