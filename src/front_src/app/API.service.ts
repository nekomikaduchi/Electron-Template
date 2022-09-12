/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateUser: OnCreateUserSubscription;
  onUpdateUser: OnUpdateUserSubscription;
  onDeleteUser: OnDeleteUserSubscription;
};

export type CreateUserInput = {
  id?: string | null;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  _version?: number | null;
};

export type ModelUserConditionInput = {
  dispName?: ModelStringInput | null;
  mail?: ModelStringInput | null;
  role?: ModelIntInput | null;
  spApiFlg?: ModelBooleanInput | null;
  lineFlg?: ModelBooleanInput | null;
  customerId?: ModelStringInput | null;
  stripe?: ModelStringInput | null;
  secret?: ModelStringInput | null;
  settings?: ModelStringInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type User = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateUserInput = {
  id: string;
  dispName?: string | null;
  mail?: string | null;
  role?: number | null;
  spApiFlg?: boolean | null;
  lineFlg?: boolean | null;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  _version?: number | null;
};

export type DeleteUserInput = {
  id: string;
  _version?: number | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  dispName?: ModelStringInput | null;
  mail?: ModelStringInput | null;
  role?: ModelIntInput | null;
  spApiFlg?: ModelBooleanInput | null;
  lineFlg?: ModelBooleanInput | null;
  customerId?: ModelStringInput | null;
  stripe?: ModelStringInput | null;
  secret?: ModelStringInput | null;
  settings?: ModelStringInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type CreateUserMutation = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateUserMutation = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteUserMutation = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetUserQuery = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    dispName: string;
    mail: string;
    role: number;
    spApiFlg: boolean;
    lineFlg: boolean;
    customerId?: string | null;
    stripe?: string | null;
    secret?: string | null;
    settings?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    id: string;
    dispName: string;
    mail: string;
    role: number;
    spApiFlg: boolean;
    lineFlg: boolean;
    customerId?: string | null;
    stripe?: string | null;
    secret?: string | null;
    settings?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  id: string;
  dispName: string;
  mail: string;
  role: number;
  spApiFlg: boolean;
  lineFlg: boolean;
  customerId?: string | null;
  stripe?: string | null;
  secret?: string | null;
  settings?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          customerId
          stripe
          secret
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          customerId
          stripe
          secret
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          customerId
          stripe
          secret
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async CallFuncAddUser(input: string): Promise<string | null> {
    const statement = `query CallFuncAddUser($input: String!) {
        CallFuncAddUser(input: $input)
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data.CallFuncAddUser;
  }
  async GetUser(id: string): Promise<GetUserQuery> {
    const statement = `query GetUser($id: ID!) {
        getUser(id: $id) {
          __typename
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          customerId
          stripe
          secret
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    id?: string,
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($id: ID, $filter: ModelUserFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listUsers(id: $id, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            id
            dispName
            mail
            role
            spApiFlg
            lineFlg
            customerId
            stripe
            secret
            settings
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  async SyncUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncUsersQuery> {
    const statement = `query SyncUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncUsers(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            id
            dispName
            mail
            role
            spApiFlg
            lineFlg
            customerId
            stripe
            secret
            settings
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncUsersQuery>response.data.syncUsers;
  }
  OnCreateUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser {
        onCreateUser {
          __typename
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          customerId
          stripe
          secret
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  >;

  OnUpdateUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser {
        onUpdateUser {
          __typename
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          customerId
          stripe
          secret
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  >;

  OnDeleteUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser {
        onDeleteUser {
          __typename
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          customerId
          stripe
          secret
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  >;
}
