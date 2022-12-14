import { queryByAttribute, render } from "@testing-library/react";
import SavedQueriesSelector from "../saved-queries-selector/SavedQueriesSelector";
import SearchGiphs from "../search-giphs/SearchGiphs";

const getById = queryByAttribute.bind(null, "id");

test("Test SearchGiphs Component", () => {
  const queryPropsTest = "Query Test";
  const dom = render(
    <SearchGiphs
      inputQuery={queryPropsTest}
      setInputQuery={() => "test"}
      handleSubmit={() => "test"}
    />
  );
  const input = getById(dom.container, "query-input") as HTMLInputElement;

  expect(input.value).toBe(queryPropsTest);
});

test("Test SavedQueriesSelector Component", () => {
  const queriesArr = ["JS", "TS", "React", "Angular", "Coding Love"];
  const selctedOption = queriesArr[2];
  const { container }= render(
    <SavedQueriesSelector
      queriesArr={queriesArr}
      selectedSavedQuery={selctedOption}
      setSelectedSavedQuery={() => "test"}
    />
  );

  const select = getById(container, "select-collection") as HTMLInputElement;
  expect(select ? true : false).toBe(true);
// to do: continue...

});

