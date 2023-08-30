<div>
  <h2>Application Routes:</h3>
</div>

### Auth (User)

- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/auth/login (POST)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/auth/signup (POST)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/auth/refresh-token (POST)


### Auth (Admin)

- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/admins/create-admin (POST)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/admins/login (Post) 
 

### User:

- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/users/ (GET all user)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/users/64918710ca37922bb383e42f (GEt single user)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/users/64eb80d0d700377b570e5a2c (PATCH user)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/users/64e9eb1e82c3b43f4534197a (DELETE user)


### Cow:

- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/cows/ (POST)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/cows/ (GET all Cow)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/cows/64932727face7c6ef98f4a3d (GET single Cow)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/cows/64932727face7c6ef98f4a3d (PATCH cow)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/cows/64932727face7c6ef98f4a3d (DELETE cow)


### Order
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/order/ (POST)
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/order/ (GET all order)


### Bonus part

## Admin
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/admins/create-admin

## My Profile
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/users/my-profile (GET)

## Order
- https://l2a3-cow-hut-backend-assignment-proloypaul.vercel.app/api/v1/order/64eb3d45a9cd4abcbdb58057 (GET single Order)

### Pagination and Filtering routes of Cows:

- api/v1/cows/?page=1&limit=10
- api/v1/cows/?sortBy=price&sortOrder=asc
- api/v1/cows/?minPrice=40000
- api/v1/cows/?maxPrice=70000
- api/v1/cows/?minPrice=2000&maxPrice=70000
- api/v1/cows/?location=Chattogram
- api/v1/cows/?category=Beef
- api/v1/cows/?breed=Sahiwal
- api/v1/cows/?searchTerm=dha
- api/v1/cows/?searchTerm=Dairy
- api/v1/cows/?searchTerm=sha


