declare namespace Dashboard {
   type TransactionIncome = {
      year: string | null
      summary: number | null
      amount: number | null
      summaryMonthly: Dashboard.MonthlyData
      amountMonthly: Dashboard.MonthlyData
   }

   type EmergencyTrend = {
      year: string | null
      totalRejected: number
      totalFinished: number
      totalNotAnswered: number
      summaryMonthly: Dashboard.MonthlyData
   }

   type EmergencyStatus = {
      status: 'Requested' | 'On Call' | 'On Going' | 'Pick Up' | 'Done' | 'Finished' | 'Reported' | 'Not Answered' | 'Rejected'
      total: number | null
   }

   type PatientGender = {
      total: number | null
      gender: {
         male: number | null
         female: number | null
      }
   }

   type ConsultationSummary = {
      summaryByDoctor: ConsultationSummaryByDoctor
      summaryBySpecialist: ConsultationSummaryBySpecialist
   }

   type DoctorOnlineStatus = {
      full_name: string | null
      status_available: 'Online' | 'Offline' | 'Busy'
      status_emergency_available: 'Online' | 'Offline' | 'Busy'
      profile_picture?: string | null
   }

   type Ambulance = {
      ambulance_type: 'Ambulance Standar' | 'Ambulance Transport' | 'Ambulance VIP'
      total: number | null
   }

   type ConsultationSummaryByDoctor = {
      full_name: string | null
      total: number | null
   }

   type ConsultationSummaryBySpecialist = {
      specialist: string | null
      total: number | null
   }
   
   type MonthlyData = {
      [monthDigit: string]: {
         month: string
         total?: number
         rejected?: string | number | null
         finished?: string | number | null
         notAnswered?: string | number | null
      }
   }
}