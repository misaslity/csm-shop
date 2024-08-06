'use strict';

module.exports = function (sequelize, DataTypes) {
  var history_edit_tour = sequelize.define('history_edit_tour', {
    tour_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    time_updated: DataTypes.STRING
  }, {});
  history_edit_tour.associate = function (models) {
    // associations can be defined here
    models.history_edit_tour.belongsTo(models.tour, {
      foreignKey: 'tour_id'
    });
    models.history_edit_tour.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
  };
  return history_edit_tour;
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic2VxdWVsaXplIiwiRGF0YVR5cGVzIiwiaGlzdG9yeV9lZGl0X3RvdXIiLCJkZWZpbmUiLCJ0b3VyX2lkIiwiSU5URUdFUiIsInVzZXJfaWQiLCJ0aW1lX3VwZGF0ZWQiLCJTVFJJTkciLCJhc3NvY2lhdGUiLCJtb2RlbHMiLCJiZWxvbmdzVG8iLCJ0b3VyIiwiZm9yZWlnbktleSIsInVzZXIiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL2hpc3RvcnlfZWRpdF90b3VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcclxubW9kdWxlLmV4cG9ydHMgPSAoc2VxdWVsaXplLCBEYXRhVHlwZXMpID0+IHtcclxuICBjb25zdCBoaXN0b3J5X2VkaXRfdG91ciA9IHNlcXVlbGl6ZS5kZWZpbmUoJ2hpc3RvcnlfZWRpdF90b3VyJywge1xyXG4gICAgdG91cl9pZDogRGF0YVR5cGVzLklOVEVHRVIsXHJcbiAgICB1c2VyX2lkOiBEYXRhVHlwZXMuSU5URUdFUixcclxuICAgIHRpbWVfdXBkYXRlZDogRGF0YVR5cGVzLlNUUklOR1xyXG5cclxuICB9LCB7fSk7XHJcbiAgaGlzdG9yeV9lZGl0X3RvdXIuYXNzb2NpYXRlID0gZnVuY3Rpb24obW9kZWxzKSB7XHJcbiAgICAvLyBhc3NvY2lhdGlvbnMgY2FuIGJlIGRlZmluZWQgaGVyZVxyXG4gICAgbW9kZWxzLmhpc3RvcnlfZWRpdF90b3VyLmJlbG9uZ3NUbyhtb2RlbHMudG91ciwgeyBmb3JlaWduS2V5OiAndG91cl9pZCcgfSk7XHJcbiAgICBtb2RlbHMuaGlzdG9yeV9lZGl0X3RvdXIuYmVsb25nc1RvKG1vZGVscy51c2VyLCB7IGZvcmVpZ25LZXk6ICd1c2VyX2lkJyB9KTtcclxuXHJcbiAgfTtcclxuICByZXR1cm4gaGlzdG9yeV9lZGl0X3RvdXI7XHJcbn07Il0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZOztBQUNaQSxNQUFNLENBQUNDLE9BQU8sR0FBRyxVQUFDQyxTQUFTLEVBQUVDLFNBQVMsRUFBSztFQUN6QyxJQUFNQyxpQkFBaUIsR0FBR0YsU0FBUyxDQUFDRyxNQUFNLENBQUMsbUJBQW1CLEVBQUU7SUFDOURDLE9BQU8sRUFBRUgsU0FBUyxDQUFDSSxPQUFPO0lBQzFCQyxPQUFPLEVBQUVMLFNBQVMsQ0FBQ0ksT0FBTztJQUMxQkUsWUFBWSxFQUFFTixTQUFTLENBQUNPO0VBRTFCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNOTixpQkFBaUIsQ0FBQ08sU0FBUyxHQUFHLFVBQVNDLE1BQU0sRUFBRTtJQUM3QztJQUNBQSxNQUFNLENBQUNSLGlCQUFpQixDQUFDUyxTQUFTLENBQUNELE1BQU0sQ0FBQ0UsSUFBSSxFQUFFO01BQUVDLFVBQVUsRUFBRTtJQUFVLENBQUMsQ0FBQztJQUMxRUgsTUFBTSxDQUFDUixpQkFBaUIsQ0FBQ1MsU0FBUyxDQUFDRCxNQUFNLENBQUNJLElBQUksRUFBRTtNQUFFRCxVQUFVLEVBQUU7SUFBVSxDQUFDLENBQUM7RUFFNUUsQ0FBQztFQUNELE9BQU9YLGlCQUFpQjtBQUMxQixDQUFDIn0=