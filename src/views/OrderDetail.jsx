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
import { Input, Alert, Button, message, notification, Empty } from "antd";
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
  const [NFTlist, setNFTlist] = useState([]);
  useEffect(() => {
    if (cat) {
      controlGetList(null, null, true).then((list) => {
        setNFTlist(list.filter((t) => t.label == cat));
      });
    } else {
      controlGetList(setNFTlist, keyword, true);
    }
  }, [keyword, cat]);
  const [showMachineDetail, setShowMachineDetail] = useState(0);
  const onBackHome = () => {
    navigate("/");
  };
  const onSubmit = () => {
    notification.success({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  return (
    <div className={className}>
      <div className="hold"></div>
      <div className="con">
        <h1 className="title">Make Offer</h1>
        <div className="myform">
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

          <div className="form-row">
            <Button type="primary" onClick={onSubmit}>
              Primary Button
            </Button>
          </div>
        </div>
      </div>
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
      margin-top: 25px;
      line-height: 70px;
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
  .ant-btn-primary {
    background-color: rgba(148, 214, 226, 1) !important;
    color: #000;
    height: 50px;
    line-height: 40px;
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
