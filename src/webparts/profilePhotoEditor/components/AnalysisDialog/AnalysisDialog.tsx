import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';

import { IPhotoRequirements } from './AnalysisDialog.types';
import { AnalysisDialogContent } from './AnalysisDialogContent';

/**
 * Analysis Panel Dialog
 */
export class AnalysisPanelDialog extends BaseDialog {
  private readonly imageUrl: string = undefined;
  private readonly azureKey: string = undefined;
  private readonly azureEndpoint: string = undefined;
  private readonly photoRequirements: IPhotoRequirements = undefined;
  /**
   *
   */
  constructor(imageUrl: string, azureKey: string, azureEndpoint: string, photoRequirements: IPhotoRequirements) {
    super();

    this.imageUrl = imageUrl;
    this.azureEndpoint = azureEndpoint;
    this.azureKey = azureKey;
    this.photoRequirements = photoRequirements;
  }

  /**
   * Configures a non-blocking dialog
   */
  public getConfig(): IDialogConfiguration {
    return {
      isBlocking: false
    };
  }

  /**
   * Renders the icon finder panel
   */
  public render(): void {
    ReactDOM.render(<AnalysisDialogContent
      domElement={document.activeElement.parentElement}
      onDismiss={this.onDismiss.bind(this)}
      imageUrl={this.imageUrl}
      azureEndpoint={this.azureEndpoint}
      azureKey={this.azureKey}
      photoRequirements={this.photoRequirements}
    />, this.domElement);
  }

  /**
   * Closes the dialog when dismissed
   */
  private onDismiss() {
    this.close();
    ReactDOM.unmountComponentAtNode(this.domElement);
  }
}

