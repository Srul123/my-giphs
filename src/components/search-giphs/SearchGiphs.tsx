import { Button, TextField } from "@mui/material";
import React from "react";

interface Props {
  inputQuery: string;
  setInputQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: { preventDefault: () => void }) => void;
}

const SearchGiphs: React.FC<Props> = ({
  inputQuery,
  setInputQuery,
  handleSubmit,
}) => {
  return (
    <div>
      <form id="form-search-giphs" onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1vh" }}>
          <TextField
            fullWidth
            id="query-input"
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            label="Search for a Giph"
            variant="outlined"
          />
        </div>
        <div>
          <Button id="button-submit" fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchGiphs;
