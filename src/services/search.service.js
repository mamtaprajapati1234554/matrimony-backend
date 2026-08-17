const Profile = require('../models/Profile');
const User = require('../models/User');

async function searchProfiles(filters, currentUserId, currentUserGender) {
    const {
        ageMin, ageMax, heightMin, heightMax,
        religion, caste, education, city, maritalStatus, gender,
        page, limit
    } = filters;

    // STEP 1: User-side filters (gender, status, age, khud ko exclude karna)
    const userQuery = { status: { $nin: ['suspended', 'deleted'] } };

    if (gender) {
        // User ne khud gender filter bheja hai - usi ko priority do
        userQuery.gender = gender;
    } else if (currentUserGender) {
        // User ne kuch nahi bheja, lekin login hai - automatically opposite gender dikhao
        userQuery.gender = currentUserGender === 'male' ? 'female' : 'male';
    }
    if (currentUserId) userQuery._id = { $ne: currentUserId };

    if (ageMin || ageMax) {
        userQuery.dob = {};
        if (ageMax) {
            const minDob = new Date();
            minDob.setFullYear(minDob.getFullYear() - ageMax - 1);
            userQuery.dob.$gte = minDob;
        }
        if (ageMin) {
            const maxDob = new Date();
            maxDob.setFullYear(maxDob.getFullYear() - ageMin);
            userQuery.dob.$lte = maxDob;
        }
    }

    const matchingUsers = await User.find(userQuery).select('_id');
    const userIds = matchingUsers.map((u) => u._id);

    // STEP 2: Profile-side filters
    const profileQuery = { user: { $in: userIds } };

    if (religion) profileQuery.religion = religion;
    if (caste) profileQuery.caste = caste;
    if (education) profileQuery.education = education;
    if (city) profileQuery.city = city;
    if (maritalStatus) profileQuery.maritalStatus = maritalStatus;

    if (heightMin || heightMax) {
        profileQuery.height = {};
        if (heightMin) profileQuery.height.$gte = heightMin;
        if (heightMax) profileQuery.height.$lte = heightMax;
    }

    // STEP 3: Pagination
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
        Profile.find(profileQuery)
            .populate('user', 'name gender dob phone status')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }),
        Profile.countDocuments(profileQuery)
    ]);

    return {
        results,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

module.exports = { searchProfiles };