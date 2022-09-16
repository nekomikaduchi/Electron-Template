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
          id
          dispName
          mail
          role
          spApiFlg
          lineFlg
          settings
          createdAt
          updatedAt
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
