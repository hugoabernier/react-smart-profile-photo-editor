import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';

export interface IPhotoRequirements {
  requirePortrait: boolean;
  allowClipart: boolean;
  allowLinedrawing: boolean;
  allowRacy: boolean;
  allowAdult: boolean;
  allowGory: boolean;
  forbiddenKeywords: string[];
}


export interface IAnalysisDialogContentProps {
  imageUrl: string;
  azureKey: string;
  azureEndpoint: string;
  photoRequirements: IPhotoRequirements;

  /**
   * The DOM element to attach the dialog to
   */
  domElement: any;

  /**
   * Dismiss handler
   */
  onDismiss: () => void;
}

export interface IAnalysisDialogContentState {
  // This space for rent
  isAnalyzing: boolean;
  analysis?: AnalyzeImageInStreamResponse;
  isValid?: boolean;
  isPortrait?: boolean;
  isPortraitValid?: boolean;
  onlyOnePersonValid?: boolean;
  isClipartValid?: boolean;
  isLinedrawingValid?: boolean;
  isAdultValid?: boolean;
  isRacyValid?: boolean;
  isGoryValid?: boolean;
  keywordsValid?: boolean;
  invalidKeywords?: string[];
}
