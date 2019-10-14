import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';

import { IAnalysisDialogContentProps, IAnalysisDialogContentState } from './AnalysisDialog.types';

import { Panel } from 'office-ui-fabric-react/lib/Panel';

import styles from './AnalysisDialog.module.scss';

// Used for localized text
import * as strings from 'ProfilePhotoEditorWebPartStrings';

import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';

import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';

class AnalysisDialogContent extends
  React.Component<IAnalysisDialogContentProps, IAnalysisDialogContentState> {

  /**
   *
   */
  constructor(props: IAnalysisDialogContentProps) {
    super(props);
    this.state = {
      isAnalyzing: true,
      analysis: undefined
    };
  }

  public async componentDidMount() {
    if (this.state.isAnalyzing) {
      const { azureKey, azureEndpoint } = this.props; //: string = 'a3b556d051584840af27f1fd8b92dc34';
      //const endpoint: string = 'https://canadacentral.api.cognitive.microsoft.com/';

      let base64data: string = this.props.imageUrl.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,|^data:image\/jpg;base64,|^data:image\/jpeg;base64,/, '');
      var buf = new Buffer(base64data, 'base64');
      let computerVisionClient = new ComputerVisionClient(
        new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': azureKey } }), azureEndpoint);
      console.log('Analyzing URL image to describe...');
      var analysis: AnalyzeImageInStreamResponse = (await computerVisionClient.analyzeImageInStream(buf, {
        visualFeatures: ["Categories",
          "Adult",
          "Tags",
          "Description",
          "Faces",
          "Color",
          "ImageType",
          "Objects"]
      }));

      this.setState({
        isAnalyzing: false,
        analysis: analysis
      });
    }

  }

  public render(): JSX.Element {

    const isIt = flag => flag ? 'is' : "isn't";

    const { analysis, isAnalyzing } = this.state;

    const isPortrait: boolean = analysis && analysis.categories && analysis.categories.filter(c=>c.name === "people_portrait").length > 0;

    if (analysis !== undefined ) {
      console.log("Analysis", analysis);
      console.log(`This probably ${isIt(analysis.adult.isAdultContent)} adult content (${analysis.adult.adultScore.toFixed(4)} score)`);
      console.log(`This probably ${isIt(analysis.adult.isRacyContent)} racy content (${analysis.adult.racyScore.toFixed(4)} score)`);
    }

    return (
      <Panel
        isOpen={true}
        onDismiss={(ev?: React.SyntheticEvent<HTMLElement, Event>) => this.onDismiss(ev)}
        headerText={"Submit"}
        isLightDismiss={true}
      >
        <Image
          className={styles.thumbnailImg}
          imageFit={ImageFit.centerContain}
          src={this.props.imageUrl}
        />
        { isAnalyzing &&
          <div className={styles.diode}>
            <div className={styles.laser}></div>
          </div>

        }

        { isAnalyzing &&
        <div>Please wait, analyzing image...</div>
        }

        {! isAnalyzing && analysis &&
        <div>
        { analysis.description && analysis.description.captions && analysis.description.captions.length > 0 && <div>{analysis.description.captions[0].text}</div>}
        <ul>
          {/* <li>Description: {analysis.description.captions[0]}</li>
          <li>Number of Faces: {analysis.faces.length}</li>
          { analysis.faces.length > 0 && <li>Age: {analysis.faces[0].age}</li>}
          { analysis.faces.length > 0 && <li>Gender: {analysis.faces[0].gender}</li>}
          <li>Clip art: {analysis.imageType.clipArtType}</li>
          <li>Line drawing: {analysis.imageType.lineDrawingType}</li> */}
          <li>Racy: {analysis.adult.isRacyContent ? "Yes": "No"}</li>
          <li>Adult: {analysis.adult.isAdultContent ? "Yes": "No"}</li>
          <li>Gory: {analysis.adult.isGoryContent ? "Yes": "No"}</li>
          <li>Portrait: {isPortrait ? "Yes": "No"}</li>
        </ul>
        </div>
        }


      </Panel>
    );
  }

  private onDismiss = (_ev?: React.SyntheticEvent<HTMLElement, Event>) => {
    this.props.onDismiss();
  }
}


/**
 * Analysis Panel Dialog
 */
export class AnalysisPanelDialog extends BaseDialog {
  private readonly imageUrl: string = undefined;
  private readonly azureKey: string = undefined;
  private readonly azureEndpoint: string = undefined;
  /**
   *
   */
  constructor(imageUrl: string, azureKey: string, azureEndpoint: string) {
    super();

    this.imageUrl = imageUrl;
    this.azureEndpoint = azureEndpoint;
    this.azureKey = azureKey;
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

