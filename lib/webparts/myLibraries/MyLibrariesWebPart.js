"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_1 = require("@pnp/sp");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = require("MyLibrariesWebPartStrings");
var sp_http_1 = require("@microsoft/sp-http");
//global vars
var userDept = "";
var MyLibrariesWebPart = (function (_super) {
    __extends(MyLibrariesWebPart, _super);
    function MyLibrariesWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // main promoise method, 1st we get the department, second chain is a REST Call to query the list
        // third we get the list data and figure out the document libraries
        _this.getuser = new Promise(function (resolve, reject) {
            // SharePoint PnP Rest Call to get the User Profile Properties
            return sp_1.sp.profiles.myProperties.get().then(function (result) {
                var props = result.UserProfileProperties;
                var propValue = "";
                var userDepartment = "";
                props.forEach(function (prop) {
                    //this call returns key/value pairs so we need to look for the Dept Key
                    if (prop.Key == "Department") {
                        // set our global var for the users Dept.
                        userDept += prop.Value;
                    }
                });
                return result;
            }).then(function (result) {
                _this._getListData().then(function (response) {
                    _this._renderList(response.value);
                });
            });
        });
        return _this;
    }
    // main method to build html
    MyLibrariesWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n    <h1>My Team Libraries</h1>\n      <h3><div id=\"docLibNames\"/></h3>\n      ";
    };
    Object.defineProperty(MyLibrariesWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    // main REST Call to the list...passing in the deaprtment into the call to 
    //return a single list item
    MyLibrariesWebPart.prototype._getListData = function () {
        return this.context.spHttpClient.get("https://girlscoutsrv.sharepoint.com/_api/web/lists/GetByTitle('TeamDashboardLibraries')/Items?$filter=Department eq '" + userDept + "'", sp_http_1.SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        });
    };
    MyLibrariesWebPart.prototype._renderList = function (items) {
        var html = '';
        var libHTML = '';
        var siteURL = "";
        items.forEach(function (item) {
            console.log("Library Name: " + item.Title);
            console.log("Department: " + item.Department);
            console.log("URL String: " + item.URL);
            html += "\n   <ul class=\"\">\n     <li class=\"\">\n       <a href=\"" + item.URL + "><span class=\"ms-font-l\">" + item.Title + "</a></span>\n     </li>\n   </ul>";
        });
        var listContainer = this.domElement.querySelector('#docLibNames');
        listContainer.innerHTML = html;
    };
    // this is required to use the SharePoint PnP shorthand REST CALLS
    MyLibrariesWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            sp_1.sp.setup({
                spfxContext: _this.context
            });
        });
    };
    MyLibrariesWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return MyLibrariesWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = MyLibrariesWebPart;

//# sourceMappingURL=MyLibrariesWebPart.js.map
