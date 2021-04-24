class APIFeatures {
  constructor(query, queryString) {
    this.query = query; //* query object
    this.queryString = queryString; //* query string from express
  }

  //?difficulty=easy&duration[gte]=5  (filtering)
  //?sort=price,ratingsAverage        (sorting)
  //?fields=name,duration,price       (Fields Limiting)
  //?page=2&limit=10                  (pagination)

  //! 1) Filtering
  filter() {
    const queryObj = { ...this.queryString };
    //* remove not-filtering fields from query params
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); // \b exact

    this.query = this.query.find(JSON.parse(queryStr));

    return this; //* in order to return the entire object and has access to other methods and chain them.
  }

  //! 2) Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("name");
    }

    return this; //* in order to return the entire object and has access to other methods and chain them.
  }

  //! 3) Field Limiting (reduces the consumed bandwidth by requests)
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this; //* in order to return the entire object and has access to other methods and chain them.
  }

  //! 4) Pagination
  paginate() {
    const page = this.queryString.page * 1 || 1; // type casting
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
