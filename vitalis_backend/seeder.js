const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Models
const User = require('./models/User');
const Inventory = require('./models/Inventory');

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();
        
        // Clear old DB
        await User.deleteMany();
        await Inventory.deleteMany();

        console.log('Old Data Cleared!');

        // Models
        const Vital = require('./models/Vital');
        const MedicationSchedule = require('./models/MedicationSchedule');
        const MedicalRecord = require('./models/MedicalRecord');
        const Prescription = require('./models/Prescription');

        await Vital.deleteMany();
        await MedicationSchedule.deleteMany();
        await MedicalRecord.deleteMany();
        await Prescription.deleteMany();

        // 1. Create Users
        const usersToCreate = [
            { name: 'دكتور سميث', email: 'doctor@vitalis.local', role: 'doctor', specialty: 'Medical Director' },
            { name: 'سارة أحمد', email: 'sara@vitalis.local', role: 'patient', medicalHistory: ['Hypertension', 'Diabetes'], lastVisit: new Date('2023-10-12') },
            { name: 'محمد علي', email: 'mohamed@vitalis.local', role: 'patient', medicalHistory: ['Asthma'], lastVisit: new Date('2023-10-08') },
            { name: 'ياسين خالد', email: 'yassine@vitalis.local', role: 'patient', medicalHistory: ['None'], lastVisit: new Date('2023-10-05') },
            { name: 'د. أمينة (صيدلانية)', email: 'pharma@vitalis.local', role: 'pharmacist', gardeMode: true }
        ];

        const createdUsers = await User.insertMany(usersToCreate);
        console.log('Users Created!');

        const doctorId = createdUsers[0]._id;
        const saraId = createdUsers[1]._id;
        const mhdId = createdUsers[2]._id;

        // 2. Create Inventory items
        const stockToCreate = [
            { name: 'Amoxicillin 500mg', molecule: 'Amoxicillin', category: 'Antibiotics', batchId: 'AX-9021', quantity: 240, inStock: true },
            { name: 'Panadol Advance', molecule: 'Paracetamol', category: 'Pain Relief', batchId: 'PN-4432', quantity: 500, inStock: true },
            { name: 'Ventolin Inhaler', molecule: 'Salbutamol', category: 'Respiratory', batchId: 'VN-1108', quantity: 0, inStock: false },
            { name: 'Lipitor 20mg', molecule: 'Atorvastatin', category: 'Cardiovascular', batchId: 'LP-3342', quantity: 150, inStock: true }
        ];
        await Inventory.insertMany(stockToCreate);

        // 3. Create Daily Vitals (for Sara)
        const vitalObj = {
            patient: saraId,
            steps: 8432,
            stepsGoal: 10000,
            heartRateAvg: 72,
            sleepHours: 7.5,
            sleepQuality: 'Excellent'
        };
        await Vital.create(vitalObj);

        // 4. Create Medication Schedules (for Sara)
        await MedicationSchedule.insertMany([
            { patient: saraId, medicineName: 'Lipitor 20mg', instructions: 'قبل الإفطار', timeStr: '08:00 صباحاً', takenLogs: [new Date()] },
            { patient: saraId, medicineName: 'Vitamin D3', instructions: 'مع الغداء', timeStr: '01:00 ظهراً', takenLogs: [] },
            { patient: saraId, medicineName: 'Omega 3', instructions: 'قبل النوم', timeStr: '10:00 مساءً', takenLogs: [] }
        ]);

        // 5. Create Digital Vault Records (for Sara)
        await MedicalRecord.create({
            patient: saraId,
            uploadedBy: doctorId,
            title: 'تقرير الفحص السنوي',
            category: 'Lab Results',
            fileType: 'PDF',
            fileUrl: '/uploads/report1.pdf',
            fileSizeStr: '2.4 MB'
        });

        // 6. Create Pending Prescriptions
        await Prescription.create({
            patient: mhdId,
            doctor: doctorId,
            items: [{ medicineName: 'Ventolin Inhaler', dosage: '100mcg', instructions: 'عند اللزوم' }],
            status: 'pending',
            notes: 'تحليل دوري بعد أسبوعين'
        });

        console.log('Extra Entities (Vitals, Meds, Vault, Prescriptions) Addded!');

        console.log('Database Seeded Successfully! 🙌');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
