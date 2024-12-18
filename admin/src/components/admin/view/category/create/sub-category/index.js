import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import MainCategorylist from "../../../../../common/category/main-category";
import { GetCategoryDetails } from "../../../../../services";
import SubEdit from "./sub-edit";
import swal from "sweetalert";

export default class SubCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectCategory: "",
      getList: [],
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBack() {
    this.props.history.goBack();
  }
  handleChangeCategoryList = (value) => {
    this.setState({ selectCategory: value });
  };
  async getCategory() {
    let list = await GetCategoryDetails.getSubCategoryList();
    this.setState({ getList: list.data });
  }
  async componentDidMount() {
    this.getCategory();
  }
  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, selectCategory } = this.state;
    let data = { sub_name: name, categoryId: selectCategory };
    swal({
      title: "Bạn có chắc?",
      text: "You want to Add Sub Categories",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetCategoryDetails.createSubCategoryList(data);
        if (list) {
          this.getCategory();
        }
      }
    });
  };
  async handlDeleteById(id) {
    swal({
      title: "Bạn có chắc?",
      text: "You want to delete Category from the List",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetCategoryDetails.getSubDeleteById(id);
        if (value) {
          this.getCategory();
        }
      }
    });
  }
  render() {
    let self = this.state.getList;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Categories</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i className="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item active">Category</li>
        </ol>
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Add Sub Category</h4>
              </div>
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Category Name"
                      name="name"
                      onChange={(e) => this.handleChange(e)}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <label className="form-label">Chọn thể loại*</label>
                    <MainCategorylist
                      onSelectCategory={this.handleChangeCategoryList}
                    />
                  </div>
                  <button
                    className="save-btn hover-btn"
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    Add New
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7">
            <div className="all-cate-tags">
              <div className="row justify-content-between">
                <div className="col-lg-12 col-md-12">
                  <div className="card card-static-2 mb-30">
                    <div className="card-title-2">
                      <h4>All Sub Categories</h4>
                    </div>
                    <div className="card-body-table">
                      <div className="table-responsive">
                        <table className="table ucp-table table-hover">
                          <thead>
                            <tr>
                              <th style={{ width: 60 }}>
                                <input type="checkbox" className="check-all" />
                              </th>
                              <th scope="col">Category</th>
                              <th scope="col">Sub Category</th>
                              <th scope="col">Date</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {self.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    className="check-item"
                                    name="ids[]"
                                    defaultValue={5}
                                  />
                                </td>
                                <td>{row.category ? row.category.name : ""}</td>
                                <td>{row.sub_name}</td>
                                <td>
                                  <span className="delivery-time">
                                    {this.formatDate(row.createdAt)}
                                  </span>
                                </td>
                                <td className="action-btns">
                                  <SubEdit state={row} />
                                  <Typography
                                    className="delete-btn"
                                    onClick={(e) =>
                                      this.handlDeleteById(row.id)
                                    }
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Typography>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
