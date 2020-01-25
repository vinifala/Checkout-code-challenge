import { Checkout } from "./Checkout"
import pricingRules from "./pricingRules.json"

const co1 = new Checkout(pricingRules)
co1.scan("atv")
co1.scan("atv")
co1.scan("atv")
co1.scan("vga")
co1.total() // 249.0

const co2 = new Checkout(pricingRules)
co2.scan("atv")
co2.scan("ipd")
co2.scan("ipd")
co2.scan("atv")
co2.scan("ipd")
co2.scan("ipd")
co2.scan("ipd")
co2.total() // 2718.95

const co3 = new Checkout(pricingRules)
co3.scan("mbp")
co3.scan("vga")
co3.scan("ipd")
co3.total() // 1949.98
