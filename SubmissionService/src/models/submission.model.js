const mongoose = require("mongoose");
const submissionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID for submission is missing"],
    },
    problemId: {
      type: String,
      required: [true, "Problem ID for submission is missing"],
    },
    code: {
      type: String,
      required: [true, "Code for submission is missing"],
    },
    language: {
      type: String,
      required: [true, "Language for submission is missing"],
    },
    status: {
      type: String,
      enum: ["Pending", "Success", "RE", "TLE", "MLE", "WA"],
      default: "Pending",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Submission", submissionSchema);
