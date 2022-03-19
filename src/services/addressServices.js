import axios from "axios";

export const getAddress = (longitude, latitude) => {
  try {
    return axios.get(
      `https://map.ir/reverse/no?lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhmZjRjMjM2ZjE1ZTg0YTQ2ZTUwOWQwNzU0YTI1M2I1YjcxZjZjODJjMjQ3ZjY4OTczZGY2OGMzNzc1NTlkOWFlOTMzOTIxZTI2OTgyMGM3In0.eyJhdWQiOiIxNjkxMyIsImp0aSI6IjhmZjRjMjM2ZjE1ZTg0YTQ2ZTUwOWQwNzU0YTI1M2I1YjcxZjZjODJjMjQ3ZjY4OTczZGY2OGMzNzc1NTlkOWFlOTMzOTIxZTI2OTgyMGM3IiwiaWF0IjoxNjQ1MTc1NDYwLCJuYmYiOjE2NDUxNzU0NjAsImV4cCI6MTY0NjM4NTA2MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.OSzXQ-huCxCPzsrE2rJk_neJ5zCYILvEiTjlVvjvlcUZflYfemTWxXTxevOoL9_SPPl1Wd8Mu7MzlTl6Sj-0wA-2x651MNaFCDg09mUScvvnaOgTYroXP9_v18Vwvzh_kLh_SnEMEgRcIv-8-6vWky2QajALNOzTTcml1ENkXtrWkZILp9Nj0CsbewQO306b8ZMOGrwtNxw6Um8Bn9wIl_huWXeU8RplFFBEUVizwKy58oFAtMgYaJkHHcVrDzIvBlKNGP0OhwZwj2FBQY2NIkVlO0j6zFbWHn18vQAmM98XVPH8_jM5Hx6Zpn9PUJX-w6z_dX8UI-_y8U06Ehg25A",
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
