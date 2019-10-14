import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClientResponse, SPHttpClient } from "@microsoft/sp-http";

export class StorageEntityService {
  private context: WebPartContext = undefined;
  /**
   *
   */
  constructor(context: WebPartContext) {
    this.context = context;
  }

  public GetStorageEntity = async (storageKey: string): Promise<string> =>  {
    const { absoluteUrl } = this.context.pageContext.web;
    const apiUrl: string = `${absoluteUrl}/_api/web/GetStorageEntity('${storageKey}')`;
    const response: SPHttpClientResponse = await this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    const json: any = await response.json();
    return json.Value;
  }
}
