import axios from "axios";
import { GetStaticProps } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MultiValue } from "react-select";

import { Job } from "@/types/job";
import { Option } from "@/types/option";

import JobCard from "@/components/JobCard";
import SearchFilter from "@/components/SearchFilter";
import { generateUniqueOptionsFromJobs } from "@/utils/generateUniqueOptionsFromJobs";

import styles from "../styles/index.module.scss";
import useIsMobile from "@/hooks/useIsMobile";

type HomeProps = {
  jobs: Job[];
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await axios.get<Job[]>(`${baseUrl}/data.json`);

  return {
    props: {
      jobs: response.data,
    },
  };
};

const Home = ({ jobs }: HomeProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Option>>(
    []
  );

  const isMobile = useIsMobile();

  // Extract unique options for filter
  useEffect(() => {
    const uniqueOptions = generateUniqueOptionsFromJobs(jobs);
    setOptions(uniqueOptions);
  }, [jobs]);

  // Filter jobs based on selected options
  const filteredJobs = selectedOptions.length
    ? jobs.filter((job) =>
        selectedOptions.some(
          (option) =>
            option.value === job.role ||
            option.value === job.level ||
            job.languages.includes(option.value)
        )
      )
    : jobs;

  return (
    <div>
      <div>
        <div className={styles.headerContainer}>
          <Image
            src={
              isMobile
                ? "/images/bg-header-mobile.svg"
                : "/images/bg-header-desktop.svg"
            }
            alt="logo"
            fill
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </div>
      <main className={styles.mainContainer}>
        <SearchFilter
          options={options}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </main>
    </div>
  );
};

export default Home;
