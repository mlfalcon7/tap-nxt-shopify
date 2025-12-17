export const productsQuery = /* GraphQL */ `
  query Products(
    $first: Int
    $after: String
    $sortKey: ProductSortKeys
    $reverse: Boolean
    $query: String
  ) {
    products(
      first: $first
      after: $after
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          handle
          title
          description
          availableForSale
          tags
          updatedAt
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          options {
            id
            name
            values
          }
          metafields(identifiers: [
            { namespace: "tap", key: "material" }
            { namespace: "tap", key: "use_case" }
            { namespace: "tap", key: "durability" }
            { namespace: "tap", key: "reflective" }
            { namespace: "tap", key: "made_in" }
            { namespace: "tap", key: "cause" }
            { namespace: "tap", key: "preorder" }
          ]) {
            namespace
            key
            value
          }
        }
      }
    }
  }
`;

export const productByHandleQuery = /* GraphQL */ `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      availableForSale
      tags
      updatedAt
      featuredImage {
        url
        altText
        width
        height
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      options {
        id
        name
        values
      }
      variants(first: 100) {
        edges {
          node {
            id
            title
            currentlyNotInStock
            availableForSale
            selectedOptions {
              name
              value
            }
            price {
              amount
              currencyCode
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      metafields(identifiers: [
        { namespace: "tap", key: "material" }
        { namespace: "tap", key: "use_case" }
        { namespace: "tap", key: "durability" }
        { namespace: "tap", key: "reflective" }
        { namespace: "tap", key: "made_in" }
        { namespace: "tap", key: "cause" }
        { namespace: "tap", key: "preorder" }
      ]) {
        namespace
        key
        value
      }
    }
  }
`;

export const collectionsQuery = /* GraphQL */ `
  query Collections {
    collections(first: 100) {
      edges {
        node {
          handle
          title
          description
          updatedAt
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

export const collectionByHandleQuery = /* GraphQL */ `
  query CollectionByHandle($handle: String!, $first: Int) {
    collection(handle: $handle) {
      handle
      title
      description
      updatedAt
      image {
        url
        altText
        width
        height
      }
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            availableForSale
            featuredImage {
              url
              altText
              width
              height
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            tags
          }
        }
      }
    }
  }
`;

export const predictiveSearchQuery = /* GraphQL */ `
  query PredictiveSearch($query: String!) {
    predictiveSearch(query: $query, limit: 6) {
      products {
        id
        handle
        title
        featuredImage {
          url
          altText
        }
      }
      collections {
        id
        handle
        title
      }
    }
  }
`;

export const cartCreateMutation = /* GraphQL */ `
  mutation CartCreate {
    cartCreate {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

export const cartQuery = /* GraphQL */ `
  query CartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 50) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  id
                  title
                  handle
                  featuredImage {
                    url
                    altText
                  }
                }
                price {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export const cartLinesAddMutation = /* GraphQL */ `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export const cartLinesUpdateMutation = /* GraphQL */ `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export const cartLinesRemoveMutation = /* GraphQL */ `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
