"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _search = _interopRequireDefault(require("./search.controller"));
var searchRouter = _express["default"].Router();
exports.searchRouter = searchRouter;
searchRouter.get("/", _search["default"].searchProduct);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3NlYXJjaCIsInNlYXJjaFJvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJleHBvcnRzIiwiZ2V0Iiwic2VhcmNoQ29udHJvbGxlciIsInNlYXJjaFByb2R1Y3QiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9zZWFyY2gvc2VhcmNoLnJvdXRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJztcbmltcG9ydCBzZWFyY2hDb250cm9sbGVyIGZyb20gJy4vc2VhcmNoLmNvbnRyb2xsZXInO1xuXG5leHBvcnQgY29uc3Qgc2VhcmNoUm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxuc2VhcmNoUm91dGVyLmdldChcIi9cIiwgc2VhcmNoQ29udHJvbGxlci5zZWFyY2hQcm9kdWN0KSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLE9BQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUVPLElBQU1FLFlBQVksR0FBR0MsbUJBQU8sQ0FBQ0MsTUFBTSxDQUFDLENBQUM7QUFBQ0MsT0FBQSxDQUFBSCxZQUFBLEdBQUFBLFlBQUE7QUFFN0NBLFlBQVksQ0FBQ0ksR0FBRyxDQUFDLEdBQUcsRUFBRUMsa0JBQWdCLENBQUNDLGFBQWEsQ0FBQyJ9