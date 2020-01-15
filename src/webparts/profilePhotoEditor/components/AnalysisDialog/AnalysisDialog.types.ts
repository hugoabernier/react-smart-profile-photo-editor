import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';
import { WebPartContext } from '@microsoft/sp-webpart-base';

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
   * The web part context we'll need to call APIs
   */
  context: WebPartContext;

  blob: Blob;

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
