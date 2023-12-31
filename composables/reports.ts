// @ts-ignore
import * as XLSX from 'xlsx/xlsx.mjs'
import moment from 'moment'

export const useConsultationReportsTableHeader : Utility.TableHeader[] = [
   { key: 'transaction_number', label: 'No. Transaksi' },
   { key: 'patient.name', label: 'Nama Pasien' },
   { key: 'doctor.name', label: 'Nama Dokter' },
   { key: 'trx_date', label: 'Tanggal' },
   { key: 'started_at', label: 'Jam Mulai' },
   { key: 'finished_at', label: 'Jam Selesai' },
   { key: 'total', label: 'Biaya' }
]

export const useMedicinePurchasesTableHeader : Utility.TableHeader[] = [
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

export const useEmergencyReportsTableHeader : Utility.TableHeader[] = [
   { key: 'transaction.transaction_number', label: 'No. Transaksi' },
   { key: 'request_by.full_name', label: 'Pelapor' },
   { key: 'request_by.phone_number', label: 'No. Telp Pelapor' },
   { key: 'patient.patient_name', label: 'Pasien' },
   { key: 'pickup_location', label: 'Alamat' },
   { key: 'doctor.full_name', label: 'Dokter' },
   { key: 'ambulance.full_name', label: 'Driver' },
   { key: 'status', label: 'Status' }
]

export const useEmergencyOfficerReportsTableHeader : Utility.TableHeader[] = [
   { key: 'employee_no', label: 'No. Karyawan' },
   { key: 'name', label: 'Nama' },
   { key: 'trans_summary', label: 'Jumlah Transaksi' },
]

export const useEmergencyDoctorReportsTableHeader : Utility.TableHeader[] = [
   { key: 'name', label: 'Nama' },
   { key: 'trans_summary', label: 'Jumlah Transaksi' },
]

export function useExportExcel (title: string, filter: Utility.DateRange) : void {
   const refTable = document.getElementById('dataTable')
   const workbook = XLSX.utils.table_to_book(refTable)
   const fileName = `${title}_${moment(filter.start_date).format('YYYY-MM-DD')}-${moment(filter.end_date).format('YYYY-MM-DD')}.xlsx`
   XLSX.writeFile(workbook, fileName)
}