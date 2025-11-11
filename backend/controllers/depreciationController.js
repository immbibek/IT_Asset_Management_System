import Asset from '../models/Asset.js';

// Helper function to calculate current value and depreciation for a single asset
const calculateDepreciation = (asset) => {
  const purchaseDate = new Date(asset.purchaseDate);
  const now = new Date();
  const yearsSincePurchase = (now - purchaseDate) / (1000 * 60 * 60 * 24 * 365.25);
  const annualDepreciationRate = 1 / asset.lifespan; // Straight-line depreciation

  let currentDepreciationRate = Math.min(yearsSincePurchase * annualDepreciationRate, 1);
  if (currentDepreciationRate < 0) currentDepreciationRate = 0; // No depreciation before purchase

  const purchaseCost = parseFloat(asset.cost);
  const depreciatedValue = purchaseCost * (1 - currentDepreciationRate);
  const totalDepreciation = purchaseCost * currentDepreciationRate;

  return {
    currentValue: depreciatedValue > 0 ? depreciatedValue : 0,
    depreciationPercentage: (currentDepreciationRate * 100).toFixed(2),
    totalDepreciation: totalDepreciation,
  };
};

// Get depreciation summary (total purchase cost, current total value, total depreciation)
export const getDepreciationSummary = async (req, res) => {
  try {
    const assets = await Asset.find({});
    let totalPurchaseCost = 0;
    let currentTotalValue = 0;
    let totalDepreciation = 0;

    assets.forEach(asset => {
      const purchaseCost = parseFloat(asset.cost);
      totalPurchaseCost += purchaseCost;

      const { currentValue, totalDepreciation: assetTotalDepreciation } = calculateDepreciation(asset);
      currentTotalValue += currentValue;
      totalDepreciation += assetTotalDepreciation;
    });

    res.status(200).json({
      totalPurchaseCost: totalPurchaseCost.toFixed(2),
      currentTotalValue: currentTotalValue.toFixed(2),
      totalDepreciation: totalDepreciation.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get depreciation details for all assets
export const getDepreciationDetails = async (req, res) => {
  try {
    const assets = await Asset.find({});
    const depreciationDetails = assets.map(asset => {
      const { currentValue, depreciationPercentage, totalDepreciation } = calculateDepreciation(asset);
      return {
        id: asset._id,
        name: asset.assetName,
        purchaseCost: parseFloat(asset.cost).toFixed(2),
        currentValue: currentValue.toFixed(2),
        depreciation: `${depreciationPercentage}%`,
        purchaseDate: asset.purchaseDate.toISOString().split('T')[0], // YYYY-MM-DD
        lifespan: `${asset.lifespan} years`,
        totalDepreciation: totalDepreciation.toFixed(2),
      };
    });
    res.status(200).json(depreciationDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get asset value trend for a chart (simplified: last 12 months)
export const getAssetValueTrend = async (req, res) => {
  try {
    const assets = await Asset.find({});
    const monthlyData = {};
    const now = new Date();

    // Initialize monthly data for the last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      monthlyData[monthKey] = 0;
    }

    assets.forEach(asset => {
      const purchaseCost = parseFloat(asset.cost);
      const purchaseDate = new Date(asset.purchaseDate);
      const annualDepreciationRate = 1 / asset.lifespan;

      for (let i = 11; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = monthDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });

        if (monthDate >= purchaseDate) {
          const yearsSinceMonth = (monthDate - purchaseDate) / (1000 * 60 * 60 * 24 * 365.25);
          let currentDepreciationRate = Math.min(yearsSinceMonth * annualDepreciationRate, 1);
          if (currentDepreciationRate < 0) currentDepreciationRate = 0;

          const valueAtMonth = purchaseCost * (1 - currentDepreciationRate);
          monthlyData[monthKey] += valueAtMonth;
        }
      }
    });

    const trendData = Object.keys(monthlyData).map(month => ({
      month: month.split(' ')[0], // e.g., "Jan"
      value: parseFloat(monthlyData[month].toFixed(2)),
    }));

    res.status(200).json(trendData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
