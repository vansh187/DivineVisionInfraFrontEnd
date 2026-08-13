import { create } from 'zustand';

interface MasterplanState {
  hoveredPlotId: string | null;
  selectedPlotId: string | null;
  /** Plots to visually pulse/emphasize — set by hover, click, or the AI assistant. Same mechanism either way. */
  highlightedPlotIds: string[];

  setHoveredPlot: (id: string | null) => void;
  setSelectedPlot: (id: string | null) => void;
  setHighlightedPlots: (ids: string[]) => void;
}

export const useMasterplanStore = create<MasterplanState>((set) => ({
  hoveredPlotId: null,
  selectedPlotId: null,
  highlightedPlotIds: [],

  setHoveredPlot: (id) => set({ hoveredPlotId: id }),
  setSelectedPlot: (id) => set({ selectedPlotId: id }),
  setHighlightedPlots: (ids) => set({ highlightedPlotIds: ids }),
}));
