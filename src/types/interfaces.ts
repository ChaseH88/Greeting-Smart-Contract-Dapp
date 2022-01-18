export interface Account {
  accountName: string
  address1: string
  address2: string
  city: string
  state: string
  country: string
  zip: string
  businessType: string
  website: string
  contactName: string
  contactEmail: string
  contactNumber: string
  createdDate: Date
  accountUsers: User
}

export interface User {
  firstname: string;
  lastName: string;
  email: string;
  photo: string;
  role: Role;
  password: string;
  resetPasswordToken: string,
  resetPasswordExpire: Date,
  createdAt: Date;
}

export interface Role {
  level: number
}