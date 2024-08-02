"use server";

import connectToDB from "@/database";
import Profile from "@/models/profile";
import Job from "@/models/job";
import { revalidatePath } from "next/cache";
import Application from "@/models/application";
import Bookmark from "@/models/bookmark";

//create profile action
export async function createProfile(formData, pathToRevalidate) {
  await connectToDB();

  try {
    await Profile.create(formData);
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: "Profile created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Profile creation failed",
    };
  }
}

export async function fetchProfile(id) {
  await connectToDB();
  try {
    const profile = await Profile.findOne({ userId: id });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(profile)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Profile fetch failed",
    };
  }
}

export async function postNewJobAction(formData) {
  await connectToDB();
  try {
    const job = await Job.create(formData);
    // if (job && pathToRevalidate) {
    // console.log("Revalidating path", pathToRevalidate);
    // revalidatePath(pathToRevalidate);
    // }
    return {
      success: true,
      data: "Job created successfully",
      message: JSON.parse(JSON.stringify(job)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Job creation failed",
    };
  }
}

export async function fetchJobsRecruiter(id, filters) {
  await connectToDB();
  let query = { recruiterId: id };

  if (filters) {
    filters.forEach((filter) => {
      if (filter.content.length > 0) {
        query[filter.name] = { $in: filter.content };
      }
    });
  }

  try {
    const allJobs = await Job.find(query);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(allJobs)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Job fetch failed",
    };
  }
}

//munka törlése
export async function deleteJob(id) {
  await connectToDB();
  try {
    await Job.findByIdAndDelete(id);

    return {
      success: true,
      message: "Job deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Job deletion failed",
    };
  }
}

export async function fetchSingleJob(id) {
  await connectToDB();
  try {
    const job = await Job.findById(id);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(job)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Job fetch failed",
    };
  }
}

export async function fetchJobsCandidate(filters) {
  await connectToDB();
  let query = {};

  if (filters) {
    filters.forEach((filter) => {
      if (filter.content.length > 0) {
        query[filter.name] = { $in: filter.content };
      }
    });
  }

  try {
    const allJobs = await Job.find(query);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(allJobs)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Job fetch failed",
    };
  }
}

export async function editProfileInfo(id, formData) {
  await connectToDB();
  try {
    await Profile.findByIdAndUpdate(id, formData);
    return {
      success: true,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Profile update failed",
    };
  }
}

//job application action
export async function createJobApplication(data, pathToRevalidate) {
  await connectToDB();
  try {
    const hasAlreadyApplied = await Application.findOne({
      jobId: data.jobId,
      candidateUserId: data.candidateUserId,
    });
    if (hasAlreadyApplied) {
      return {
        success: false,
        message: "You have already applied for this job",
        error: "Already applied",
      };
    } else {
      await Application.create(data);
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "Application created successfully",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
}
//fetch applications - candidate
export async function fetchApplicationsCandidate(id) {
  await connectToDB();
  try {
    const applications = await Application.find({ candidateUserId: id });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(applications)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Application fetch failed",
    };
  }
}
//fetch applications - recruiter
export async function fetchApplicationsRecruiter(id) {
  await connectToDB();
  try {
    const applications = await Application.find({ recruiterUserId: id });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(applications)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Application fetch failed",
    };
  }
}

//get candidate info for application
export async function getCandidateDetailsByIDAction(id) {
  await connectToDB();
  try {
    const profile = await Profile.findOne({ userId: id });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(profile)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Profile fetch failed",
    };
  }
}

//update application
export async function jobAplicationStatusAction(data, pathToRevalidate) {
  await connectToDB();
  const {
    recruiterUserId,
    name,
    email,
    candidateUserId,
    status,
    jobId,
    jobAppliedDate,
    _id,
  } = data;
  try {
    const result = await Application.findOneAndUpdate(
      {
        _id: _id,
      },
      {
        recruiterUserId,
        name,
        email,
        candidateUserId,
        status,
        jobId,
        jobAppliedDate,
      },
      {
        new: true,
      }
    );
    revalidatePath(pathToRevalidate);
    return {
      success: true,
      message: "Application updated successfully",
      data: JSON.parse(JSON.stringify(result)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Application update failed",
    };
  }
}

//bookmark job
export async function bookmarkJobAction(data) {
  await connectToDB();
  const { candidateUserId, jobId, jobSaveDate, name, email } = data;

  try {
    const result = await Bookmark.create({
      candidateUserId,
      jobId,
      jobSaveDate,
      name,
      email,
    });

    return {
      success: true,
      message: candidateUserId,
      data: JSON.parse(JSON.stringify(result)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
}

//fetch bookmarks
export async function fetchBookmarks(id) {
  await connectToDB();
  try {
    const bookmarks = await Bookmark.find({ candidateUserId: id });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookmarks)),
      message: "Bookmarks fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Bookmarks fetch failed",
    };
  }
}

//delete bookmark
export async function deleteBookmark(id) {
  await connectToDB();
  try {
    await Bookmark.findByIdAndDelete(id);
    return {
      success: true,
      message: "Bookmark deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Bookmark deletion failed",
    };
  }
}

//fetch bookmarked jobs
export async function fetchBookmarkedJobs(ids) {
  await connectToDB();
  try {
    const bookmarkedJobs = await Job.find({ _id: { $in: ids } });
    return {
      success: true,
      data: JSON.parse(JSON.stringify(bookmarkedJobs)),
      message: "Bookmarks fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Bookmarks fetch failed",
    };
  }
}
