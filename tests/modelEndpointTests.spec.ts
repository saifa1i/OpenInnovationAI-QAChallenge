import { test, expect, APIResponse } from '@playwright/test';
import AssertHelper from '../helpers/assertHerlpers';
import DataHelper from '../helpers/dataHelper';
import getModelSchema from '../jsonSchema/getModelSchema.json'
import postModelSchema from '../jsonSchema/postModelSchema.json';
import getmodelFailedSChema from '../jsonSchema/getModelFailedSchema.json'

test.describe('Open Innovation Ai - QA Challenge | Model Endpoints', () => {
  let assertHelper = new AssertHelper();
  let dataHelper = new DataHelper();
  let modelId: string;

  test('Fast Api Post Models Endpoints', async ({ request }) => {
    const modelBody = dataHelper.modelBody;
    const modelsResponse: APIResponse = await request.post('/models', {
      data : modelBody
    });
    const responseBody = await modelsResponse.json()
    modelId = responseBody.id;
    expect(modelsResponse.ok(), `Endpoint status is change to ${modelsResponse.status()}`).toBeTruthy();
    await assertHelper.validateJsonSchema(responseBody, postModelSchema);
  });

  test('Fast Api Get Models Endpoints', async ({ request }) => {
    const modelsResponse: APIResponse = await request.get('/models');
    const responseBody = await modelsResponse.json()
    expect(modelsResponse.ok(), `Endpoint status is change to ${modelsResponse.status()}`).toBeTruthy();
    await assertHelper.validateJsonSchema(responseBody, getModelSchema);
  });

  test('Fast Api Delete Models Endpoints', async ({ request }) => {
    const modelsResponse: APIResponse = await request.delete(`/models/${modelId}`);
    const respondseBody = await modelsResponse.json()
    expect(modelsResponse.ok(), `Endpoint status is change to ${modelsResponse.status()}`).toBeTruthy();
    expect(respondseBody).toBeNull()
  });

  test('Fast Api Post Models Endpoints failing test case', async ({ request }) => {
    const modelBody = dataHelper.modelBodyFailed;
    const modelsResponse: APIResponse = await request.post('/models', {
      data : modelBody
    });
    const responseBody = await modelsResponse.json()
    modelId = responseBody.id;
    await assertHelper.validateJsonSchema(responseBody, getmodelFailedSChema);

    expect(modelsResponse.ok(), `Endpoint status is change to ${modelsResponse.status()} \n Response: ${modelsResponse.statusText()} \n
    JSON: ${JSON.stringify(responseBody, null, 2)}`).toBeTruthy();
  });

});

