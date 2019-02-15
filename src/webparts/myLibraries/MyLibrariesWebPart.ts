import { Version } from '@microsoft/sp-core-library';
import { sp, Items, ItemVersion, UtilityMethod } from "@pnp/sp";

import {
  Environment,
  EnvironmentType
 } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MyLibrariesWebPart.module.scss';

import * as strings from 'MyLibrariesWebPartStrings';

import {
  SPHttpClient,
  SPHttpClientResponse   
 } from '@microsoft/sp-http';

//import { CurrentUser } from '@pnp/sp/src/siteusers';
//import SPUser from '@microsoft/sp-page-context';

export interface IMyLibrariesWebPartProps {
  description: string;
}

export interface ISPLists {
  value: ISPList[];
 }

 export interface ISPList {
  Title: string; // this is the library name
  Id: string;
  URL: string; // url to link to the library
  Department: string;

 }

 //global vars
 var userDept = "";

export default class MyLibrariesWebPart extends BaseClientSideWebPart<IMyLibrariesWebPartProps> {

  // main promoise method, 1st we get the department, second chain is a REST Call to query the list
// third we get the list data and figure out the document libraries
getuser = new Promise((resolve,reject) => {
  // SharePoint PnP Rest Call to get the User Profile Properties
  return sp.profiles.myProperties.get().then(function(result) {
    var props = result.UserProfileProperties;
    var propValue = "";
    var userDepartment = "";

    props.forEach(function(prop) {
      //this call returns key/value pairs so we need to look for the Dept Key
      if(prop.Key == "Department"){
        // set our global var for the users Dept.
        userDept += prop.Value;
      }
    });
    return result;
  }).then((result) =>{
    this._getListData().then((response) =>{
      this._renderList(response.value);
    });
  });

});

// main method to build html
  public render(): void {
    this.domElement.innerHTML = `
    <h1>My Team Libraries</h1>
      <h3><div id="docLibNames"/></h3>
      `;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  
  // main REST Call to the list...passing in the deaprtment into the call to 
  //return a single list item
  public _getListData(): Promise<ISPLists> {  
    return this.context.spHttpClient.get(`https://girlscoutsrv.sharepoint.com/_api/web/lists/GetByTitle('TeamDashboardLibraries')/Items?$filter=Department eq '`+ userDept +`'`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
   }

 private _renderList(items: ISPList[]): void {
  let html: string = '';

  var siteURL = "";
  items.forEach((item: ISPList) => {
    console.log("Library Name: " + item.Title);
    console.log("Department: "+ item.Department);
    console.log("URL String: " + item.URL);
    let date = new Date().toUTCString();

    html += `
   <ul class="">
     <li class="">
       <a href="${item.URL}><span class="ms-font-l">${item.Title}</a></span>
     </li>
   </ul>`

  });
 

  const listContainer: Element = this.domElement.querySelector('#docLibNames');
  listContainer.innerHTML = html;
}
  
// this is required to use the SharePoint PnP shorthand REST CALLS
   public onInit():Promise<void> {
     return super.onInit().then (_=> {
       sp.setup({
         spfxContext:this.context
       });
     });
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
