import { HttpClient } from "@microsoft/sp-http";
import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';

export interface IAnalysisDialogContentProps {
  imageUrl: string;
  azureKey: string;
  azureEndpoint: string;
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
}
