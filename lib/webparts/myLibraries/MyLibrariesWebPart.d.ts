import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IMyLibrariesWebPartProps {
    description: string;
}
export interface ISPLists {
    value: ISPList[];
}
export interface ISPList {
    Title: string;
    Id: string;
    URL: string;
    Department: string;
}
export default class MyLibrariesWebPart extends BaseClientSideWebPart<IMyLibrariesWebPartProps> {
    getuser: Promise<{}>;
    render(): void;
    protected readonly dataVersion: Version;
    _getListData(): Promise<ISPLists>;
    private _renderList(items);
    onInit(): Promise<void>;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
