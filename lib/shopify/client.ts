import { serverEnv } from "@/lib/env";
import {
  cartCreateMutation,
  cartLinesAddMutation,
  cartLinesRemoveMutation,
  cartLinesUpdateMutation,
  cartQuery,
  collectionByHandleQuery,
  collectionsQuery,
  predictiveSearchQuery,
  productByHandleQuery,
  productsQuery,
} from "./queries";
import { mockCart, mockCollections, mockProducts } from "./mock-data";
import type {
  Cart,
  Collection,
  PredictiveSearchResult,
  Product,
} from "./types";

type ShopifyFetchArgs = {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  revalidate?: number;
};

type ShopifyResponse<T> = {
  data: T;
  errors?: { message: string }[];
};

const isMock =
  !serverEnv.shopifyStoreDomain || !serverEnv.shopifyStorefrontAccessToken;

export async function shopifyFetch<T>({
  query,
  variables,
  cache = "force-cache",
  revalidate = 300,
}: ShopifyFetchArgs): Promise<T> {
  if (isMock) {
    return mockFetch<T>(query, variables);
  }

  const response = await fetch(
    `https://${serverEnv.shopifyStoreDomain}/api/${serverEnv.shopifyApiVersion}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token":
          serverEnv.shopifyStorefrontAccessToken ?? "",
      },
      body: JSON.stringify({ query, variables }),
      cache,
      next: { revalidate },
    }
  );

  const body = (await response.json()) as ShopifyResponse<T>;

  if (!response.ok || body.errors) {
    throw new Error(body.errors?.[0]?.message ?? "Shopify fetch failed");
  }

  return body.data;
}

export async function getProducts(variables: {
  first?: number;
  sortKey?: string;
  reverse?: boolean;
  query?: string;
}) {
  const data = await shopifyFetch<{
    products: {
      edges: { node: Product }[];
      pageInfo: { hasNextPage: boolean; endCursor: string };
    };
  }>({
    query: productsQuery,
    variables,
  });

  return data.products.edges.map((edge) => edge.node);
}

export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch<{ product: Product | null }>({
    query: productByHandleQuery,
    variables: { handle },
  });
  return data.product;
}

export async function getCollections() {
  const data = await shopifyFetch<{
    collections: { edges: { node: Collection }[] };
  }>({
    query: collectionsQuery,
    revalidate: 300,
  });
  return data.collections.edges.map((edge) => edge.node);
}

export async function getCollectionByHandle(handle: string) {
  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: collectionByHandleQuery,
    variables: { handle, first: 30 },
  });
  return data.collection;
}

export async function predictiveSearch(query: string) {
  const data = await shopifyFetch<{ predictiveSearch: PredictiveSearchResult }>(
    {
      query: predictiveSearchQuery,
      variables: { query },
      revalidate: 60,
    }
  );
  return data.predictiveSearch;
}

export async function createCart() {
  const data = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
    query: cartCreateMutation,
    cache: "no-store",
    revalidate: 0,
  });
  return data.cartCreate.cart;
}

export async function getCart(cartId: string) {
  const data = await shopifyFetch<{ cart: Cart | null }>({
    query: cartQuery,
    variables: { cartId },
    cache: "no-store",
    revalidate: 0,
  });
  return data.cart;
}

export async function addLinesToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  await shopifyFetch({
    query: cartLinesAddMutation,
    variables: { cartId, lines },
    cache: "no-store",
    revalidate: 0,
  });
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
) {
  await shopifyFetch({
    query: cartLinesUpdateMutation,
    variables: { cartId, lines },
    cache: "no-store",
    revalidate: 0,
  });
}

export async function removeCartLines(cartId: string, lineIds: string[]) {
  await shopifyFetch({
    query: cartLinesRemoveMutation,
    variables: { cartId, lineIds },
    cache: "no-store",
    revalidate: 0,
  });
}

async function mockFetch<T>(query: string, variables?: Record<string, unknown>) {
  if (query.includes("Products") && !query.includes("product(handle")) {
    return {
      products: {
        edges: mockProducts.map((product) => ({ node: product })),
        pageInfo: { hasNextPage: false, endCursor: null },
      },
    } as T;
  }

  if (query.includes("ProductByHandle")) {
    return {
      product:
        mockProducts.find((product) => product.handle === variables?.handle) ??
        mockProducts[0],
    } as T;
  }

  if (query.includes("Collections(") || query.includes("Collections {")) {
    return {
      collections: {
        edges: mockCollections.map((collection) => ({ node: collection })),
      },
    } as T;
  }

  if (query.includes("CollectionByHandle")) {
    return {
      collection:
        mockCollections.find(
          (collection) => collection.handle === variables?.handle
        ) ?? mockCollections[0],
    } as T;
  }

  if (query.includes("PredictiveSearch")) {
    return {
      predictiveSearch: {
        products: mockProducts.slice(0, 3),
        collections: mockCollections.slice(0, 2),
      },
    } as T;
  }

  if (query.includes("CartCreate")) {
    return { cartCreate: { cart: getMockCart() } } as T;
  }

  if (query.includes("CartQuery")) {
    return { cart: getMockCart() } as T;
  }

  if (
    query.includes("CartLinesAdd") ||
    query.includes("CartLinesUpdate") ||
    query.includes("CartLinesRemove")
  ) {
    mutateMockCart(query, variables);
    return { cartLinesAdd: { cart: getMockCart(), userErrors: [] } } as T;
  }

  throw new Error("Unhandled mock query");
}

const mockStore = globalThis as unknown as { __tapMockCart?: Cart };

function getMockCart(): Cart {
  if (!mockStore.__tapMockCart) {
    mockStore.__tapMockCart = JSON.parse(JSON.stringify(mockCart)) as Cart;
  }
  return mockStore.__tapMockCart;
}

function mutateMockCart(query: string, variables?: Record<string, unknown>) {
  const cart = getMockCart();

  if (query.includes("CartLinesAdd") && variables?.lines) {
    const lines = variables.lines as { merchandiseId: string; quantity: number }[];
    lines.forEach((line) => {
      cart.lines.edges.push({
        node: {
          id: `${line.merchandiseId}-${Date.now()}`,
          quantity: line.quantity,
          merchandise: {
            id: line.merchandiseId,
            title: "Mock Variant",
            selectedOptions: [],
            product: mockProducts[0],
          },
          cost: {
            totalAmount: {
              amount: (
                Number(mockProducts[0].priceRange.minVariantPrice.amount) *
                line.quantity
              ).toFixed(2),
              currencyCode: "USD",
            },
          },
        },
      } as never);
    });
    cart.totalQuantity += lines.reduce(
      (acc, line) => acc + line.quantity,
      0
    );
  }

  if (query.includes("CartLinesUpdate") && variables?.lines) {
    const lines = variables.lines as { id: string; quantity: number }[];
    cart.lines.edges = cart.lines.edges.map((edge) => {
      const updated = lines.find((line) => line.id === edge.node.id);
      if (updated) {
        edge.node.quantity = updated.quantity;
      }
      return edge;
    });
    cart.totalQuantity = cart.lines.edges.reduce(
      (acc, edge) => acc + edge.node.quantity,
      0
    );
  }

  if (query.includes("CartLinesRemove") && variables?.lineIds) {
    const lineIds = variables.lineIds as string[];
    cart.lines.edges = cart.lines.edges.filter(
      (edge) => !lineIds.includes(edge.node.id)
    );
    cart.totalQuantity = cart.lines.edges.reduce(
      (acc, edge) => acc + edge.node.quantity,
      0
    );
  }
}
