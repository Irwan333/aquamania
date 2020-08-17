import React from "react";
import moment from "moment";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import localization from "moment/locale/id";
moment.updateLocale("id", localization);

// Create styles
const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 },
});

export function PDFInvoice(props) {
  return (
    <Document>
      <Page style={styles.page}>
        {props.data
          ? props.data.map((a, index) => {
              return (
                <View key={index} style={styles.table}>
                  {/* TableHeader */}
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                      <Text style={styles.tableCell}>Nama Produk</Text>
                    </View>
                  </View>
                  {/* TableContent */}
                  {a.products.map((p, pIndex) => (
                    <View key={pIndex} style={styles.tableRow}>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{p.name}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              );
            })
          : ""}
      </Page>
    </Document>
  );
}
