const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
  {
    coverImage: {
      type: String,
    },

    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = new model("blog", blogSchema);

module.exports = Blog;
