# ShopDevInternChallenge
Shopify's intern challenge the Winter 2019 Developer Position.

# Table of Contents
* [Summary of Design](#summary-of-design)
  * [Use Case in Consideration](#use-case-consideration)
  * [Database Design](#database-design)
  * [Server Design](#server-design)
 
* [API Documentation](#api-documentation)
  * [Line Items](#line-items)
    * [(C) Create line item](#c-create-line-item)
    * [(R) Get line item](#r-get-line-item)
    * [(U) Change line item](#u-change-line-item)
    * [(D) Delete line item](#d-delete-line-item)

  * [Orders](#orders)
    * [(C) Create orders](#c-create-orders)
    * [(R) Get order](#r-get-order)
    * [(U) Change order](#u-change-order)
    * [(D) Delete order](#d-delete-order)

  * [Order Items](#order-items)
    * [(C) Create order item](#c-create-order-item)
    * [(R) Get full order item](#r-get-full-order-item)
    * [(U) Change order item](#u-change-order-item)
    * [(D) Delete order item](#d-delete-order-item)

  * [Account](#account)
   * [(C) Create account](#c-create-account)
   * [(R) Get account](#r-get-account)
   * [(U) Change account](#u-change-account)
   * [(D) Delete account](#d-delete-account)

  * [Shop](#shop)
    * [(C) Create shop](#c-create-shop)
    * [(R) Get shop](#r-get-shop)
    * [(U) Change shop](#u-change-shop)
    * [(D) Delete shop](#d-delete-shop)

  * [Specific Functionality](#specific-functionality)
    * [(R) Get sales history](#r-get-sales-history)
    * [(R) Get line items from shop](#r-get-line-items-from-shop)
    * [(U) transaction of list item](#u-transaction-of-list-item)

# Summary of Design
### Use Case Consideration
### Database Design
### Server Design


# API Documentation
All api endpoints can be accessed through the `api/v1/` route.

## Line Items
### (C) Create line item
`POST /lineitems`

### (R) Get line item
`GET /lineitems`

### (U) Change line item
`PUT /lineitems`

### (D) Delete line item
`DELETE /lineitems`

## Orders
### (C) Create orders
`POST /orders`
### (R) Get order
`GET orders`
### (U) Change order
`PUT /orders`
### (D) Delete order
`DELETE /orders`

## Order Items
### (C) Create order item
`POST /orderitems`
### (R) Get full order item
`GET /orderitems`
### (U) Change order item
`PUT /orderitems`
### (D) Delete order item
`DELETE /orderitems`

## Account
### (C) Create account
`POST /accounts`
### (R) Get account
`GET /accounts`
### (U) Change account
`PUT /accounts`
### (D) Delete account
`DELETE /accounts`

## Shop
### (C) Create shop
`POST /shops`
### (R) Get shop
`GET /shops`
### (U) Change shop
`PUT /shops`
### (D) Delete shop
`DELETE /shops`

## Specific Functionality
### (R) Get sales history 
`GET /sales`
### (R) Get line items from shop
`GET /merchandises`
### (U) transaction of list item
`POST /transactions`
