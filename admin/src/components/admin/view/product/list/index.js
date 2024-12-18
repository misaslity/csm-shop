import React, {
  useState,
  useEffect,
  useContext,
  Fragment,
  useRef,
  useCallback,
} from "react";
import {
  Box,
  // Box,
  Button,
  // FormControl,
  FormControlLabel,
  IconButton,
  Stack,
  // InputLabel,
  // MenuItem,
  // Select,
  Typography,
} from "@mui/material";
import { GetCategoryDetails, GetProductDetails } from "../../../../services";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";
import numberWithCommas from "../../../../../util/number_thousand_separator";
// import axios from "axios";
import * as XLSX from "xlsx";
import {
  apiGetChildCategory,
  apiGetProvince,
  apiGetWard,
  getListProvince,
} from "../../../../../api";
import { getCookie } from "../../../../../function";
import { useParams } from "react-router-dom";
// import SelectBox3 from "../../../../../util/SelectBox3";
import {
  listBedRoom,
  listPrice,
  listSquare,
  listStar,
  listStatusRoom,
} from "../../../../../data/data";
import moment from "moment";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@material-ui/lab/Pagination";
import delete_bulk_product from "../../../../../api/delete_bulk_product";
import { AppContext } from "../../../../../App";
import { useHistory } from "react-router-dom";
import useQuery from "../../../../../util/useQuery";
import { CLIENT_URL } from "../../../../../config1";
import getAllProductListCategory from "../../../../../api/get_list_product_category";
// import search_product from "../../../../../api/searchProduct";
import search_product_filter from "../../../../../api/searchProductFilter";
import _, { debounce } from "lodash";
import MangeEmployeeProduct from "./MangeEmployeeProduct";
import get_list_employee_of_leader from "../../../../../api/get_list_employee_of_leader";
import get_list_product_user_manage from "../../../../../api/get_list_product_user_manage";
import { FaHistory } from "react-icons/fa";
import HistoryEditProduct from "./HistoryEditProduct";
import get_list_product_manage_by_user from "../../../../../api/get_list_product_manage_by_user";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const List = () => {
  const { id, subid } = useParams();
  const uid = getCookie("auid");
  // const
  const [listEmployee, setEmployee] = useState([]);
  const query = useQuery();
  const history = useHistory();
  const { user } = useContext(AppContext);
  const [originList, setOriginList] = useState([]);
  const [getList, setGetList] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [listSearch, setListSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  const isSearching = searchText.length > 0 ? true : false;
  const [isloaded, setIsLoaded] = useState(false);
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(30);
  const [orgtableData, setOrgtableData] = useState([]);
  const [selectCategory, setSelectCategory] = useState();
  const [selectSubCategory, setSelectSubCategory] = useState();
  const [listSubCategory, setListSubCategory] = useState([]);
  const [provinceDetail, setProvinceDetail] = useState([]);
  const [listWard, setListWard] = useState([]);
  const [ward, setWard] = useState();
  const [typeRoom, setTypeRoom] = useState();
  const [square, setSquare] = useState();
  const [price, setPrice] = useState();
  const [star, setStar] = useState();
  const [listProvince, setListProvince] = useState([]);
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [rent, setRent] = useState();
  const [listCheck, setListCheck] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [listProductUserManage, setListProductUserManage] = useState([]);
  const [listUserHasManageProduct, setListUserHasManageProduct] = useState([]);
  const [selectedUserHasManageProduct, setSelectedUserHasManageProduct] =
    useState();
  const [change1, setChange1] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [change, setChange] = useState(false);
  const [filterManager, setFilterManager] = useState();
  const currentItems = getList;
  const role = getCookie("role");
  const auid = getCookie("auid");

  const handlePageChange = (event, value) => {
    // setCurrentPage(value);
    const searchText =
      new URLSearchParams(window.location.search).get("search") || "";
    history.push(
      "/admin/p/" +
        id +
        "/" +
        subid +
        "/list?page=" +
        value +
        "&search=" +
        searchText
    );
  };

  const handlePrevClick = () => {
    const searchText =
      new URLSearchParams(window.location.search).get("search") || "";
    history.push(
      "/admin/p/" +
        id +
        "/" +
        subid +
        "/list?page=" +
        (parseInt(currentPage) - parseInt(1)) +
        "&search=" +
        searchText
    );
  };

  const handleNextClick = () => {
    const searchText =
      new URLSearchParams(window.location.search).get("search") || "";
    history.push(
      "/admin/p/" +
        id +
        "/" +
        subid +
        "/list?page=" +
        (parseInt(currentPage) + parseInt(1)) +
        "&search=" +
        searchText
    );
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (window.performance.navigation.type === 1) {
        localStorage.removeItem("data_temp_filter");
      }
    };

    // Add event listener for beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (parseInt(query.get("page")) >= 1) {
      setCurrentPage(parseInt(query.get("page")));
    } else {
      setCurrentPage(1);
    }
  }, [query.get("page"), currentPage]);

  const handleSearchFilter = async (is_draft) => {
    const dataTemp = {
      typeRoom: parseInt(typeRoom),
      rent: parseInt(rent),
      square: parseInt(square) ? parseInt(square) : square,
      price: parseInt(price) ? parseInt(price) : price,
      star: parseInt(star),
      province,
      district,
      ward,
      userId: selectedUserHasManageProduct,
      is_draft
    };
    localStorage.setItem("data_temp_filter", JSON.stringify(dataTemp));
    const result = await search_product_filter({
      id,
      subid,
      typeRoom,
      rent,
      square,
      price,
      province,
      district,
      ward,
      star,
      page: currentPage,
      searchText,
      userId: selectedUserHasManageProduct,
      is_draft
    });
    setFilterManager(result?.filterManager);
    setGetList(result.data);
    setTotalPage(result.pagination.totalPages);
    if (parseInt(result?.pagination?.totalPages) < parseInt(currentPage)) {
      history.push(
        "/admin/p/" +
          id +
          "/" +
          subid +
          "/list?page=" +
          1 +
          "&search=" +
          searchText
      );
    }
  };

  const resetSearchFilter = async () => {
    const result = await search_product_filter({
      id,
      subid,
      page: currentPage,
      searchText,
    });
    setFilterManager(result?.filterManager);
    setGetList(result.data);
    setTotalPage(result.pagination.totalPages);
  };

  const handleChange = (item) => {
    if (listCheck.includes(item)) {
      setListCheck(listCheck.filter((item1) => item1 != item));
    } else {
      setListCheck((prev) => [...prev, item]);
    }
  };

  const getListCategory = async () => {
    const list = await GetCategoryDetails.getCategoryList();
    setListCategory(list.data);
  };

  const getListChildCategory = async () => {
    const list = await apiGetChildCategory({ categoryId: selectCategory });
    setListSubCategory(list.data);
  };

  const getProductList = async (data) => {
    setIsLoaded(false);
    const dataTempFilter = JSON.parse(localStorage.getItem("data_temp_filter"));
    let list = await getAllProductListCategory({
      id,
      subid,
      ...dataTempFilter,
      typeRoom,
      rent,
      square,
      price,
      province,
      district,
      ward,
      star,
      page: currentPage,
      searchText:
        new URLSearchParams(window.location.search).get("search") || "",
      searchText:
        new URLSearchParams(window.location.search).get("search") || "",
    });
    if (list) {
      var tdata = list.data;
      var slice = tdata;
      setGetList(
        slice.filter(
          (item) => item.categoryId == id && item.subCategoryId == subid
        )
      );
      setOriginList(
        slice.filter(
          (item) => item.categoryId == id && item.subCategoryId == subid
        )
      );
      setOrgtableData(tdata);
      setTotalPage(list.pagination.totalPages);
      setIsLoaded(true);
    }
  };

  const getProductFilterList = async () => {
    const dataTempFilter = JSON.parse(localStorage.getItem("data_temp_filter"));
    const result = await search_product_filter({
      id,
      subid,
      ...dataTempFilter,
      page: currentPage,
      searchText: searchText
        ? searchText
        : new URLSearchParams(location.search).get("search") || "",
    });

    setFilterManager(result?.filterManager);
    setGetList(result.data);
    setTotalPage(result.pagination.totalPages);
  };

  // useEffect(() => {
  //   getProductList();
  // }, [
  //   id,
  //   subid,
  //   currentPage,
  //   new URLSearchParams(window.location.search).get("search"),
  // ]);

  useEffect(() => {
    const dataTempFilter = JSON.parse(localStorage.getItem("data_temp_filter"));
    if (dataTempFilter) {
      if (dataTempFilter?.typeRoom) {
        setTypeRoom(dataTempFilter.typeRoom || undefined);
      }
      if (dataTempFilter?.rent) {
        setRent(dataTempFilter.rent || undefined);
      }
      if (dataTempFilter?.square) {
        setSquare(dataTempFilter.square || undefined);
      }
      if (dataTempFilter?.price) {
        setPrice(dataTempFilter.price || undefined);
      }
      if (dataTempFilter?.province) {
        setProvince(dataTempFilter.province) || undefined;
      }
      if (dataTempFilter?.ward) {
        setWard(dataTempFilter.ward || undefined);
      }
      if (dataTempFilter?.district) {
        setDistrict(dataTempFilter.district || undefined);
      }
      if (dataTempFilter?.star) {
        setStar(dataTempFilter.star || undefined);
      }
      if (dataTempFilter?.selectedUserHasManageProduct) {
        setSelectedUserHasManageProduct(
          dataTempFilter.selectedUserHasManageProduct || undefined
        );
      }
    }
  }, []);

  useEffect(() => {
    getProductFilterList();
  }, [
    id,
    subid,
    currentPage,
    new URLSearchParams(window.location.search).get("search"),
    change,
  ]);

  useEffect(() => {
    getListCategory();
  }, []);

  useEffect(() => {
    getListChildCategory();
  }, [selectCategory]);

  useEffect(() => {
    setSearchText(
      new URLSearchParams(window.location.search).get("search") || ""
    );
  }, [new URLSearchParams(window.location.search).get("search")]);

  useEffect(() => {
    if (selectCategory && selectSubCategory) {
      setGetList(
        originList.filter(
          (item) =>
            item.categoryId == selectCategory &&
            item.subCategoryId == selectSubCategory
        )
      );
    } else if (selectCategory) {
      setGetList(
        originList.filter((item) => item.categoryId == selectCategory)
      );
    } else if (selectSubCategory) {
    }

    // setGetList(originList?.filter(item))
  }, [selectCategory, selectSubCategory]);

  const handleSearchInputChange = async (value) => {
    const dataTempFilter = JSON.parse(localStorage.getItem("data_temp_filter"));
    if (value.length <= 0 || !value) {
      const result = await search_product_filter({
        id,
        subid,
        ...dataTempFilter,
        page: currentPage,
        searchText: "",
      });
      setGetList(result.data);
      setTotalPage(result.pagination.totalPages);
      return;
    }
    const result = await search_product_filter({
      id,
      subid,
      ...dataTempFilter,
      page: currentPage,
      searchText: value,
    });
    setGetList(result.data);
    setTotalPage(result.pagination.totalPages);
    history.push(location.pathname + "?page=" + 1 + "&search=" + value);
  };

  const debouncedSearch = useCallback(
    debounce(handleSearchInputChange, 1000),
    []
  );

  const handleChangeSearch = (event) => {
    if (event.target.value?.length <= 0 || !event.target.value.length) {
      history.push(location.pathname + "?page=" + 1 + "&search=");
    }

    setSearchText(event.target.value);
    debouncedSearch(event.target.value);
  };
  const handlDeleteById = async (id) => {
    swal({
      title: "Bạn có chắc?",
      text: "Bạn có chắc muốn xoá sản phẩm này không ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let value = await GetProductDetails.getDeleteProduct(id);
        if (value) {
          getProductList();
        }
      }
    });
  };

  const loadMoreData = () => {
    const data = orgtableData;
    const slice = data;
    setGetList(slice);
  };

  const exportToExcel = (e) => {
    e.preventDefault();
    const headers = ["Tên sản phẩm", "Thể loại", "Giá", "Giảm giá"];

    // Thêm tiêu đề cột vào mảng dữ liệu

    const worksheet = XLSX.utils.json_to_sheet(
      getList?.map((product) => [
        product.name,
        product.SubCategory
          ? `${product.SubCategory.category.name} | ${product.SubCategory.sub_name}`
          : "..",
        product.price,
        product.discountPer,
      ])
    );
    getList.unshift(headers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sản phẩm");
    XLSX.writeFile(workbook, "product.xlsx");
  };

  // const refreshProduct = () => {
  //   setGetList(originList);
  //   setSelectCategory();
  //   setSelectSubCategory();
  // };

  const getprovince = async (code) => {
    const response = await apiGetProvince(code);
    setProvinceDetail(response.results);
  };

  const getdistrict = async (code) => {
    const response = await apiGetWard(code);
    setListWard(response.results);
  };

  useEffect(() => {
    if (province) getprovince(province);
    if (district) getdistrict(district);
  }, [province, district]);
  useEffect(() => {
    (async () => {
      const result = await getListProvince();
      setListProvince(result);
    })();
  }, []);

  const bulkDelete = async () => {
    try {
      const result = await delete_bulk_product({ list: listCheck });
      if (result.ok === true) {
        swal("Thông báo", "Đã xoá thành công", "success")
          .then(() => {
            setListCheck([]);
          })
          .then(() => {
            getProductList();
          });
      }
    } catch (error) {
      swal("Thông báo", "Đã có lỗi xảy ra", "error");
      console.log(error);
    }
    // const result= await res.data
  };

  const renderAuthorPhone = (row) => {
    if (
      role === "manager" ||
      role === "admin" ||
      role === "ceo" ||
      role === "operator" ||
      role === "marketing"
    ) {
      return row.author_phone ? row.author_phone : "Chưa thiết lập";
    } else if (role === "leader") {
      if (
        _.some(listEmployee, (item1) => {
          return _.some(
            row?.user_manager_products,
            (item2) => item1.id == item2.managerUser.id
          );
        })
      ) {
        return row.author_phone ? row.author_phone : "Chưa thiết lập";
      } else if (
        _.some(row?.user_manager_products, (item) => item.managerUser.id == uid)
      ) {
        return row.author_phone ? row.author_phone : "Chưa thiết lập";
      } else {
        return "Đã ẩn";
      }
    } else if (role === "employee") {
      if (
        _.some(row?.user_manager_products, (item) => item.managerUser.id == uid)
      ) {
        return row.author_phone ? row.author_phone : "Chưa thiết lập";
      } else {
        return "Đã ẩn";
      }
    } else {
      return "Đã ẩn";
    }
  };

  const renderAuthorNote = (row) => {
    // if (
    //   role === "manager" ||
    //   role === "admin" ||
    //   role === "ceo" ||
    //   role === "operator" ||
    //   role === "marketing" ||
    //   role === "leader"
    // ) {
    //   return row.note ? row.note : "Chưa thiết lập";
    // }
    // if (row.user) {
    //   if (role === "employee" && user.user_manager == row.user.id) {
    //     return row.note ? row.note : "Chưa thiết lập";
    //   } else if (role === "employee" && user.user_manager != row.user.id) {
    //     return "Đã ẩn";
    //   } else if (role === "parttime") {
    //     return "Đã ẩn";
    //   } else {
    //     return row.note ? row.note : "Chưa thiết lập";
    //   }
    // } else {
    //   return row.note ? row.note : "Chưa thiết lập";
    // }
    return row.note ? row.note : "Chưa thiết lập";
  };

  const checkPermissionActionP = (row) => {
    if (
      role === "manager" ||
      role === "admin" ||
      role === "ceo" ||
      role === "operator" ||
      role === "marketing"
    ) {
      return true;
    } else if (role === "leader") {
      if (
        _.some(listEmployee, (item1) => {
          return _.some(
            row?.user_manager_products,
            (item2) => item1.id == item2.managerUser.id
          );
        })
      ) {
        return true;
      } else if (
        _.some(row?.user_manager_products, (item) => item.managerUser.id == uid)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (role === "employee") {
      if (
        _.some(row?.user_manager_products, (item) => item.managerUser.id == uid)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const checkIsManagerProduct = (row) => {
    if (role === "ceo" || role === "admin" || role === "manager") {
      return true;
    }
    if (role === "leader") {
      if (
        _.some(listEmployee, (item1) => {
          return _.some(
            row?.user_manager_products,
            (item2) => item1.id == item2.managerUser.id
          );
        })
      ) {
        return true;
      } else if (
        _.some(row?.user_manager_products, (item) => item.managerUser.id == uid)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const tableRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (event) => {
    setIsMouseDown(true);
    setStartX(event.pageX - tableRef.current.offsetLeft);
    setScrollLeft(tableRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isMouseDown) return;

    const x = event.pageX - tableRef.current.offsetLeft;
    const distance = x - startX;
    tableRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseOut = () => {
    setIsMouseDown(false);
  };

  useEffect(() => {
    (async () => {
      try {
        // lấy ra danh sách nhân viên của người quản lý
        const result = await get_list_employee_of_leader({ uid });
        // console.log(result)
        setEmployee(result?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [uid]);

  useEffect(() => {
    (async () => {
      try {
        // lấy ra danh sách nhân viên của người quản lý
        const result = await get_list_product_user_manage({ uid });
        setListProductUserManage(result?.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [uid]);

  useEffect(() => {
    (async () => {
      try {
        const result = await get_list_product_manage_by_user();
        const groupedData = result?.data.reduce((acc, item) => {
          const userId = item.managerUser.id;

          if (!acc[userId]) {
            acc[userId] = {
              userId: item.managerUser.id,
              firstName: item.managerUser.firstName,
              lastName: item.managerUser.lastName,
              address: item.managerUser.address,
              email: item.managerUser.email,
            };
          }
          return acc;
        }, {});

        const result1 = Object.values(groupedData);
        setListUserHasManageProduct(result1);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [change1]);

  return (
    <div className="container-fluid">
      <div className="row justify-content-between mt-3">
        <div className="w-100 d-flex justify-content-between">
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <Link
              to={"/admin/p/" + id + "/" + subid + "/create"}
              className="add-btn hover-btn"
              style={{
                background: "#F37335",
                borderRadius: 15,
                width: "auto",
                whiteSpace: "nowrap",
                alignSelf: "end",
              }}
            >
              Thêm sản phẩm
            </Link>
            <input
              style={{
                width: "100%",
                height: "42px",
                border: "1px solid #e7e7e7",
                borderRadius: 15,
                padding: 10,
                background: "#F37335",
                alignSelf: "end",
                color: "white",
              }}
              type="text"
              value={searchText}
              className="inp-mk"
              onChange={handleChangeSearch}
              placeholder="Tìm kiếm..."
            />
          </div>
          <div
            className="d-flex align-items-center"
            style={{ marginLeft: 4, marginRight: 4 }}
          >
            <Box sx={{ alignSelf: "end" }}>
              <form>
                <div>
                  <label style={{ fontSize: 14 }}>Lọc dạng bài viết</label>
                </div>
                <select onChange={(e)=> handleSearchFilter(e.target.value)} style={{ height: 40, borderRadius: 8 }}>
                  <option value={"-1"} selected>
                    Tất cả
                  </option>
                  <option value={"0"}>Publish</option>
                  <option value={"1"}>Bản nháp</option>
                </select>
              </form>
            </Box>
          </div>
          <div className="d-flex align-items-center" style={{ gap: 20 }}>
            <a
              href={`/admin/p/${id}/${subid}/edit`}
              onClick={async (e) => {
                e.preventDefault();
                setTypeRoom(0);
                setSquare(0);
                setPrice(0);
                setRent(-1);
                setProvince(-1);
                setDistrict(-1);
                setWard(-1);
                setFilterManager(false);
                setCurrentPage(1);
                setSelectedUserHasManageProduct(-1);
                localStorage.removeItem("data_temp_filter");
                await resetSearchFilter();
                // getProductList();
              }}
              className="add-btn hover-btn"
              style={{
                background: "#F37335",
                borderRadius: 80,
                width: "auto",
                whiteSpace: "nowrap",
                alignSelf: "end",
              }}
            >
              Đặt lại bộ lọc
            </a>
            <a
              href={`/admin/p/${id}/${subid}/edit`}
              onClick={async (e) => {
                e.preventDefault();
                await handleSearchFilter();
              }}
              className="add-btn hover-btn"
              style={{
                background: "#F37335",
                borderRadius: 80,
                width: "auto",
                whiteSpace: "nowrap",
                alignSelf: "end",
              }}
            >
              Tìm kiếm
            </a>

            <div style={{ borderRadius: 10 }}>
              <div
                style={{
                  padding: 5,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  gap: 40,
                }}
                className="bg-gra d-flex align-items-center"
              >
                <div
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    textAlign: "center",
                    width: 200,
                    whiteSpace: "nowrap",
                  }}
                >
                  Loại phòng
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    textAlign: "center",
                    width: 200,
                    whiteSpace: "nowrap",
                  }}
                >
                  Địa điểm, vị trí
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    textAlign: "center",
                    width: 200,
                    whiteSpace: "nowrap",
                  }}
                >
                  Trạng thái
                </div>
              </div>
              <div
                className="d-flex"
                style={{
                  padding: 5,
                  background: "white",
                  width: "100%",
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  gap: 40,
                }}
              >
                <div style={{ width: 200 }}>
                  {id == 13 && (
                    <div
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        border: "1px solid #e7e7e7",
                        background: "#fff",
                        padding: 5,
                        marginBottom: 12,
                      }}
                    >
                      <select
                        className="custom-select-p"
                        value={typeRoom}
                        onChange={(e) => setTypeRoom(e.target.value)}
                      >
                        <option selected disabled value={0}>
                          Chọn hạng phòng
                        </option>
                        {listBedRoom
                          .filter(
                            (item) =>
                              parseInt(item.value) <= 11 ||
                              parseInt(item.value) === 19
                          )
                          ?.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  {id == 12 && (
                    <div
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        border: "1px solid #e7e7e7",
                        background: "#fff",
                        padding: 5,
                        marginBottom: 12,
                      }}
                    >
                      <select
                        className="custom-select-p"
                        value={typeRoom}
                        onChange={(e) => setTypeRoom(e.target.value)}
                      >
                        <option selected disabled value={0}>
                          Chọn hạng phòng
                        </option>
                        {listBedRoom
                          .filter(
                            (item) =>
                              parseInt(item.value) > 11 &&
                              parseInt(item.value) !== 19
                          )
                          ?.map((item, key) => (
                            <option key={key} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  {/*  */}
                  {id == 13 && (
                    <div
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        border: "1px solid #e7e7e7",
                        background: "#fff",
                        padding: 5,
                        marginBottom: 12,
                      }}
                    >
                      <select
                        className="custom-select-p"
                        value={square}
                        onChange={(e) => setSquare(e.target.value)}
                      >
                        <option selected disabled value={0}>
                          Chọn diện tích
                        </option>
                        {listSquare?.map((item, key) => (
                          <option key={key} value={item.value}>
                            {item.label} m<sub>2</sub>
                          </option>
                        ))}
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                      </select>
                    </div>
                  )}
                  {id == 12 && (
                    <div
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        border: "1px solid #e7e7e7",
                        background: "#fff",
                        padding: 5,
                        marginBottom: 12,
                      }}
                    >
                      <select
                        className="custom-select-p"
                        value={star}
                        onChange={(e) => setStar(e.target.value)}
                      >
                        <option selected disabled value={0}>
                          Chọn số sao
                        </option>
                        {listStar?.map((item, key) => (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/*  */}
                  {id == 13 && (
                    <div
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        border: "1px solid #e7e7e7",
                        background: "#fff",
                        padding: 5,
                        marginBottom: 12,
                      }}
                    >
                      <select
                        className="custom-select-p"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      >
                        <option selected disabled value={0}>
                          Chọn giá phòng
                        </option>
                        {listPrice?.map((item, key) => (
                          <option key={key} value={parseInt(item.value)}>
                            {item.label}
                          </option>
                        ))}
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                      </select>
                    </div>
                  )}
                  {id == 12 && (
                    <div
                      style={{
                        width: "100%",
                        borderRadius: 10,
                        border: "1px solid #e7e7e7",
                        background: "#fff",
                        padding: 5,
                        marginBottom: 12,
                      }}
                    >
                      <select
                        className="custom-select-p"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      >
                        <option selected disabled value={0}>
                          Chọn giá phòng
                        </option>
                        {listPrice?.map((item, key) => (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                      </select>
                    </div>
                  )}
                </div>
                {/*  */}
                <div style={{ width: 200 }}>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: "1px solid #e7e7e7",
                      background: "#fff",
                      padding: 5,
                      marginBottom: 12,
                    }}
                  >
                    {/* <SelectBox3
                      size={"small"}
                      value={province}
                      setValue={setProvince}
                      label={"Tỉnh / Thành phố"}
                      list={listProvince??.map((item) => ({
                        ...item,
                        value: item.province_id,
                        label: item.province_name,
                      }))}
                    /> */}
                    <select
                      className="custom-select-p"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    >
                      <option selected disabled value={-1}>
                        Tỉnh / Thành phố
                      </option>
                      {listProvince
                        ?.map((item) => ({
                          ...item,
                          value: item.province_id,
                          label: item.province_name,
                        }))
                        ?.map((item, key) => (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: "1px solid #e7e7e7",
                      background: "#fff",
                      padding: 5,
                      marginBottom: 12,
                    }}
                  >
                    <select
                      className="custom-select-p"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      <option selected disabled value={-1}>
                        Quận / Huyện
                      </option>
                      {provinceDetail
                        ?.map((el) => ({
                          ...el,
                          value: el.district_id,
                          label: el.district_name,
                        }))
                        ?.map((item, key) => (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: "1px solid #e7e7e7",
                      background: "#fff",
                      padding: 5,
                      marginBottom: 12,
                    }}
                  >
                    <select
                      className="custom-select-p"
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                    >
                      <option selected disabled value={-1}>
                        Xã / Phường
                      </option>
                      {listWard
                        ?.map((el) => ({
                          ...el,
                          value: el.ward_id,
                          label: el.ward_name,
                        }))
                        ?.map((item, key) => (
                          <option key={key} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {/*  */}
                <div style={{ width: 200 }}>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: "1px solid #e7e7e7",
                      background: "#fff",
                      padding: 5,
                      marginBottom: 12,
                    }}
                  >
                    <select
                      className="custom-select-p"
                      value={rent}
                      onChange={(e) => setRent(e.target.value)}
                    >
                      <option selected disabled value={-1}>
                        Chọn trạng thái phòng
                      </option>
                      {listStatusRoom?.map((item, key) => (
                        <option key={key} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      border: "1px solid #e7e7e7",
                      background: "#fff",
                      padding: 5,
                      marginBottom: 12,
                    }}
                  >
                    <select
                      className="custom-select-p"
                      value={selectedUserHasManageProduct}
                      onChange={(e) =>
                        setSelectedUserHasManageProduct(e.target.value)
                      }
                    >
                      <option selected disabled value={-1}>
                        Lọc theo người quản lý sp
                      </option>
                      {listUserHasManageProduct?.map((item, key) => (
                        <option key={key} value={item.userId}>
                          {item.firstName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {getCookie("role") === "admin" && (
          <div
            onClick={exportToExcel}
            className="col-lg-12 mt-3"
            style={{ cursor: "pointer" }}
          >
            <a style={{ color: "#fff" }} className="add-btn hover-btn">
              Xuất file excel
            </a>
          </div>
        )} */}
        {/* <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <br />
              
            </div>
            <div className="col-lg-2 col-md-2">
              <button className="save-btn hover-btn" onClick={handleSearch}>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div> */}
        {/* <div className="col-lg-12 col-md-12 mt-2">
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Thể loại</InputLabel>
              <Select
                style={{ height: 32 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectCategory}
                onChange={(e) => setSelectCategory(e.target.value)}
              >
                {listCategory
                  ?.map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.name,
                  }))
                  ?.map((item, key) => (
                    <MenuItem
                      value={item.value}
                      key={key}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </div> */}
        {/*  */}
        {/* <br /> */}
        {/* <br /> */}
        {/*  */}
        {/* <div className="col-lg-12 col-md-12">
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Thể loại con
              </InputLabel>
              <Select
                style={{ height: 32 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectSubCategory}
                onChange={(e) => setSelectSubCategory(e.target.value)}
              >
                {listSubCategory
                  ?.map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.sub_name,
                  }))
                  ?.map((item, key) => (
                    <MenuItem
                      value={item.value}
                      key={key}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </div> */}
        {/* <br />
        <br /> */}
        {/* <div className="col-lg-12 col-md-12 mt-2">
          <Button
            onClick={refreshProduct}
            color={"primary"}
            variant="contained"
          >
            Đặt lại
          </Button>
        </div> */}
        {/*  */}
        <div className="col-lg-12 col-md-12">
          <div className="card card-static-2 mt-30 mb-30">
            {/* <div className="card-title-2">
              <h4>Tất cả sản phẩm</h4>
            </div> */}
            <div className="card-body-table">
              <div
                className="table-responsive position-relative"
                id="container-table-transform"
              >
                <table
                  ref={tableRef}
                  id="table-transform"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseOut={handleMouseOut}
                  className="table ucp-table table-hover"
                >
                  <thead>
                    {id == 13 && (
                      <tr>
                        {/* <th style={{ width: 60 }}>Mã SP</th> */}
                        <th>
                          {/* <Checkbox /> */}
                          {listCheck.length > 0 && (
                            <Button
                              onClick={bulkDelete}
                              variant={"contained"}
                              color={"primary"}
                            >
                              Xoá
                            </Button>
                          )}
                        </th>
                        <th style={{ width: 100, whiteSpace: "nowrap" }}>
                          Hình ảnh
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>Mã sản phẩm</th>

                        <th style={{ whiteSpace: "nowrap" }}>Tên sản phẩm</th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Cập nhật lần cuối
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>Thời gian tạo</th>

                        <th style={{ whiteSpace: "nowrap" }}>
                          Người tạo sản phẩm
                        </th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Người quản lý sản phẩm
                        </th>
                        {/* <th style={{ whiteSpace: "nowrap" }}>SĐT liên hệ</th> */}
                        <th style={{ whiteSpace: "nowrap" }}>SĐT chủ nhà</th>
                        <th style={{ whiteSpace: "nowrap" }}>Địa chỉ chủ</th>

                        <th style={{ whiteSpace: "nowrap" }}>Giá bán</th>
                        <th style={{ whiteSpace: "nowrap" }}>Ghi chú</th>
                        {/* <th>Giá</th> */}
                        <th style={{ whiteSpace: "nowrap" }}>Trạng thái</th>
                        <th>Action</th>
                      </tr>
                    )}
                    {id == 12 && (
                      <tr>
                        <th style={{ whiteSpace: "nowrap" }}>
                          {/* <Checkbox /> */}
                          {listCheck.length > 0 && (
                            <Button
                              onClick={bulkDelete}
                              variant={"contained"}
                              color={"primary"}
                            >
                              Xoá
                            </Button>
                          )}
                        </th>
                        {/* <th style={{ width: 60 }}>Mã SP</th> */}
                        <th style={{ width: 100 }}>Hình ảnh</th>
                        <th style={{ whiteSpace: "nowrap" }}>Tên sản phẩm</th>
                        <th style={{ whiteSpace: "nowrap" }}>
                          Cập nhật lần cuối
                        </th>

                        <th style={{ whiteSpace: "nowrap" }}>Khu vực</th>

                        <th style={{ whiteSpace: "nowrap" }}>Giá bán</th>
                        {/* <th style={{ whiteSpace: "nowrap" }}>SĐT liên hệ</th> */}
                        <th style={{ whiteSpace: "nowrap" }}>Giá đại lý</th>
                        <th style={{ whiteSpace: "nowrap" }}>Địa chỉ</th>
                        <th style={{ whiteSpace: "nowrap" }}>Ghi chú</th>
                        {/* <th>Giá</th> */}
                        {/* <th style={{ whiteSpace: "nowrap" }}>Trạng thái</th> */}
                        <th style={{ whiteSpace: "nowrap" }}>Action</th>
                      </tr>
                    )}
                  </thead>
                  {id == 13 && (
                    <tbody>
                      {!isSearching &&
                        currentItems?.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      listCheck.filter((item) => item == row.id)
                                        .length > 0
                                        ? true
                                        : false
                                    }
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>
                              <a
                                href={CLIENT_URL + "/product/" + row.id}
                                target="_blank"
                              >
                                <img
                                  style={{
                                    width: 130,
                                    borderRadius: 10,
                                    aspectRatio: 4 / 3,
                                    height: 100,
                                  }}
                                  src={row.photo ? row.photo : "Can't display"}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td>
                              {row.product_id}
                              {row.is_draft && (
                                <>
                                  -{" "}
                                  <strong style={{ color: "#2e89ff" }}>
                                    Bản nháp
                                  </strong>
                                </>
                              )}
                            </td>
                            <td>{row.name}</td>
                            <td>
                              {moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>
                            <td>
                              {moment(row.createdAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>

                            <td>
                              {row.user ? row.user.firstName : "Chưa thiết lập"}
                            </td>
                            <td>
                              {row?.user_manager_products &&
                                row?.user_manager_products?.length > 0 &&
                                row?.user_manager_products?.map((item, key) => (
                                  <span key={key}>
                                    {item?.managerUser?.firstName +
                                      (key <
                                      row?.user_manager_products?.length - 1
                                        ? "|"
                                        : "")}
                                  </span>
                                ))}
                              {row?.user_manager_products &&
                                row?.user_manager_products?.length <= 0 && (
                                  <>{"Chưa thiết lập"}</>
                                )}
                            </td>
                            <td>{renderAuthorPhone(row)}</td>
                            <td>
                              {row.address +
                                " " +
                                row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>{renderAuthorNote(row)}</td>
                            <td>
                              {row.rent == 1 && (
                                <span className="badge-item badge-status-success">
                                  Đã thuê
                                </span>
                              )}
                              {row.rent == 0 && (
                                <span className="badge-item badge-status">
                                  Chưa thuê
                                </span>
                              )}
                              {row.rent == 2 && (
                                <span className="badge-item badge-primary">
                                  Sắp trống
                                </span>
                              )}
                            </td>
                            <td className="action-btns">
                              {checkPermissionActionP(row) === true && (
                                <Fragment>
                                  <Link
                                    title="Sửa sản phẩm"
                                    to={{
                                      pathname: `/admin/p/${id}/${subid}/edit`,
                                      state: {
                                        row: {
                                          ...row,
                                          search: searchText,
                                          page: currentPage,
                                        },
                                      },
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                  <Typography
                                    title="Xoá sản phẩm"
                                    className="delete-btn"
                                    onClick={() => handlDeleteById(row.id)}
                                    style={{ marginRight: 10 }}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Typography>
                                  <HistoryEditProduct {...row} />
                                </Fragment>
                              )}
                              {checkIsManagerProduct(row) === true && (
                                <>
                                  <MangeEmployeeProduct
                                    {...row}
                                    setChange={setChange}
                                    setChange1={setChange1}
                                  />
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      {isSearching &&
                        currentItems?.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={
                                      listCheck.filter((item) => item == row.id)
                                        .length > 0
                                        ? true
                                        : false
                                    }
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>
                              <a
                                href={CLIENT_URL + "/product/" + row.id}
                                target="_blank"
                              >
                                <img
                                  style={{
                                    width: 130,
                                    borderRadius: 10,
                                    aspectRatio: 4 / 3,
                                    height: 100,
                                  }}
                                  src={row.photo ? row.photo : "Can't display"}
                                  alt=""
                                />
                              </a>
                            </td>
                            <td>{row.product_id}</td>
                            <td>{row.name}</td>
                            <td>
                              {moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>
                            <td>
                              {moment(row.createdAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>

                            <td>
                              {row.user ? row.user.firstName : "Chưa thiết lập"}
                            </td>
                            <td>
                              {row?.user_manager_products &&
                                row?.user_manager_products?.length > 0 &&
                                row?.user_manager_products?.map((item, key) => (
                                  <span key={key}>
                                    {item?.managerUser?.firstName +
                                      (key <
                                      row?.user_manager_products?.length - 1
                                        ? "|"
                                        : "")}
                                  </span>
                                ))}
                              {row?.user_manager_products &&
                                row?.user_manager_products?.length <= 0 && (
                                  <>{"Chưa thiết lập"}</>
                                )}
                            </td>
                            <td>{renderAuthorPhone(row)}</td>
                            <td>
                              {row.address +
                                " " +
                                row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>{renderAuthorNote(row)}</td>
                            <td>
                              {row.rent == 1 && (
                                <span className="badge-item badge-status-success">
                                  Đã thuê
                                </span>
                              )}
                              {row.rent == 0 && (
                                <span className="badge-item badge-status">
                                  Chưa thuê
                                </span>
                              )}
                              {row.rent == 2 && (
                                <span className="badge-item badge-primary">
                                  Sắp trống
                                </span>
                              )}
                            </td>
                            <td className="action-btns">
                              {checkPermissionActionP(row) === true && (
                                <Fragment>
                                  <Link
                                    title="Sửa sản phẩm"
                                    to={{
                                      pathname: `/admin/p/${id}/${subid}/edit`,
                                      state: {
                                        row: {
                                          ...row,
                                          search: searchText,
                                          page: currentPage,
                                        },
                                      },
                                    }}
                                  >
                                    <Typography className="edit-btn">
                                      <i className="fas fa-edit" />
                                    </Typography>
                                  </Link>
                                  <Typography
                                    title="Xoá sản phẩm"
                                    className="delete-btn"
                                    onClick={() => handlDeleteById(row.id)}
                                    style={{ marginRight: 10 }}
                                  >
                                    <i className="fas fa-trash-alt" />
                                  </Typography>
                                  <HistoryEditProduct {...row} />
                                </Fragment>
                              )}
                              {checkIsManagerProduct(row) === true && (
                                <>
                                  <MangeEmployeeProduct
                                    {...row}
                                    setChange={setChange}
                                    setChange1={setChange1}
                                  />
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                  {/*  */}
                  {id == 12 && (
                    <tbody>
                      {!isSearching &&
                        currentItems?.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={listCheck.filter(item=> item== row.id)}
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>
                              <img
                                style={{
                                  width: 130,
                                  borderRadius: 10,
                                  aspectRatio: 4 / 3,
                                  height: 100,
                                }}
                                src={row.photo ? row.photo : "Can't display"}
                                alt=""
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>
                              {moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            {/* <td >
                              {row.phoneNumber
                                ? row.phoneNumber
                                : "Chưa thiết lập"}
                            </td> */}
                            <td>{row.note ? row.note : "Chưa thiếp lập"}</td>
                            {/* <td >{row.brand}</td> */}
                            {/* <td >{row.unitSize}</td> */}
                            {/* <td >VND{numberWithCommas(row.buyerPrice)}</td> */}
                            {/* <td >
                              VND
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td> */}
                            {/* <td >
                              {row.status === "active" ? (
                                <span className="badge-item badge-status-success">
                                  {row.status}
                                </span>
                              ) : (
                                <span className="badge-item badge-status">
                                  {row.status}
                                </span>
                              )}
                            </td> */}
                            <td className="action-btns">
                              <Link
                                to={{
                                  pathname: `/admin/p/${id}/${subid}/edit`,
                                  state: {
                                    row: {
                                      ...row,
                                      search: searchText,
                                      page: currentPage,
                                    },
                                  },
                                }}
                              >
                                <Typography className="edit-btn">
                                  <i className="fas fa-edit" />
                                </Typography>
                              </Link>
                              <Typography
                                className="delete-btn"
                                onClick={() => handlDeleteById(row.id)}
                                style={{ marginRight: 10 }}
                              >
                                <i className="fas fa-trash-alt" />
                              </Typography>
                              <HistoryEditProduct {...row} />
                            </td>
                          </tr>
                        ))}
                      {isSearching &&
                        currentItems?.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    // checked={listCheck.filter(item=> item== row.id)}
                                    onChange={() => handleChange(row.id)}
                                    inputProps={{
                                      "aria-label": "primary checkbox",
                                    }}
                                  />
                                }
                              />
                            </td>
                            <td>
                              <img
                                style={{
                                  width: 130,
                                  borderRadius: 10,
                                  aspectRatio: 4 / 3,
                                  height: 100,
                                }}
                                src={row.photo ? row.photo : "Can't display"}
                                alt=""
                              />
                            </td>
                            <td>{row.name}</td>
                            <td>
                              {moment(row.updatedAt).format(
                                "DD-MM-YYYY HH:mm:ss"
                              )}
                            </td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              VND&nbsp;
                              {numberWithCommas(
                                Math.ceil(
                                  (row.price *
                                    (100 - parseInt(row.discountPer || 0))) /
                                    100
                                )
                              )}
                            </td>
                            <td>
                              {row.wardText +
                                " " +
                                row.districtText +
                                " " +
                                row.provinceText}
                            </td>
                            <td>{row.note ? row.note : "Chưa thiếp lập"}</td>
                            <td className="action-btns">
                              <Link
                                to={{
                                  pathname: `/admin/p/${id}/${subid}/edit`,
                                  state: {
                                    row: {
                                      ...row,
                                      search: searchText,
                                      page: currentPage,
                                    },
                                  },
                                }}
                              >
                                <Typography className="edit-btn">
                                  <i className="fas fa-edit" />
                                </Typography>
                              </Link>
                              <Typography
                                className="delete-btn"
                                onClick={() => handlDeleteById(row.id)}
                                style={{ marginRight: 10 }}
                              >
                                <i className="fas fa-trash-alt" />
                              </Typography>
                              <HistoryEditProduct {...row} />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  )}
                  {id == 13 &&
                    filterManager === true &&
                    getList?.length <= 0 && (
                      <tbody>
                        <tr>
                          <td
                            colSpan={14}
                            style={{
                              textAlign: "center",
                              fontSize: 24,
                              fontWeight: 600,
                            }}
                          >
                            Đã hết dữ liệu
                          </td>
                        </tr>
                      </tbody>
                    )}
                </table>
              </div>
            </div>
          </div>
          <div className="d-flex w-100 flex-row-reverse">
            {filterManager === false && (
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            )}
            {filterManager === true && (
              <Stack direction="row" spacing={2} justifyContent="center">
                <IconButton
                  onClick={handlePrevClick}
                  disabled={currentPage === 1}
                >
                  <ArrowBackIosIcon />
                </IconButton>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  variant={"contained"}
                  sx={{
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    maxWidth: 40,
                    minHeight: 40,
                    maxHeight: 40,
                    padding: "6px",
                    backgroundColor: "#2e89ff",
                    color: "#fff",
                  }}
                >
                  {currentPage}
                </Box>
                <IconButton
                  onClick={handleNextClick}
                  disabled={getList?.length <= 0}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Stack>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
