import { Job } from "@/types/job";
import Image from "next/image";
import styles from "../styles/components/JobCard.module.scss";

type Props = {
  job: Job;
};

const JobCard = ({ job }: Props) => {
  return (
    <div className={styles.jobContainer}>
      <div className={styles.imageContainer}>
        <Image
          src={job.logo}
          alt="logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={styles.jobDetails}>
        <div className={styles.jobHeader}>
          <p className={styles.company}>{job.company}</p>
          {job.new && <p className={styles.newTag}>NEW!</p>}
          {job.featured && <p className={styles.featuredTag}>FEATURED</p>}
        </div>
        <p className={styles.position}>{job.position}</p>
        <div className={styles.jobMetaData}>
          <p>{job.postedAt}</p> •<p>{job.contract}</p> •<p>{job.location}</p>
        </div>
      </div>
      <div className={styles.tagContainer}>
        {[job.role, job.level, ...job.languages].map((tag, idx) => (
          <p key={idx} className={styles.tag}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default JobCard;
