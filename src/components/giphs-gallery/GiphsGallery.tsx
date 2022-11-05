import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Tooltip,
} from "@mui/material";
import React from "react";
import { GiphData } from "../../interfaces/types";

interface Props {
  giphsDataList: GiphData[];
  callBack: (giphData: GiphData) => void;
  callBackTooltip: string,
  cols: number;
  children?: React.ReactNode;
}
const GiphsGallery: React.FC<Props> = ({
  giphsDataList,
  callBack,
  callBackTooltip,
  cols,
  children,
}) => {
  const handleOnClickGiph = (giphData: GiphData) => {
    callBack(giphData);
  };

  return (
    <ImageList cols={cols}>
      {giphsDataList.map((giphData, index) => (
        <ImageListItem key={index}>
          <img
            src={`${giphData.images.fixed_height.url}`}
            alt={giphData.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={giphData.title}
            actionIcon={
              <Tooltip title={callBackTooltip}>
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${giphData.title}`}
                  onClick={() => handleOnClickGiph(giphData)}
                >
                  {children}
                </IconButton>
              </Tooltip>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default GiphsGallery;
