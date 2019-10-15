import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import {
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import * as strings from 'ProfilePhotoEditorWebPartStrings';
import ProfilePhotoEditor from './components/ProfilePhotoEditor';
import { IProfilePhotoEditorProps } from './components/ProfilePhotoEditor.types';

export interface IProfilePhotoEditorWebPartProps {
  instructions: string;
  requirePortrait: boolean;
  allowClipart: boolean;
  allowLinedrawing: boolean;
  allowRacy: boolean;
  allowAdult: boolean;
  allowGory: boolean;
  forbiddenKeywords: string;
}

export default class ProfilePhotoEditorWebPart extends BaseClientSideWebPart<IProfilePhotoEditorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProfilePhotoEditorProps > = React.createElement(
      ProfilePhotoEditor,
      {
        //instructions: this.properties.instructions,
        context: this.context,
        ... this.properties
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('instructions', {
                  label: strings.InstructionsFieldLabel,
                  multiline: true
                }),
                PropertyPaneToggle('requirePortrait', {
                  label: strings.RequirePortraitFieldLabel
                }),
                PropertyPaneToggle('allowClipart', {
                  label: strings.AllowClipartFieldLabel
                }),
                PropertyPaneToggle('allowLinedrawing', {
                  label: strings.AllowLineDrawingFieldLabel
                }),
                PropertyPaneToggle('allowRacy', {
                  label: strings.AllowRacyFieldLabel
                }),
                PropertyPaneToggle('allowAdult', {
                  label: strings.AllowAdultImagesFieldLabel
                }),
                PropertyPaneToggle('allowGory', {
                  label: strings.AllowGoryFieldLabel
                }),
                PropertyPaneTextField('forbiddenKeywords', {
                  label: strings.ForbiddenTagsFieldLabel,
                  multiline: true,
                  description: strings.ForbiddenTagsFieldDescription
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
