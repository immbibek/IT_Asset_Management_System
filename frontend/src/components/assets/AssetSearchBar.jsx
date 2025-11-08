import { Search } from "lucide-react";

const AssetSearchBar = ({ value, onChange }) => {
  return (
    <div className="relative mb-4">
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search assets..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default AssetSearchBar;
