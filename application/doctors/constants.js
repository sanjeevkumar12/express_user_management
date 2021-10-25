const MEDICAL_SPECIALTIES = [
    'Anesthesia',
    'Cardiovascular',
    'CommunityHealth',
    'Dentistry',
    'Dermatology',
    'DietNutrition',
    'Emergency',
    'Endocrine',
    'Gastroenterologic',
    'Genetic',
    'Geriatric',
    'Gynecologic',
    'Hematologic',
    'Infectious',
    'LaboratoryScience',
    'Midwifery',
    'Musculoskeletal',
    'Neurologic',
    'Nursing',
    'Obstetric',
    'Oncologic',
    'Optometric',
    'Otolaryngologic',
    'Pathology',
    'Pediatric',
    'PharmacySpecialty',
    'Physiotherapy',
    'PlasticSurgery',
    'Podiatric',
    'PrimaryCare',
    'Psychiatric',
    'PublicHealth',
    'Pulmonary',
    'Radiography',
    'Renal',
    'RespiratoryTherapy',
    'Rheumatologic',
    'SpeechPathology',
    'Surgical',
    'Toxicologic',
    'Urologic',
]

const WEEKDAYS = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
]

const AVAILABLE_SERVICES = [
    'MedicalProcedure',
    'MedicalTest',
    'MedicalTherapy'
]

class AvailableMedicalServicesClass {
    constructor() {
        this.MEDICAL_PROCEDURE = 'MedicalProcedure'
        this.MEDICAL_TEST = 'MedicalTest'
        this.MEDICAL_THERAPY = 'MedicalTherapy'
    }

    get labels() {
        let obj = new Object()
        obj[this.MEDICAL_PROCEDURE] = 'Medical Procedure'
        obj[this.MEDICAL_TEST] = 'Medical Test'
        obj[this.MEDICAL_THERAPY] = 'Medical Therapy'
        return obj
    }

    get choices() {
        return Object.keys(this.labels);
    }
}



class MedicalSpecialityClass {
    
    constructor() {
        this.ANESTHESIA = 'Anesthesia'
        this.CARDIOVASCULAR = 'Cardiovascular'
        this.COMMUNITY_HEALTH = 'CommunityHealth'
        this.DENTISTRY = 'Dentistry'
        this.DERMATOLOGY = 'Dermatology'
        this.DIET_NUTRITION = 'DietNutrition'
        this.EMERGENCY = 'Emergency'
        this.ENDOCRINE = 'Endocrine'
        this.GASTROENTEROLOGIC = 'Gastroenterologic'
        this.GENETIC = 'Genetic'
        this.GERIATRIC = 'Geriatric'
        this.GYNECOLOGIC = 'Gynecologic'
        this.HEMATOLOGIC = 'Hematologic'
        this.INFECTIOUS = 'Infectious'
        this.LABORATORY_SCIENCE = 'LaboratoryScience'
        this.MIDWIFERY = 'Midwifery'
        this.MUSCULOSKELETAL = 'Musculoskeletal'
        this.NEUROLOGIC = 'Neurologic'
        this.NURSING = 'Nursing'
        this.OBSTETRIC = 'Obstetric'
        this.ONCOLOGIC = 'Oncologic'
        this.OPTOMETRIC = 'Optometric'
        this.OTOLARYNGOLOGIC = 'Otolaryngologic'
        this.PATHOLOGY = 'Pathology'
        this.PEDIATRIC = 'Pediatric'
        this.PHARMACY_SPECIALTY = 'PharmacySpecialty'
        this.PHYSIOTHERAPY = 'Physiotherapy'
        this.PLASTIC_SURGERY = 'PlasticSurgery'
        this.PODIATRIC = 'Podiatric'
        this.PRIMARY_CARE = 'PrimaryCare'
        this.PSYCHIATRIC = 'Psychiatric'
        this.PUBLIC_HEALTH = 'PublicHealth'
        this.PULMONARY = 'Pulmonary'
        this.RADIOGRAPHY = 'Radiography'
        this.RENAL = 'Renal'
        this.RESPIRATORY_THERAPY = 'RespiratoryTherapy'
        this.RHEUMATOLOGIC = 'Rheumatologic'
        this.SPEECH_PATHOLOGY = 'SpeechPathology'
        this.SURGICAL = 'Surgical'
        this.TOXICOLOGIC = 'Toxicologic'
        this.UROLOGIC = 'Urologic'
    }

    get labels() {
        let obj = new Object()
        obj[this.ANESTHESIA] = 'Anesthesia';
        obj[this.CARDIOVASCULAR] = 'Cardiovascular';
        obj[this.COMMUNITY_HEALTH] = 'Community Health';
        obj[this.DENTISTRY] = 'Dentistry';
        obj[this.DERMATOLOGy] = 'Dermatology';
        obj[this.DIET_NUTRITION] = 'Diet Nutrition';
        obj[this.EMERGENCY] = 'Emergency';
        obj[this.ENDOCRINE] = 'Endocrine';
        obj[this.GASTROENTEROLOGIC] = 'Gastroenterologic';
        obj[this.GENETIC] = 'Genetic';
        obj[this.GERIATRIC] = 'Geriatric';
        obj[this.GYNECOLOGIC] = 'Gynecologic';
        obj[this.HEMATOLOGIC] = 'Hematologic';
        obj[this.INFECTIOUS] = 'Infectious';
        obj[this.LABORATORY_SCIENCE] = 'Laboratory Science';
        obj[this.MIDWIFERY] = 'Midwifery';
        obj[this.MUSCULOSKEletal] = 'Musculoskeletal';
        obj[this.NEUROLOGIC] = 'Neurologic';
        obj[this.NURSING] = 'Nursing';
        obj[this.OBSTETRIC] = 'Obstetric';
        obj[this.ONCOLOGIC] = 'Oncologic';
        obj[this.OPTOMETRIC] = 'Optometric';
        obj[this.OTOLARYNGOLOGIC] = 'Otolaryngologic';
        obj[this.PATHOLOGY] = 'Pathology';
        obj[this.PEDIATRIC] = 'Pediatric';
        obj[this.PHARMACY_SPECIALTY] = 'Pharmacy Specialty';
        obj[this.PHYSIOTHERAPY] = 'Physiotherapy';
        obj[this.PLASTIC_SURGERY] = 'Plastic Surgery';
        obj[this.PODIATRIC] = 'Podiatric';
        obj[this.PRIMARY_CARE] = 'Primary Care';
        obj[this.PSYCHIATRIC] = 'Psychiatric';
        obj[this.PUBLIC_HEALth] = 'Public Health';
        obj[this.PULMONARY] = 'Pulmonary';
        obj[this.RADIOGRAPHY] = 'Radiography';
        obj[this.RENAL] = 'Renal';
        obj[this.RESPIRATORY_THERAPY] = 'Respiratory Therapy';
        obj[this.RHEUMATOLOGIC] = 'Rheumatologic';
        obj[this.SPEECH_PATHOLOGY] = 'Speech Pathology';
        obj[this.SURGICAL] = 'Surgical';
        obj[this.TOXICOLOGIC] = 'Toxicologic';
        obj[this.UROLOGIC] = 'Urologic';
        return obj
    }
    get choices() {
        return Object.keys(this.labels);
    }
}
const MedicalSpeciality = Object.freeze(new MedicalSpecialityClass())
const MedicalServices = Object.freeze(new AvailableMedicalServicesClass())

module.exports = {
    MedicalSpeciality,
    MedicalServices,
    WEEKDAYS
}