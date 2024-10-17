#### NOTES:

I didn't see much reason to add any sorting because the data is mocked, and in real life if we use a MongoDB or SQL(same PostgreSQL) database with two collections `contacts` and `developers` we can use aggregation with lookups, grouping, sorting and matching. These queries would look something like this:

MongoDB:

```javascript
db.developers.aggregate([
  {
    $lookup: {
      from: "contracts",
      localField: "id",
      foreignField: "developerId",
      as: "contracts",
    },
  },
  {
    $unwind: {
      path: "$contracts",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $group: {
      _id: {
        developerId: "$id",
        firstName: "$firstName",
        lastName: "$lastName",
        email: "$email",
        status: "$contracts.status",
      },
      totalRevenue: { $sum: "$contracts.amount" },
    },
  },
  {
    $project: {
      _id: 0,
      developerId: "$_id.developerId",
      firstName: "$_id.firstName",
      lastName: "$_id.lastName",
      email: "$_id.email",
      status: "$_id.status",
      totalRevenue: 1,
    },
  },
  {
    $sort: { firstName: 1, status: 1, totalRevenue: 1 }, // we can get sort data from frontend transform query params to object and in that case this row would looks like: $sort: sortOption
  },
]);
```

SQL:

```sql
SELECT
    d.id AS developer_id,
    d.first_name,
    d.last_name,
    d.email,
    c.status,
    SUM(c.amount) AS total_revenue
FROM
    developers d
LEFT JOIN
    contracts c ON d.id = c.developer_id
GROUP BY
    d.id, d.first_name, d.last_name, d.email, c.status
ORDER BY
    total_revenue DESC, d.id, c.status;
```
