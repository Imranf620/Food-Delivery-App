import { apiBase } from './apiBase';

const apiReports = apiBase.injectEndpoints({
  endpoints: build => ({
    // Get sales report
    getSalesReport: build.query({
      // query: last => `reports/sales/?days_range=${last}`,
      query: ({start_date,end_date}) => `reports/sales/?start_date=${start_date}&end_date=${end_date}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetSalesReportQuery } = apiReports;
