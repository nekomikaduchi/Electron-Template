import { Injectable } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { APIService, GetUserQuery } from '../../API.service';

@Injectable({
  providedIn: 'root',
})
export class CustomApiService extends APIService {
  async GetUserEx(id: string): Promise<GetUserQuery> {
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
          settings
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id,
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
}
