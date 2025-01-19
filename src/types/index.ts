export type RootStackParamList = {
  Home: undefined;
  TricycleRegistration: undefined;
  VehicleRegistration: undefined;
  ParkingRegistration: undefined;
  Sync: undefined;
  Registration: undefined;
  RegistrationList: undefined;
  Register: undefined;
  Login: undefined;
};

export type DriverType = {
  id?: string;
  photo: string;
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  addressNumber: string;
  avenue: string;
  addressQuartier: string;
  addressCommune: string | undefined;
  phoneNumber: string;
  emergencyName: string;
  emergencyContact: string;
  maritalStatus: string | undefined;
  association: string | undefined;
  gender: string | undefined;
  //registrationType: "moto" | "tricycle" | "vehicle";
};

export type VehicleType = {
  id?: string;
  //type: "moto" | "tricycle" | "vehicle";
  type: string;
  matricule: string;
  chassisNumber: string;
  color: string;
  model: string;
  parking: string;
};

export type OwnerType = {
  id?: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
};

export type RegistrationType = {
  id: string;
  driver: DriverType;
  vehicle: VehicleType;
  owner: OwnerType;
  timestamp: number;
  //registrationType: 'moto' | 'tricycle' | 'vehicle';
};
