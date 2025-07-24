import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';

// 🖌️ Define styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  label: {
    fontWeight: 'bold',
  },
});

// 🧾 PDF Component
const LeavePDF = ({ leave }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>📝 Leave Application Summary</Text>

      <View style={styles.section}>
        <Text><Text style={styles.label}>Name:</Text> {leave.name}</Text>
        <Text><Text style={styles.label}>Roll No:</Text> {leave.roll}</Text>
        <Text><Text style={styles.label}>Department:</Text> {leave.department}</Text>
        <Text><Text style={styles.label}>Leave Type:</Text> {leave.leaveType}</Text>
        <Text><Text style={styles.label}>From:</Text> {leave.from}</Text>
        <Text><Text style={styles.label}>To:</Text> {leave.to}</Text>
        <Text><Text style={styles.label}>Reason:</Text> {leave.reason}</Text>
        <Text><Text style={styles.label}>Status:</Text> {leave.status}</Text>
      </View>

      <Text>Generated on: {new Date().toLocaleDateString()}</Text>
    </Page>
  </Document>
);

export default LeavePDF;
