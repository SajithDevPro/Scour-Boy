// export interface RadarData {
//   dribbling: number;
//   pace: number;
//   agility: number;
//   tacticalIQ: number;
//   passing: number;
//   finishing: number;
//   composure: number;
//   creativity: number;
// }

// export interface ThreatAnalysis {
//   dangerous: string[];
//   exploitable: string[];
// }

// export interface PlayerComparison {
//   player: string;
//   reason: string;
//   similarity: number;
// }

// export interface EvolutionStep {
//   day: string;
//   focus: string;
//   drill: string;
// }

// export interface HeatmapData {
//   dominantSide: string;
//   attackingPreference: string;
//   zones: string[];
// }

// export interface ReportData {
//   overallRating: number;
//   archetype: string;
//   position: string;
//   weakFoot: number;
//   confidence: number;
//   aggression: number;
//   flair: number;
//   radar: RadarData;
//   threatAnalysis: ThreatAnalysis;
//   comparison: PlayerComparison;
//   footballDNA: string[];
//   evolutionRoadmap: EvolutionStep[];
//   scoutVerdict: string;
//   weakFootDevelopment: number;
//   milestones: string[];
  
//   potentialCeiling: number;
//   discipline: number;
//   mentality: number;
//   clutchFactor: number;
//   badges: string[];
//   heatmap: HeatmapData;
//   predictedGrowth: number;
// }



export interface RadarData {
  progressiveCarries: number;
  takeOnSuccess: number;
  finalThirdEntries: number;
  keyPassFreq: number;
  pressingSuccess: number;
  defensiveRecoveries: number;
  duelSuccess: number;
  retention: number;
}

export interface TacticalFunction {
  pressing: string;
  buildup: string;
  transition: string;
}

export interface TacticalFit {
  bestFormations: string[];
  bestRole: string;
  weakEnvironments: string[];
}

export interface PriorityBlock {
  timeframe: string;
  focus: string;
  action: string;
}

export interface DevelopmentModel {
  skillGap: string;
  priorityBlocks: PriorityBlock[];
}

export interface HeatmapData {
  dominantSide: string;
  attackingPreference: string;
  zones: string[];
}

export interface PlayerComparison {
  player: string;
  reason: string;
  similarity: number;
}

export interface ReportData {
  growth: any;
  identity: any;
  reality: any;
  overallRating: number;
  roleProfile: string;
  position: string;
  tacticalFunction: TacticalFunction;
  riskProfile: string;
  radar: RadarData;
  observations: string[];
  tacticalFit: TacticalFit;
  developmentModel: DevelopmentModel;
  comparison: PlayerComparison;
  heatmap: HeatmapData;
  scoutVerdict: string;
}
