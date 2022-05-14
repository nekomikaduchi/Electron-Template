import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly dispName: string;
  readonly mail: string;
  readonly role: number;
  readonly spApiFlg: boolean;
  readonly lineFlg: boolean;
  readonly customerId?: string | null;
  readonly stripe?: string | null;
  readonly secret?: string | null;
  readonly settings?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}