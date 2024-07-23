"use server";

import connectToDB from "@/database";
import Profile from "@/models/profile";
import Job from "@/models/job";
import { revalidatePath } from "next/cache";

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
