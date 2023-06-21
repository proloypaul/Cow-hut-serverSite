<div>
  <h2>Application Routes:</h3>
</div>

### User:

- api/v1/user/create-user(POST)
- api/v1/user/all-users(GET All)
- api/v1/user/getSingle-user/64919c60fc3a5c09f82fb158(GET single user)
- api/v1/user/update-user/64919c60fc3a5c09f82fb158(UPDATE user)
- api/v1/user/delete-user/64929ea59e91290ca4ebf1c0(DELETE)


### Cow:

- api/v1/cow/create-cow(POST)
- api/v1/cow/get-allCow(GET All)
- api/v1/cow/getSingle-cow/6492afaca87605a37e2765c3(GET single cow)
- api/v1/cow/update-cow/6492a2a4039d665f03526d68(UPDATE cow)
- api/v1/cow/delete-cow/6492ab341a7845cb27a45a3a(DELETE)

### Pagination and Filtering routes of Cows:

- api/v1/cow/get-allCow?page=1&limit=10
- api/v1/cow/get-allCow?sortBy=price&sortOrder=asc
- api/v1/cow/get-allCow?minPrice=40000
- api/v1/cow/get-allCow?maxPrice=70000
- api/v1/cow/get-allCow?minPrice=2000&maxPrice=70000
- api/v1/cow/get-allCow?location=Chattogram
- api/v1/cow/get-allCow?category=Beef
- api/v1/cow/get-allCow?breed=Sahiwal
- api/v1/cow/get-allCow?searchTerm=dha
- api/v1/cow/get-allCow?searchTerm=Dairy
- api/v1/cow/get-allCow?searchTerm=sha


