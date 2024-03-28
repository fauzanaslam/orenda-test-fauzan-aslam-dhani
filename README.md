tech: mysql with sequelize, materialUi, Typescript

create database orendatest

open project

cd api on terminal

run "npx sequelize db:migrate"

run "npx sequelize-cli db:seed:all"

run "npm run dev"

frontend .env:

VITE_API_BASE_URL=http://localhost:7899

FRONTEND_URL=http://127.0.0.1:5173

cd client on another terminal

run "npm run dev"


------------------------------------- backend payload: ---------------------------------------------------

register: post(http://localhost:7899/user/signup)

{
    "name": "....."
}

----------------------------------------------

login: post(http://localhost:7899/user/login)

{
    "name": "...."
}

----------------------------------------------

logout: post(http://localhost:7899/user/logout)

------------------------------------------------

create-customer: post(http://localhost:7899/customer)

{
    "name": "....",
    "phone": ".....",
    "email": "....",
    "address": "....."
}

-------------------------------------------------

get-all-customer: get(http://localhost:7899/customer)

--------------------------------------------------

update-customer: patch(http://localhost:7899/customer/:customerId)

{
    "name": "....",
    "phone": "....",
    "email": ".....",
    "address": "....."
}

-----------------------------------------------------

delete-customer: delete(http://localhost:7899/customer/:customerId)

-------------------------------------------------------

create-product: post(http://localhost:7899/product)

{
    "name": "....",
    "unit": "....",
    "price": "...."
}

---------------------------------------------------------

get-all-product: get(http://localhost:7899/product)

------------------------------------------------------------

update-product: patch(http://localhost:7899/product/:productId)

{
    "name": "....",
    "unit": "....",
    "price": "...."
}

----------------------------------------------------------------

delete-product: delete(http://localhost:7899/product/:productId)

------------------------------------------------------------

create-order: post(http://localhost:7899/orders)

{
  "customerId": 8,
  "products": [
    {
      "productId": 2,
      "quantity": 5
    },
    {
      "productId": 3,
      "quantity": 5
    }
  ],
  "discount": 8
}

*url menyesuaikan
