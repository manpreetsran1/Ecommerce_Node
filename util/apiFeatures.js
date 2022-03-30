class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword, "keywordkeyword");
    this.query = this.query.find({ ...keyword });

    // console.log(this.query, "query");

    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removefields = ["keyword", "page", "limit"];

    removefields.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy, "queryCopy 1");

    ///filter for price and rating

    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(queryStr, "queryStr");
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
