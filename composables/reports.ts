// @ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs'
import moment from 'moment'

export const useConsultationReportsTableHeader = [
   { key: 'transaction_number', label: 'No. Transaksi' },
   { key: 'patient.name', label: 'Nama Pasien' },
   { key: 'doctor.name', label: 'Nama Dokter' },
   { key: 'trx_date', label: 'Tanggal' },
   { key: 'started_at', label: 'Jam Mulai' },
   { key: 'finished_at', label: 'Jam Selesai' },
   { key: 'total', label: 'Biaya' }
]

export const useMedicinePurchasesTableHeader = [
   { key: 'transaction.transaction_number', label: 'No. Transaksi' },
   { key: 'order_date', label: 'Tanggal' },
   { key: 'customer.full_name', label: 'Nama Pasien' },
   { key: 'order_detail.medicine_name', label: 'Nama Obat' },
   { key: 'order_detail.qty', label: 'Jumlah' },
   { key: 'order_detail.unit', label: 'Satuan' },
   { key: 'order_detail.price', label: 'Harga' },
   { key: '', label: 'Total Harga' },
   { key: 'medicine_amount', label: 'Subtotal' },
   { key: 'delivery_amount', label: 'Ongkir' },
   { key: 'voucher_amount', label: 'Voucher' },
   { key: 'total', label: 'Total' }

]

export function useExportExcel (title: string, filter: API.Payload.DateRangePayload) {
   const refTable = document.getElementById('dataTable')
   const workbook = XLSX.utils.table_to_book(refTable)
   const fileName = `${title}_${moment(filter.start_date).format('YYYY-MM-DD')}-${moment(filter.end_date).format('YYYY-MM-DD')}.xlsx`
   XLSX.writeFile(workbook, fileName)
}