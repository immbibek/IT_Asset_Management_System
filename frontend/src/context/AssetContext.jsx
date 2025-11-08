import { createContext, useContext } from "react";
import useAssetsData from "../hooks/useAssetsData";

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const assetData = useAssetsData(); // contains assets, updateAsset etc
  return (
    <AssetContext.Provider value={assetData}>{children}</AssetContext.Provider>
  );
};

export const useAssetContext = () => useContext(AssetContext);
