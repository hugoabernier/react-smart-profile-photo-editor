import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IProfilePhotoEditorProps {
  instructions: string;
  context: WebPartContext;
  requirePortrait: boolean;
  allowClipart: boolean;
  allowLinedrawing: boolean;
  allowRacy: boolean;
  allowAdult: boolean;
  allowGory: boolean;
  forbiddenKeywords: string;
}

export interface IProfilePhotoEditorState {
  errors: Array<any>;
  azureVisionKey: string;
  azureVisionEndpoint: string;
  hasConfiguration?: boolean;
  showWebCamDialog: boolean;
  imageUrl?: string;
}
