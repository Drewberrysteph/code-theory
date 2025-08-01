import { Option } from "@/types/option";
import React from "react";
import Select, { MultiValue, ClearIndicatorProps } from "react-select";
import styles from "../styles/components/SearchFilter.module.scss";

type Props = {
  options: Option[];
  selectedOptions: MultiValue<Option>;
  setSelectedOptions: (selected: MultiValue<Option>) => void;
};

const ClearAllIndicator = (props: ClearIndicatorProps<Option>) => {
  const {
    innerProps,
    selectProps: { isMulti },
  } = props;

  if (!isMulti) return null;

  return (
    <div {...innerProps} className={styles.clearAll}>
      Clear
    </div>
  );
};

const SearchFilter = ({
  options,
  selectedOptions,
  setSelectedOptions,
}: Props) => {
  const handleMultiChange = (selected: MultiValue<Option>) => {
    setSelectedOptions(selected);
  };

  return (
    <Select<Option, true>
      className={styles.searchFilter}
      options={options}
      isMulti
      onChange={handleMultiChange}
      value={selectedOptions}
      placeholder="Select languages"
      components={{ ClearIndicator: ClearAllIndicator }}
      isClearable
      classNamePrefix="custom-select"
    />
  );
};

export default SearchFilter;
