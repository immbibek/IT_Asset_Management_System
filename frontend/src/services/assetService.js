// src/services/assetService.js

export const getAssetById = (id, assets) => {
  return assets.find(asset => asset.id === id);
};

export const updateAsset = async (updatedAsset) => {
  console.log("Sending to backend:", updatedAsset);
  // later → return await axios.put(`/api/assets/${updatedAsset.id}`, updatedAsset);
  return { success: true };
};
