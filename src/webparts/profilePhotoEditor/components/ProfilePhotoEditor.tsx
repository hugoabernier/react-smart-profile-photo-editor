import * as React from 'react';

import styles from './ProfilePhotoEditor.module.scss';
import { IProfilePhotoEditorProps, IProfilePhotoEditorState } from './ProfilePhotoEditor.types';

// Used for localized text
import * as strings from 'ProfilePhotoEditorWebPartStrings';

// Used to allow dragging and dropping files
import Files from "react-butterfiles";

// Used to crop image
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

// Used for messages
import { MessageBar, MessageBarType } from 'office-ui-fabric-react';

// Used for toolbar
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { AnalysisPanelDialog } from './AnalysisDialog';

// Used to retrieve storage key
import { StorageEntityService } from '../../../services/StorageEntityService';


const maxSize: string = '4mb';
const acceptedFiles: string[] = ["image/jpg", "image/jpeg", "image/png"];

/**
 * Displays an upload area with support for webcam and allows users to crop an image
 *
 * Used in this class:
 * - Cropper: provides image cropping functionality
 * - Files: provides drag and drop file upload capability
 */
export default class ProfilePhotoEditor extends React.Component<IProfilePhotoEditorProps, IProfilePhotoEditorState> {
  /**
   * Holds a reference to the cropper
   */
  private cropper: Cropper = undefined;

  /**
   * Holds a reference to the div that can be clicked to launch the file browser
   */
  private fileBrowser: HTMLDivElement = undefined;

  /**
   *  Constructor
   */
  constructor(props: IProfilePhotoEditorProps) {
    super(props);

    this.state = {
      file: undefined,
      croppedImage: undefined,
      errors: [],
      cropper: false,
      azureVisionEndpoint: undefined,
      azureVisionKey: undefined,
      hasConfiguration: undefined
    };
  }

  public async componentDidMount(): Promise<void> {
    if (this.state.hasConfiguration === undefined) {
      const ses: StorageEntityService = new StorageEntityService(this.props.context);
      const key: string = await ses.GetStorageEntity("azurekey");
      const endpoint: string = await ses.GetStorageEntity("azureendpoint");

      console.log("Key, Endpoint", key, endpoint);
      this.setState({
        azureVisionEndpoint: endpoint,
        azureVisionKey: key,
        hasConfiguration: key !== undefined && endpoint !== undefined
      });
    }
  }

  public render(): React.ReactElement<IProfilePhotoEditorProps> {
    return (
      <div className={styles.profilePhotoEditor}>
        {this.state.errors.length > 0 && (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={(_ev) => this.resetFiles()}
            dismissButtonAriaLabel={strings.CloseLabel}
            truncated={false}
          >
            {this.state.errors.map((error: any, _index: number) => {
              console.log("ERROR:", error);
              let errorMessage: string = strings.UnexpectedErrorLabel;
              switch (error.type) {
                case "unsupportedFileType":
                  errorMessage = strings.UnsupportedFileTypeErrorLabel;
                  break;
                case "maxSizeExceeded":
                  errorMessage = strings.MaxSizeExceededErrorLabel;
                  break;
                case "multipleNotAllowed":
                  errorMessage = strings.MultipleFileTypeErrorLabel;
                  break;
              }

              return <p><b>{strings.ErrorLabel}:</b> {errorMessage}</p>;

            })}
          </MessageBar>
        )}
        <CommandBar
          items={this.getCommandBarItems()}
          overflowItems={this.getOverflowItems()}
          overflowButtonProps={{ ariaLabel: strings.MoreCommandAriaLabel }}
          farItems={this.getFarItems()}
          ariaLabel={strings.CommandBarAriaLabel}
        />
        <Files
          accept={acceptedFiles}
          convertToBase64
          maxSize={maxSize}
          onSuccess={this.handleSuccess}
          onError={this.handleErrors}
        >
          {({ browseFiles, getDropZoneProps }) => (
            <>
              {this.state.file !== undefined ? (
                <div
                  {...getDropZoneProps({
                    className: styles.dropZone
                  })}>
                  <Cropper
                    className={styles.cropper}
                    aspectRatio={1}
                    guides={true}
                    src={this.state.file.src.base64}
                    ref={cropper => { this.cropper = cropper; }}
                  />
                  <div ref={(elm) => this.fileBrowser = elm}
                  onClick={browseFiles}
                  {...getDropZoneProps({
                    className: styles.hiddenDropZone
                  })}
                  />
                </div>
              ) : (
                  <div
                    ref={(elm) => this.fileBrowser = elm}
                    onClick={browseFiles}
                    {...getDropZoneProps({
                      className: styles.dropZone
                    })}
                  >
                    <div className={styles.placeholderDescription}>
                      <span className={styles.placeholderDescriptionText}>{this.props.instructions}</span>
                    </div>
                  </div>
                )}
            </>
          )}
        </Files>

      </div>
    );
  }

  /**
   * Gets called when a file has been successfully uploaded
   */
  private handleSuccess = (files: any) => {
    this.setState({ file: files[0], errors: [] });
  }

  /**
   * Gets called when an error has occurred uploading a file
   */
  private handleErrors = (errors: any) => {
    console.log("Handle errors", errors);
    this.setState({ file: undefined, errors });
  }

  /**
   * Resets the editor by removing all files and errors
   */
  private resetFiles = () => {
    this.setState({
      file: undefined,
      croppedImage: undefined,
      errors: [],
      cropper: false
    });
  }

  /**
   * Renders the command bar items
   */
  private getCommandBarItems = () => {
    return [
      {
        key: 'upload',
        name: strings.UploadButtonName,
        iconProps: {
          iconName: 'Add'
        },
        onClick: () => {
          this.fileBrowser.click();
        }
      },
      {
        key: 'webcam',
        name: strings.CameraButtonName,
        iconProps: {
          iconName: 'Camera'
        },
        disabled: true,
        title: strings.CameraButtonLabel,
        onClick: () => console.log('Webcam')
      },
      {
        key: 'Save',
        name: strings.SubmitButtonName,
        iconProps: {
          iconName: 'Save'
        },
        disabled: this.state.file === undefined,
        title: this.state.file === undefined ? strings.SubmitPhotoDisabledTitle : strings.SubmitPhotoTitle,
        onClick: () => this.submitPhoto()
      }
    ];
  }

  /**
   * Renders the overflow items -- we don't have any right now
   */
  private getOverflowItems = () => {
    return [
    ];
  }

  /**
   * Renders the menu items at the far right of the toolbar
   */
  private getFarItems = () => {
    return [
      {
        key: 'reset',
        ariaLabel: 'Reset',
        iconProps: {
          iconName: 'Refresh'
        },
        onClick: () => this.resetFiles()
      }
    ];
  }

  private submitPhoto = () => {
    const imageToApprove: string = this.cropper.getCroppedCanvas().toDataURL();
    console.log("Image to approve", imageToApprove);
    const callout: AnalysisPanelDialog = new AnalysisPanelDialog(imageToApprove, this.state.azureVisionKey, this.state.azureVisionEndpoint);
        callout.show();
  }

  // private getStorageEntity = async (storageKey: string): Promise<string> =>  {
  //   const { absoluteUrl } = this.props.context.pageContext.web;
  //   const apiUrl: string = `${absoluteUrl}/_api/web/GetStorageEntity('${storageKey}')`;
  //   const response: SPHttpClientResponse = await this.props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
  //   const json: any = await response.json();
  //   return json.Value;
  // }
}
