import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { isAuth } from "../helper";
import { listOrders } from "./apiAdmin";
import { PdfLaporan } from "./ShowReport";

export default function Report() {
  const [orders, setOrders] = useState([]);
  // const [show, setHide] = useState(false)
  const { _id, token } = isAuth();

  const loadOrders = () => {
    listOrders(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="container">
      <PDFDownloadLink
        document={<PdfLaporan data={orders} />}
        fileName="report.pdf"
        style={{
          textDecoration: "none",
          padding: "10px",
          color: "#4a4a4a",
          backgroundColor: "#f2f2f2",
          border: "1px solid #4a4a4a",
        }}
      >
        {() => "Cetak Laporan"}
      </PDFDownloadLink>
    </div>
  );
}
