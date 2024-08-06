"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customerRouter = void 0;
var _express = _interopRequireDefault(require("express"));
var _customer = _interopRequireDefault(require("./customer.controller"));
var _sanitizer = require("../../../middleware/sanitizer");
var _strategy = require("../../../middleware/strategy");
var _validator = require("../../../middleware/validator");
var _verify_token = _interopRequireDefault(require("../../../middleware/verify_token"));
var customerRouter = _express["default"].Router();
exports.customerRouter = customerRouter;
customerRouter.route('/register').post(_customer["default"].addUser);
customerRouter.route('/getUserByEmailId').get(_customer["default"].findUser);
customerRouter.route('/login').post(_customer["default"].login);

// get all customer
customerRouter.route('/list').get(_customer["default"].getAllCustomer);
customerRouter.route('/update').post(_customer["default"].getCustomerUpdate);
customerRouter.route('/delete')["delete"](_customer["default"].deleteCustomer);
customerRouter.route("/voucher").get(_verify_token["default"], _customer["default"].getVoucherCustomer);
customerRouter.route("/voucher/has").get(_verify_token["default"], _customer["default"].getVoucherCustomer2);
customerRouter.route("/voucher").post(_verify_token["default"], _customer["default"].postVoucherCustomer);
customerRouter.route("/voucher").put(_verify_token["default"], _customer["default"].putVoucherCustomer);
customerRouter.route("/voucher")["delete"](_verify_token["default"], _customer["default"].deleteVoucherCustomer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2N1c3RvbWVyIiwiX3Nhbml0aXplciIsIl9zdHJhdGVneSIsIl92YWxpZGF0b3IiLCJfdmVyaWZ5X3Rva2VuIiwiY3VzdG9tZXJSb3V0ZXIiLCJleHByZXNzIiwiUm91dGVyIiwiZXhwb3J0cyIsInJvdXRlIiwicG9zdCIsImN1c3RvbWVyQ29udHJvbGxlciIsImFkZFVzZXIiLCJnZXQiLCJmaW5kVXNlciIsImxvZ2luIiwiZ2V0QWxsQ3VzdG9tZXIiLCJnZXRDdXN0b21lclVwZGF0ZSIsImRlbGV0ZUN1c3RvbWVyIiwiYXV0aGVudGljYXRlSldUIiwiZ2V0Vm91Y2hlckN1c3RvbWVyIiwiZ2V0Vm91Y2hlckN1c3RvbWVyMiIsInBvc3RWb3VjaGVyQ3VzdG9tZXIiLCJwdXQiLCJwdXRWb3VjaGVyQ3VzdG9tZXIiLCJkZWxldGVWb3VjaGVyQ3VzdG9tZXIiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL3Jlc291cmNlcy9jdXN0b21lci9jdXN0b21lci5yb3V0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcyc7XHJcbmltcG9ydCBjdXN0b21lckNvbnRyb2xsZXIgZnJvbSAnLi9jdXN0b21lci5jb250cm9sbGVyJztcclxuaW1wb3J0IHsgc2FuaXRpemUgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3Nhbml0aXplcic7XHJcbmltcG9ydCB7IGN1c3RvbWVyU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi8uLi9taWRkbGV3YXJlL3N0cmF0ZWd5JztcclxuaW1wb3J0IHsgdmFsaWRhdGVCb2R5LCBzY2hlbWFzIH0gZnJvbSAnLi4vLi4vLi4vbWlkZGxld2FyZS92YWxpZGF0b3InO1xyXG5pbXBvcnQgYXV0aGVudGljYXRlSldUIGZyb20gJy4uLy4uLy4uL21pZGRsZXdhcmUvdmVyaWZ5X3Rva2VuJztcclxuXHJcbmV4cG9ydCBjb25zdCBjdXN0b21lclJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5jdXN0b21lclJvdXRlci5yb3V0ZSgnL3JlZ2lzdGVyJykucG9zdChjdXN0b21lckNvbnRyb2xsZXIuYWRkVXNlcik7XHJcbmN1c3RvbWVyUm91dGVyLnJvdXRlKCcvZ2V0VXNlckJ5RW1haWxJZCcpLmdldChjdXN0b21lckNvbnRyb2xsZXIuZmluZFVzZXIpO1xyXG5jdXN0b21lclJvdXRlci5yb3V0ZSgnL2xvZ2luJykucG9zdChjdXN0b21lckNvbnRyb2xsZXIubG9naW4pO1xyXG5cclxuXHJcbi8vIGdldCBhbGwgY3VzdG9tZXJcclxuY3VzdG9tZXJSb3V0ZXIucm91dGUoJy9saXN0JykuZ2V0KGN1c3RvbWVyQ29udHJvbGxlci5nZXRBbGxDdXN0b21lcik7XHJcbmN1c3RvbWVyUm91dGVyLnJvdXRlKCcvdXBkYXRlJykucG9zdChjdXN0b21lckNvbnRyb2xsZXIuZ2V0Q3VzdG9tZXJVcGRhdGUpO1xyXG5jdXN0b21lclJvdXRlci5yb3V0ZSgnL2RlbGV0ZScpLmRlbGV0ZShjdXN0b21lckNvbnRyb2xsZXIuZGVsZXRlQ3VzdG9tZXIpO1xyXG5cclxuY3VzdG9tZXJSb3V0ZXIucm91dGUoXCIvdm91Y2hlclwiKS5nZXQoYXV0aGVudGljYXRlSldULCBjdXN0b21lckNvbnRyb2xsZXIuZ2V0Vm91Y2hlckN1c3RvbWVyKVxyXG5jdXN0b21lclJvdXRlci5yb3V0ZShcIi92b3VjaGVyL2hhc1wiKS5nZXQoYXV0aGVudGljYXRlSldULCBjdXN0b21lckNvbnRyb2xsZXIuZ2V0Vm91Y2hlckN1c3RvbWVyMilcclxuY3VzdG9tZXJSb3V0ZXIucm91dGUoXCIvdm91Y2hlclwiKS5wb3N0KGF1dGhlbnRpY2F0ZUpXVCwgY3VzdG9tZXJDb250cm9sbGVyLnBvc3RWb3VjaGVyQ3VzdG9tZXIpXHJcbmN1c3RvbWVyUm91dGVyLnJvdXRlKFwiL3ZvdWNoZXJcIikucHV0KGF1dGhlbnRpY2F0ZUpXVCwgY3VzdG9tZXJDb250cm9sbGVyLnB1dFZvdWNoZXJDdXN0b21lcilcclxuY3VzdG9tZXJSb3V0ZXIucm91dGUoXCIvdm91Y2hlclwiKS5kZWxldGUoYXV0aGVudGljYXRlSldULCBjdXN0b21lckNvbnRyb2xsZXIuZGVsZXRlVm91Y2hlckN1c3RvbWVyKVxyXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFBQSxRQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxTQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxVQUFBLEdBQUFGLE9BQUE7QUFDQSxJQUFBRyxTQUFBLEdBQUFILE9BQUE7QUFDQSxJQUFBSSxVQUFBLEdBQUFKLE9BQUE7QUFDQSxJQUFBSyxhQUFBLEdBQUFOLHNCQUFBLENBQUFDLE9BQUE7QUFFTyxJQUFNTSxjQUFjLEdBQUdDLG1CQUFPLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0FBQUNDLE9BQUEsQ0FBQUgsY0FBQSxHQUFBQSxjQUFBO0FBRS9DQSxjQUFjLENBQUNJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsSUFBSSxDQUFDQyxvQkFBa0IsQ0FBQ0MsT0FBTyxDQUFDO0FBQ2xFUCxjQUFjLENBQUNJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDSSxHQUFHLENBQUNGLG9CQUFrQixDQUFDRyxRQUFRLENBQUM7QUFDMUVULGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLG9CQUFrQixDQUFDSSxLQUFLLENBQUM7O0FBRzdEO0FBQ0FWLGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDSSxHQUFHLENBQUNGLG9CQUFrQixDQUFDSyxjQUFjLENBQUM7QUFDcEVYLGNBQWMsQ0FBQ0ksS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDQyxJQUFJLENBQUNDLG9CQUFrQixDQUFDTSxpQkFBaUIsQ0FBQztBQUMxRVosY0FBYyxDQUFDSSxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQU8sQ0FBQ0Usb0JBQWtCLENBQUNPLGNBQWMsQ0FBQztBQUV6RWIsY0FBYyxDQUFDSSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUNJLEdBQUcsQ0FBQ00sd0JBQWUsRUFBRVIsb0JBQWtCLENBQUNTLGtCQUFrQixDQUFDO0FBQzVGZixjQUFjLENBQUNJLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQ0ksR0FBRyxDQUFDTSx3QkFBZSxFQUFFUixvQkFBa0IsQ0FBQ1UsbUJBQW1CLENBQUM7QUFDakdoQixjQUFjLENBQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQ0MsSUFBSSxDQUFDUyx3QkFBZSxFQUFFUixvQkFBa0IsQ0FBQ1csbUJBQW1CLENBQUM7QUFDOUZqQixjQUFjLENBQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQ2MsR0FBRyxDQUFDSix3QkFBZSxFQUFFUixvQkFBa0IsQ0FBQ2Esa0JBQWtCLENBQUM7QUFDNUZuQixjQUFjLENBQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBTyxDQUFDVSx3QkFBZSxFQUFFUixvQkFBa0IsQ0FBQ2MscUJBQXFCLENBQUMifQ==