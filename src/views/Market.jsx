import styled from "styled-components";
import _ from "lodash";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import {
  PlayCircleOutlined,
  CloudUploadOutlined,
  WalletOutlined,
  SearchOutlined,
  HomeOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Modal, Alert, Menu, message, Table, Empty } from "antd";
import React, { useState, useEffect } from "react";
import PolkadotLogo from "../statics/polkadot-logo.svg";
import { getAPI, getKeyring } from "../utils/polkadot";
import { formatAddress } from "../utils";
import Identicon from "@polkadot/react-identicon";
import Img from "../components/Img";
import * as util from "../utils";
import { formatImgUrl, formatterSize } from "../utils/formatter";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress,
} from "@polkadot/extension-dapp";
import {
  controlGetList,
  controlGetActivityList,
  controlTransfer,
  controlMint,
  controlBuy,
  controlCancel,
} from "../controls/nft";
import {
  formatArr,
  formatOne,
  formatDataSource,
} from "../utils/format-show-type";

function Home({ className }) {
  const { keyword, cat } = useParams();
  document.title = "Market";
  let navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMachineDetail, setShowMachineDetail] = useState(0);

  const myinit = async () => {
    setLoading(true);
    let api = await getAPI();
    let addr = localStorage.getItem("addr");
    let tt = await api.query.hashrateMarket.machine.entries();
    let a = tt.map(([key, entry]) => {
      let id = _.get(
        key.args.map((k) => k.toHuman()),
        `0`
      );      
      let humanObj = entry.toHuman();   
      humanObj.metadata=JSON.parse(humanObj.metadata);
      return _.assign(humanObj, { key: id });
    });
    for(let item of a){
      console.log( item.metadata);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    myinit();
  }, []);

  const dataSource = [
    {
      key: "1",
      id: 1,
      name: "",
      age: 32,
      address: "西湖区湖底公园1号",
    },
    {
      key: "2",
      id: 2,
      name: "胡彦祖",
      age: 42,
      address: "西湖区湖底公园1号",
    },
  ];

  const columns = [
    {
      title: "Hashrate Provider",
      width: "30%",
      key: "name",
      showType: "text",
    },
    {
      title: "Algorithm",
      width: "30%",
      key: "age",
      showType: "btn-link",
      fun: (text, record, index) => {
        setShowMachineDetail(record.id);
      },
    },
    {
      title: "Algorithm",
      width: "30%",
      key: "age",
      showType: "btn-link",
      fun: (text, record, index) => {
        setShowMachineDetail(record.id);
      },
    },
    {
      title: "Operation",
      width: "40%",
      key: "address",
      showType: "btn",
      btnLabel: "Select",
      fun: (text, record, index) => {
        console.log(text, record, index);
      },
    },
  ];
  formatDataSource(columns, dataSource);
  return (
    <div className={className}>
      <div className="hold"></div>
      <div className="con">
        <h1 className="title">Hashrate Market</h1>
        <div className="con-table">
          <table className="mytable">
            <thead className="table-thead">
              <tr>
                {columns.map((c) => {
                  return (
                    <th key={c.title} style={{ width: c.width }}>
                      {c.title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {dataSource.map((d, index) => {
                return (
                  <tr key={index}>
                    {columns.map((c, i) => {
                      if (c.render) {
                        return (
                          <td style={{ width: c.width }} key={i}>
                            {c.render(d[c.key], d, i)}
                          </td>
                        );
                      }
                      return (
                        <td key={i} style={{ width: c.width }}>
                          {d[c.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showMachineDetail > 0 ? (
        <div className="mymodal">
          <i
            className="btn-close fa fa-close"
            onClick={() => setShowMachineDetail(0)}
          ></i>
          <div className="mymodal-title">Machine Details</div>
          <div className="mymodal-body">
            <div className="detail-table">
              <div className="detail-row">
                <span className="detail-row-left">Graphics Coprocessor</span>
                <span className="detail-row-right">Intel UHD Graphics</span>
              </div>
              <div className="detail-row">
                <span className="detail-row-left">Graphics Coprocessor</span>
                <span className="detail-row-right">Intel UHD Graphics</span>
              </div>
              <div className="detail-row">
                <span className="detail-row-left">Graphics Coprocessor</span>
                <span className="detail-row-right">Intel UHD Graphics</span>
              </div>
            </div>
          </div>
          <div className="btn-row">
            <span
              className="btn btn-primay"
              onClick={() => setShowMachineDetail(0)}
            >
              Back
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default styled(Home)`
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: #000;
  color: #fff;
  .hold {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 56px;
    clear: both;
  }
  .mini-btn {
    border: 1px solid #fff;
  }
  .con {
    width: 1210px;
    margin: 10px auto;
    display: block;
    overflow: hidden;
    .title {
      font-family: "Montserrat Bold", "Montserrat", sans-serif;
      font-weight: 700;
      font-style: normal;
      font-size: 28px;
      color: #ffffff;
      padding-left: 36px;
      background-image: url(/img/market/1.png);
      background-repeat: no-repeat;
      background-size: 20px;
      background-position: left;
      margin-top: 25px;
    }
  }
  .block {
    display: block;
    overflow: hidden;
  }
  .mini-btn {
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
  }
  .mytable {
    display: table;
    border: 1px solid #fff;
    border-radius: 10px;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    overflow: hidden;
    .link {
      color: #fff;
      cursor: pointer;
    }
    .btn-link {
      color: #fff;
      cursor: pointer;
      text-decoration: underline;
    }
    th {
      background-color: #92d5e1;
      color: #000;
      height: 40px;
      line-height: 40px;
      text-align: left;
      padding: 0 10px;
    }
    tr td {
      border-bottom: 1px solid #fff;
      border-collapse: collapse;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
    }
    tr:last-children {
      td {
        border-bottom: none;
      }
    }
  }
`;
