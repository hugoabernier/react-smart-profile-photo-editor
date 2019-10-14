import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ProfilePhotoEditorWebPartStrings';
import ProfilePhotoEditor from './components/ProfilePhotoEditor';
import { IProfilePhotoEditorProps } from './components/ProfilePhotoEditor.types';

export interface IProfilePhotoEditorWebPartProps {
  instructions: string;
}

export default class ProfilePhotoEditorWebPart extends BaseClientSideWebPart<IProfilePhotoEditorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProfilePhotoEditorProps > = React.createElement(
      ProfilePhotoEditor,
      {
        instructions: this.properties.instructions,
        context: this.context
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
                  label: strings.InstructionsFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
