import { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import useAssetsData from "../../hooks/useAssetsData";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

import AssetSearchBar from "../../components/assets/AssetSearchBar";
import AssetTable from "../../components/assets/AssetTable";

const AssetsListPage = () => {
  const navigate = useNavigate();
  const { assets, deleteAsset } = useAssetsData(); // ← ADD deleteAsset here
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Asset Management</h1>
          <p className="text-gray-600 mt-1">Manage all IT assets</p>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate("/assets/add")}
          className="flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Asset
        </Button>
      </div>

      <Card>
        <AssetSearchBar value={searchTerm} onChange={setSearchTerm} />
        <AssetTable data={filteredAssets} onDelete={deleteAsset} />
        {/* ↑ ADD onDelete prop here */}
      </Card>
    </div>
  );
};

export default AssetsListPage;
