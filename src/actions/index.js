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

export async function postNewJobAction(formData, pathToRevalidate) {
  await connectToDB();
  try {
    const job = await Job.create(formData);
    revalidatePath(pathToRevalidate);
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
  let query = { recruiterId: id }; // Initialize query with recruiterId

  if (filters) {
    // Dynamically construct the query based on non-empty filters
    filters.forEach((filter) => {
      if (filter.content.length > 0) {
        // Assuming you want to match any of the values in the content array
        query[filter.name] = { $in: filter.content };
      }
    });
  }

  try {
    // Use the dynamically constructed query object in Job.find
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
