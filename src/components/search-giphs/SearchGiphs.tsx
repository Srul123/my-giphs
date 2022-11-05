import { Button, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { GiphData } from "../../interfaces/types";

interface Props {
  setDataGiphs: React.Dispatch<React.SetStateAction<GiphData[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  inputQuery: string;
  setInputQuery: React.Dispatch<React.SetStateAction<string>>;
  setNotFound: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchGiphs: React.FC<Props> = ({
  inputQuery,
  setInputQuery,
  setDataGiphs,
  setIsLoading,
  setNotFound,
}) => {
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);
    setNotFound(false);
    try {
      const results = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "tAEFUgagRjRNkU24orQdFB8EHMcNTUSe",
          q: inputQuery,
          limit: 5,
        },
      });
      if (results.data.data.length===0) {
        setNotFound(true);
      }
      setDataGiphs(results.data.data);
    } catch (err) {
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1vh" }}>
          <TextField
            fullWidth
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            label="Search for a Giph"
            variant="outlined"
          />
        </div>
        <div>
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchGiphs;
