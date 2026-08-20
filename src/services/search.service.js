const User = require("../models/User");
const Profile = require("../models/Profile");

const searchProfiles = async (filters, currentUserId) => {
  const {
    ageMin,
    ageMax,
    heightMin,
    heightMax,

    religion,
    caste,
    motherTongue,

    education,
    occupation,

    incomeMin,
    incomeMax,

    city,
    state,
    country,

    maritalStatus,
    gender,

    page = 1,
    limit = 10
  } = filters;

  // -----------------------------------------
  // USER QUERY
  // -----------------------------------------

  const userQuery = {};

  // Exclude current logged-in user
  if (currentUserId) {
    userQuery._id = {
      $ne: currentUserId
    };
  }

  // Gender filter
  if (gender) {
    userQuery.gender = gender;
  }

  // -----------------------------------------
  // AGE FILTER
  // Age is calculated from DOB
  // -----------------------------------------

  if (ageMin || ageMax) {
    const today = new Date();

    userQuery.dob = {};

    // Example:
    // ageMin = 25
    // User must not be younger than 25
    if (ageMin !== undefined) {
      const maxDob = new Date(
        today.getFullYear() - Number(ageMin),
        today.getMonth(),
        today.getDate()
      );

      userQuery.dob.$lte = maxDob;
    }

    // Example:
    // ageMax = 30
    // User must not be older than 30
    if (ageMax !== undefined) {
      const minDob = new Date(
        today.getFullYear() - Number(ageMax) - 1,
        today.getMonth(),
        today.getDate() + 1
      );

      userQuery.dob.$gte = minDob;
    }
  }

  // Only active users
  userQuery.status = "active";

  // Don't show suspended users
  userQuery.isSuspended = {
    $ne: true
  };

  // Don't show deleted users
  userQuery.isDeleted = {
    $ne: true
  };

  // -----------------------------------------
  // FIND USERS
  // -----------------------------------------

  const users = await User.find(userQuery)
    .select("_id gender dob profileType")
    .lean();

  if (!users.length) {
    return {
      profiles: [],
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: 0,
        totalPages: 0
      }
    };
  }

  const userIds = users.map((user) => user._id);

  // -----------------------------------------
  // PROFILE QUERY
  // -----------------------------------------

  const profileQuery = {
    userId: {
      $in: userIds
    }
  };

  // Height
  if (heightMin !== undefined || heightMax !== undefined) {
    profileQuery.height = {};

    if (heightMin !== undefined) {
      profileQuery.height.$gte = Number(heightMin);
    }

    if (heightMax !== undefined) {
      profileQuery.height.$lte = Number(heightMax);
    }
  }

  // Religion
  if (religion) {
    profileQuery.religion = religion;
  }

  // Caste
  if (caste) {
    profileQuery.caste = caste;
  }

  // Mother Tongue
  if (motherTongue) {
    profileQuery.motherTongue = motherTongue;
  }

  // Education
  if (education) {
    profileQuery.education = education;
  }

  // Occupation
  if (occupation) {
    profileQuery.occupation = occupation;
  }

  // Annual Income
  if (incomeMin !== undefined || incomeMax !== undefined) {
    profileQuery.annualIncome = {};

    if (incomeMin !== undefined) {
      profileQuery.annualIncome.$gte = Number(incomeMin);
    }

    if (incomeMax !== undefined) {
      profileQuery.annualIncome.$lte = Number(incomeMax);
    }
  }

  // City
  if (city) {
    profileQuery.city = city;
  }

  // State
  if (state) {
    profileQuery.state = state;
  }

  // Country
  if (country) {
    profileQuery.country = country;
  }

  // Marital Status
  if (maritalStatus) {
    profileQuery.maritalStatus = maritalStatus;
  }

  // -----------------------------------------
  // PAGINATION
  // -----------------------------------------

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip = (pageNumber - 1) * limitNumber;

  // -----------------------------------------
  // FETCH PROFILES
  // -----------------------------------------

  const profiles = await Profile.find(profileQuery)
    .skip(skip)
    .limit(limitNumber)
    .sort({
      createdAt: -1
    })
    .lean();

  // -----------------------------------------
  // TOTAL COUNT
  // -----------------------------------------

  const total = await Profile.countDocuments(profileQuery);

  // -----------------------------------------
  // RETURN RESULT
  // -----------------------------------------

  return {
    profiles,

    pagination: {
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber)
    }
  };
};

module.exports = {
  searchProfiles
};