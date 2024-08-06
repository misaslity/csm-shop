"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blogRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _blog = _interopRequireDefault(require("./blog.controller"));
var _verify_token = _interopRequireDefault(require("../../../middleware/verify_token"));
var blogRouter = _express["default"].Router();
exports.blogRouter = blogRouter;
blogRouter.post("/", _verify_token["default"], _blog["default"].addBlog);
blogRouter.put("/", _verify_token["default"], _blog["default"].updateBlog);
blogRouter.get("/s/t", _blog["default"].getListSuggestTour);
blogRouter.get("/", _blog["default"].getListBlog);
blogRouter.get("/t", _blog["default"].getListBlogCategory);
blogRouter.get("/t/d", _blog["default"].getDetailBlogCategory);
blogRouter.get("/d", _blog["default"].getBlogDetail);
blogRouter["delete"]("/", _blog["default"].deleteTour);
blogRouter.get("/admin", _verify_token["default"], _blog["default"].getListBlogAdmin);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2Jsb2ciLCJfdmVyaWZ5X3Rva2VuIiwiYmxvZ1JvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJleHBvcnRzIiwicG9zdCIsImF1dGhlbnRpY2F0ZUpXVCIsImJsb2dDb250cm9sbGVyIiwiYWRkQmxvZyIsInB1dCIsInVwZGF0ZUJsb2ciLCJnZXQiLCJnZXRMaXN0U3VnZ2VzdFRvdXIiLCJnZXRMaXN0QmxvZyIsImdldExpc3RCbG9nQ2F0ZWdvcnkiLCJnZXREZXRhaWxCbG9nQ2F0ZWdvcnkiLCJnZXRCbG9nRGV0YWlsIiwiZGVsZXRlVG91ciIsImdldExpc3RCbG9nQWRtaW4iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9ibG9nL2Jsb2cucm91dGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCJcclxuaW1wb3J0IGJsb2dDb250cm9sbGVyIGZyb20gXCIuL2Jsb2cuY29udHJvbGxlclwiO1xyXG5pbXBvcnQgYXV0aGVudGljYXRlSldUIGZyb20gXCIuLi8uLi8uLi9taWRkbGV3YXJlL3ZlcmlmeV90b2tlblwiO1xyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBibG9nUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHJcbmJsb2dSb3V0ZXIucG9zdChcIi9cIiwgYXV0aGVudGljYXRlSldULCBibG9nQ29udHJvbGxlci5hZGRCbG9nKVxyXG5ibG9nUm91dGVyLnB1dChcIi9cIiwgYXV0aGVudGljYXRlSldULCBibG9nQ29udHJvbGxlci51cGRhdGVCbG9nKVxyXG5ibG9nUm91dGVyLmdldChcIi9zL3RcIiwgYmxvZ0NvbnRyb2xsZXIuZ2V0TGlzdFN1Z2dlc3RUb3VyKVxyXG5ibG9nUm91dGVyLmdldChcIi9cIiwgYmxvZ0NvbnRyb2xsZXIuZ2V0TGlzdEJsb2cpXHJcbmJsb2dSb3V0ZXIuZ2V0KFwiL3RcIiwgYmxvZ0NvbnRyb2xsZXIuZ2V0TGlzdEJsb2dDYXRlZ29yeSlcclxuYmxvZ1JvdXRlci5nZXQoXCIvdC9kXCIsIGJsb2dDb250cm9sbGVyLmdldERldGFpbEJsb2dDYXRlZ29yeSlcclxuYmxvZ1JvdXRlci5nZXQoXCIvZFwiLCBibG9nQ29udHJvbGxlci5nZXRCbG9nRGV0YWlsKVxyXG5ibG9nUm91dGVyLmRlbGV0ZShcIi9cIiwgYmxvZ0NvbnRyb2xsZXIuZGVsZXRlVG91cilcclxuYmxvZ1JvdXRlci5nZXQoXCIvYWRtaW5cIiwgYXV0aGVudGljYXRlSldULCBibG9nQ29udHJvbGxlci5nZXRMaXN0QmxvZ0FkbWluKSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEtBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLGFBQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUdPLElBQU1HLFVBQVUsR0FBR0MsbUJBQU8sQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFBQ0MsT0FBQSxDQUFBSCxVQUFBLEdBQUFBLFVBQUE7QUFFM0NBLFVBQVUsQ0FBQ0ksSUFBSSxDQUFDLEdBQUcsRUFBRUMsd0JBQWUsRUFBRUMsZ0JBQWMsQ0FBQ0MsT0FBTyxDQUFDO0FBQzdEUCxVQUFVLENBQUNRLEdBQUcsQ0FBQyxHQUFHLEVBQUVILHdCQUFlLEVBQUVDLGdCQUFjLENBQUNHLFVBQVUsQ0FBQztBQUMvRFQsVUFBVSxDQUFDVSxHQUFHLENBQUMsTUFBTSxFQUFFSixnQkFBYyxDQUFDSyxrQkFBa0IsQ0FBQztBQUN6RFgsVUFBVSxDQUFDVSxHQUFHLENBQUMsR0FBRyxFQUFFSixnQkFBYyxDQUFDTSxXQUFXLENBQUM7QUFDL0NaLFVBQVUsQ0FBQ1UsR0FBRyxDQUFDLElBQUksRUFBRUosZ0JBQWMsQ0FBQ08sbUJBQW1CLENBQUM7QUFDeERiLFVBQVUsQ0FBQ1UsR0FBRyxDQUFDLE1BQU0sRUFBRUosZ0JBQWMsQ0FBQ1EscUJBQXFCLENBQUM7QUFDNURkLFVBQVUsQ0FBQ1UsR0FBRyxDQUFDLElBQUksRUFBRUosZ0JBQWMsQ0FBQ1MsYUFBYSxDQUFDO0FBQ2xEZixVQUFVLFVBQU8sQ0FBQyxHQUFHLEVBQUVNLGdCQUFjLENBQUNVLFVBQVUsQ0FBQztBQUNqRGhCLFVBQVUsQ0FBQ1UsR0FBRyxDQUFDLFFBQVEsRUFBRUwsd0JBQWUsRUFBRUMsZ0JBQWMsQ0FBQ1csZ0JBQWdCLENBQUMifQ==