"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockHttpClient = (function () {
    function MockHttpClient() {
    }
    MockHttpClient.get = function () {
        return new Promise(function (resolve) {
            resolve(MockHttpClient._items);
        });
    };
    MockHttpClient._items = [{ Title: 'Mock List', Id: '1',
            Department: 'string',
            URL: 'string'
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
    return MockHttpClient;
}());
exports.default = MockHttpClient;

//# sourceMappingURL=MockHttpClient.js.map
