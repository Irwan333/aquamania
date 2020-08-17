import React, { Component, Fragment } from "react";
import { isAuth } from "../helper";
import Menu from "../core/Menu";
import { Redirect } from "react-router-dom";
import { invoice } from "./ApiUser";
// import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
// import { PDFInvoice } from "./ShowInvoice";
import moment from "moment";
import invosty from "../assets/style/Invoice.module.css";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      redirectToSignin: false,
      error: "",
    };
  }

  componentDidMount = () => {
    const token = isAuth().token;
    const orderId = this.props.match.params.orderId;
    invoice(orderId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          order: data,
        });
      }
    });
  };

  purchaseHistory = (order) => {
    return order.map((h, y) => {
      return (
        <Fragment key={y}>
          <div id={invosty.details} className={invosty.clearfix}>
            <div id={invosty.client}>
              <div className={invosty.to}>INVOICE TO:</div>
              {[h.user].map((u, k) => {
                return (
                  <Fragment key={k}>
                    <h2 className={invosty.name}>{u.name}</h2>
                    <div className={invosty.address}>{h.address}</div>
                  </Fragment>
                );
              })}
            </div>
            <div id={invosty.invoice}>
              <h1>INVOICE {h.transaction_id}</h1>
              <div className={invosty.date}>
                Date of Invoice: {moment().format("MMMM Do YYYY, h:mm:ss a")}
              </div>
            </div>
          </div>
          <table border="0" cellSpacing="0" cellPadding="0">
            <thead>
              <tr>
                <th className={invosty.no}>#</th>
                <th className={invosty.desc}>Nama Unit</th>
                <th className={invosty.unit}>Harga Unit</th>
                <th className={invosty.qty}>Jumlah</th>
                <th className={invosty.total}>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {h.products.map((p, i) => {
                return (
                  <Fragment key={i}>
                    <tr>
                      <td className={invosty.no}>{i + 1}</td>
                      <td className={invosty.desc}>
                        <h3>{p.name}</h3>
                      </td>
                      <td className={invosty.unit}>Rp. {p.price}</td>
                      <td className={invosty.qty}>{p.count}</td>
                      <td className={invosty.total}>Rp. {p.price * p.count}</td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2"></td>
                <td colSpan="2">TOTAL</td>
                <td>Rp. {h.amount}</td>
              </tr>
            </tfoot>
          </table>
        </Fragment>
      );
    });
  };

  render() {
    const { redirectToSignin, order } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    return (
      <Menu>
        <div className={invosty.fixbody}>
          <header className={invosty.clearfix}>
            <div id={invosty.logo}>
              <img src={require("../assets/img/logo.jpg")} alt="Logo" />
            </div>
            <div id={invosty.company}>
              <h2 className={invosty.name}>Aqua Mania</h2>
              <div>Jakarta Utara, Indonesia</div>
              <div>+62812-xxxx-xxxx</div>
              <div>
                <a href="mailto:company@aquamania.com">
                  company@aquamania.store
                </a>
              </div>
            </div>
          </header>
          <main>
            {this.purchaseHistory(order)}
            {console.log(order)}
            {/* <PDFViewer>
              <PDFInvoice data={order} />
            </PDFViewer> */}
            <div id={invosty.thanks}>Thank you!</div>
            {/* <PDFDownloadLink
              document={<PDFInvoice data={order} />}
              fileName="invoice.pdf"
              style={{
                textDecoration: "none",
                padding: "10px",
                color: "#4a4a4a",
                backgroundColor: "#f2f2f2",
                border: "1px solid #4a4a4a",
              }}
            >
              {() => "Cetak Faktur"}
            </PDFDownloadLink> */}
          </main>
          <footer>
            Invoice was created on a computer and is valid without the signature
            and seal.
          </footer>
        </div>
      </Menu>
    );
  }
}

export default Invoice;
