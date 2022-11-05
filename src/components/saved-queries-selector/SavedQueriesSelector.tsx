import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface Props {
  queriesArr: string[];
  selectedSavedQuery: string;
  setSelectedSavedQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SavedQueriesSelector: React.FC<Props> = ({
  queriesArr,
  selectedSavedQuery,
  setSelectedSavedQuery,
}) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>Select a Giph from your collection</InputLabel>
      <Select
        value={selectedSavedQuery ? selectedSavedQuery : "0"}
        onChange={(event: SelectChangeEvent) =>
          setSelectedSavedQuery(event.target.value)
        }
        style={{ minWidth: "20vw" }}
      >
        <MenuItem value={"0"}>None</MenuItem>
        {queriesArr.map((query, index) => (
          <MenuItem key={index} value={query}>
            {query.toLocaleUpperCase()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SavedQueriesSelector;
