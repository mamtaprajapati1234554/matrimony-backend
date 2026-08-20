const { searchProfiles } = require("../services/search.service");
const { searchSchema } = require("../validators/search.validator");

const search = async (req, res, next) => {
  try {
    // -----------------------------------------
    // VALIDATE FILTERS
    // -----------------------------------------

    const { error, value } = searchSchema.validate(
      req.query,
      {
        abortEarly: false,
        convert: true
      }
    );

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid search filters",
        errors: error.details.map(
          (detail) => detail.message
        )
      });
    }

    // -----------------------------------------
    // CURRENT USER
    // -----------------------------------------

    const currentUserId = req.user?._id || req.user?.id;

    // -----------------------------------------
    // SEARCH
    // -----------------------------------------

    const result = await searchProfiles(
      value,
      currentUserId
    );

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------

    return res.status(200).json({
      success: true,
      message: "Profiles fetched successfully",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  search
};