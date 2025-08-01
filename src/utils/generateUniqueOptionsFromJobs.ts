import { Job } from "@/types/job";
import { Option } from "@/types/option";

export const generateUniqueOptionsFromJobs = (jobs: Job[]): Option[] => {
  const tags = jobs.flatMap((job) => [job.role, job.level, ...job.languages]);

  const uniqueTags = Array.from(new Set(tags));

  return uniqueTags.map((tag) => ({ value: tag, label: tag }));
};
