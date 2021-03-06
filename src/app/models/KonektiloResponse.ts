export interface KonektiloResponse {
  success: boolean;
  description: string;
  messages: string[];
  result: {
    variableDisplayname: string;
    variableData: any;
    variableType: string;
    variableStatusCode: string;
    statusCode: {
      Code: number;
    }
  }
}
