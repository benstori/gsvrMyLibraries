import { ISPList } from './MyLibrariesWebPart';

export default class MockHttpClient  {

   private static _items: ISPList[] = [{ Title: 'Mock List', Id: '1',
   Department:'string',
   URL:'string'
   //AnncURL:"https://girlscoutsrv.sharepoint.com/gsrv_teams/sdgdev/Lists/Announcements",
  // DeptURL:"https://girlscoutsrv.sharepoint.com/gsrv_teams/sdgdev",
  // CalURL:"https://girlscoutsrv.sharepoint.com/gsrv_teams/sdgdev/Lists/Events",
  // a85u:"https://girlscoutsrv.sharepoint.com/gsrv_teams/sdgdev/Lists/Helpful%20Links" 
  //Name:'string',
  //Email:'string',
  //MobilePhone:'string',
 // Notes:'ring',
  //SipAddress:'string',
 // Picture:'string',
  //Department:'string',
  //JobTitle:'string',
  //FirstName:'string',
  //LastName:'string',
  //WorkPhone:'string',
 // UserName:''
}];

   public static get(): Promise<ISPList[]> {
   return new Promise<ISPList[]>((resolve) => {
           resolve(MockHttpClient._items);
       });
   }
}