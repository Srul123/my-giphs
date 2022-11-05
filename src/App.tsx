import { Container, CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.scss";
import LoaderSpinner from "./components/loader-spinner/LoaderSpinner";
import SearchGiphs from "./components/search-giphs/SearchGiphs";
import SavedQueriesSelector from "./components/saved-queries-selector/SavedQueriesSelector";
import { GiphData, SavedQueries } from "./interfaces/types";
import GiphsGallery from "./components/giphs-gallery/GiphsGallery";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertToast, {
  AlertToastProps,
} from "./components/alert-toast/AlertToast";
import { severityInfo } from "./components/alert-toast/AlertToast";
import axios from "axios";

const App: React.FC = () => {
  const [dataGiphs, setDataGiphs] = useState<GiphData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputQuery, setInputQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [mapSavedQueries, setMapSavedQueries] = useState<SavedQueries>({});
  const [selectedSavedQuery, setSelectedSavedQuery] = useState("");
  const [alertPopup, setAlertPopup] = useState<AlertToastProps>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleOnClickSaveGiph = (giphData: GiphData) => {
    if (Object.keys(mapSavedQueries).includes(inputQuery)) {
      const alreadyExist = mapSavedQueries[inputQuery].find(
        (giph) => giph.id === giphData.id
      );
      if (alreadyExist) {
        alert(`Already exists in your collection ${inputQuery}`);
        return;
      } else {
        const updatedMap = {
          ...mapSavedQueries,
          [inputQuery]: [
            ...mapSavedQueries[inputQuery],
            { ...giphData, category: inputQuery },
          ],
        };
        setMapSavedQueries(updatedMap);
        localStorage.setItem("mapSavedQueries", JSON.stringify(updatedMap));
      }
    } else {
      const updatedMap = {
        ...mapSavedQueries,
        [inputQuery]: [{ ...giphData, category: inputQuery }],
      };
      setMapSavedQueries(updatedMap);
      localStorage.setItem("mapSavedQueries", JSON.stringify(updatedMap));
    }
    riseAlert("Saved to your collection", "success");
  };

  const handleOnClickDeleteGiph = (giphData: GiphData) => {
    const queryItemList = mapSavedQueries[giphData.category];
    const listItems = queryItemList.filter((giph) => giph.id !== giphData.id);
    if (listItems.length === 0) {
      delete mapSavedQueries[giphData.category];
      setMapSavedQueries({ ...mapSavedQueries });
      localStorage.setItem("mapSavedQueries", JSON.stringify(mapSavedQueries));
    } else {
      setMapSavedQueries({
        ...mapSavedQueries,
        [giphData.category]: listItems,
      });
      localStorage.setItem("mapSavedQueries", JSON.stringify(mapSavedQueries));
    }
    riseAlert("Deleted", "error");
  };

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
      if (results.data.data.length === 0) {
        setNotFound(true);
      }
      setDataGiphs(results.data.data);
    } catch (err) {
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getQueriesKeys = () => {
    const set = new Set<string>(Object.keys(mapSavedQueries));
    return Array.from(set);
  };

  const riseAlert = (message: string, severityInfo: severityInfo) => {
    setAlertPopup({
      ...alertPopup,
      open: true,
      severityInfo: severityInfo,
      messageInfo: message,
      time: 6000,
    });
  };

  useEffect(() => {
    const mapSavedQueriesFromLocalStorage: any =
      localStorage.getItem("mapSavedQueries");
    if (mapSavedQueriesFromLocalStorage) {
      const mapSavedQueriesList: SavedQueries = JSON.parse(
        mapSavedQueriesFromLocalStorage
      );
      setMapSavedQueries(mapSavedQueriesList);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }
  return (
    <>
      <CssBaseline />
      <Container fixed style={{ marginTop: "5vh" }}>
        <SearchGiphs
          inputQuery={inputQuery}
          setInputQuery={setInputQuery}
          handleSubmit={handleSubmit}
        />
        {notFound ? (
          <div>
            <Typography variant="h5" color={"red"} align={"center"}>
              Not found any giph that match your input
            </Typography>
          </div>
        ) : (
          <GiphsGallery
            giphsDataList={dataGiphs}
            callBack={handleOnClickSaveGiph}
            callBackTooltip={"Save"}
            cols={dataGiphs.length}
          >
            <SaveIcon />
          </GiphsGallery>
        )}
        <SavedQueriesSelector
          queriesArr={getQueriesKeys()}
          selectedSavedQuery={selectedSavedQuery}
          setSelectedSavedQuery={setSelectedSavedQuery}
        />
        <GiphsGallery
          giphsDataList={
            mapSavedQueries[selectedSavedQuery]
              ? mapSavedQueries[selectedSavedQuery]
              : []
          }
          callBack={handleOnClickDeleteGiph}
          callBackTooltip={"Delete"}
          cols={
            mapSavedQueries[selectedSavedQuery]
              ? mapSavedQueries[selectedSavedQuery].length
              : 0
          }
        >
          <DeleteIcon />
        </GiphsGallery>
      </Container>
      <AlertToast
        alertPopup={alertPopup}
        closeAlert={() => setAlertPopup({ ...alertPopup, open: false })}
      />
    </>
  );
};

export default App;
