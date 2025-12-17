import { products } from "@/data/products";

export function getAllProducts() {
  return products;
}

export function getProductHandles() {
  return products.map((product) => product.handle);
}

export function findProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getRelatedProducts(handle: string, count = 3) {
  return products.filter((product) => product.handle !== handle).slice(0, count);
}

export function listCategories() {
  return Array.from(new Set(products.map((product) => product.category)));
}

export type { Product } from "@/data/products";
