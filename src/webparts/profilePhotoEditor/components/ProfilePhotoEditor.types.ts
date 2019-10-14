import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IProfilePhotoEditorProps {
  instructions: string;
  context: WebPartContext;
}

export interface IProfilePhotoEditorState {
  file: any;
  errors: Array<any>;
  cropper: boolean;
  croppedImage: string;
  azureVisionKey: string;
  azureVisionEndpoint: string;
  hasConfiguration?: boolean;
}
